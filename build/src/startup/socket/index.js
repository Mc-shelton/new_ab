"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const auth_1 = __importDefault(require("../../services_layer/auth/auth"));
const groups = new Map(); // Map<string, Set<WebSocket>>
const socketSetup = (server) => {
    const wss = new ws_1.default.Server({ server });
    function addClientToGroup(group, client) {
        if (!groups.has(group)) {
            groups.set(group, new Set());
        }
        groups.get(group).add(client);
    }
    function removeClientFromGroups(client) {
        groups.forEach((clientsSet) => {
            clientsSet.delete(client);
        });
    }
    function broadcastToGroup(group, data) {
        const clients = groups.get(group);
        if (!clients)
            return;
        clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    }
    wss.on('connection', (ws) => {
        ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const buffer = Buffer.from(message);
                let m = buffer.toString();
                const data = JSON.parse(m);
                console.log("got message though ::: ", data);
                if (data.type == 'join') {
                    if (!data['x-auth-key'])
                        return ws.send(JSON.stringify({
                            type: 'system',
                            message: 'forbiden',
                            code: '403'
                        }));
                    let user = yield auth_1.default.verifyToken(data['x-auth-key']);
                    if (user.status == false)
                        return ws.send(JSON.stringify({
                            type: 'system',
                            message: 'forbiden',
                            code: '403'
                        }));
                }
                if (data.type === 'join' && data.group) {
                    addClientToGroup(data.group, ws);
                    ws.send(JSON.stringify({
                        type: 'system',
                        message: `Joined group ${data.group}`,
                        code: '200'
                    }));
                    return;
                }
                if (data.type === 'message' && data.group && data.content) {
                    const broadcastPayload = JSON.stringify({
                        group: data.group,
                        content: data.content,
                        code: '200',
                        timestamp: new Date(),
                    });
                    broadcastToGroup(data.group, broadcastPayload);
                    return;
                }
                ws.send(JSON.stringify({
                    type: 'system',
                    message: `Invalid message format or missing fields`,
                    code: '400'
                }));
            }
            catch (err) {
                ws.send(JSON.stringify({
                    type: 'system',
                    message: 'Error parsing message JSON',
                    code: '500'
                }));
            }
        }));
        ws.on('close', () => {
            removeClientFromGroups(ws);
        });
    });
};
exports.default = socketSetup;
