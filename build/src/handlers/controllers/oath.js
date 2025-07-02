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
exports.getOAuth = exports.postOuath = void 0;
const ssoclient_auth_1 = __importDefault(require("../../services_layer/auth/ssoclient.auth"));
const auth_1 = __importDefault(require("../../services_layer/auth/auth"));
const userErrors_1 = __importDefault(require("../errors/userErrors"));
const index_1 = require("../errors/index");
const postOuath = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    console.log(req.body);
    const authorizeUrl = ssoclient_auth_1.default.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
        prompt: 'consent'
    });
    res.json({ url: authorizeUrl });
});
exports.postOuath = postOuath;
const getUserData = (access_token) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    console.log('res : ', response);
    const data = yield response.json();
    console.log('data : ', data);
    return data;
});
const getOAuth = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        const res = yield ssoclient_auth_1.default.getToken(code);
        yield ssoclient_auth_1.default.setCredentials(res.tokens);
        console.log('token acquired : ');
        const user = ssoclient_auth_1.default.credentials;
        // console.log(user)
        let d = yield getUserData(user.access_token);
        resp.cookie('AuthToken', JSON.stringify({ user, d }), { domain: 'adventband.org' });
        user.customToken = 'customtoken';
        const finUser = { user, d };
        const dbUser = yield auth_1.default.decodeToken(user.id_token);
        console.log("right here is user: ", dbUser);
        if (dbUser.status === false) {
            throw new userErrors_1.default(finUser.d.name);
        }
        let u = dbUser.user;
        console.log('here is the db user', dbUser);
        const dToken = auth_1.default.signToken(u);
        finUser.db_token = dToken;
        console.log(finUser);
        const s = JSON.stringify(finUser);
        console.log(finUser);
        resp.redirect(302, 'appConfig.google.SSO_REDIRECT_FE' + '?user=' + s);
    }
    catch (err) {
        console.log('error with google ', err);
        const error = (0, index_1.customErrorChecker)(err);
        let errMessage = 'internal server error, try again';
        if (error)
            errMessage = err.message;
        resp.redirect(302, 'appConfig.google.SSO_REDIRECT_FE' + '?error=' + errMessage);
    }
});
exports.getOAuth = getOAuth;
