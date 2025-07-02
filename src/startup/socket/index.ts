import WebSocket from 'ws';
import authLayer from '../../services_layer/auth/auth';

const groups = new Map(); // Map<string, Set<WebSocket>>

const socketSetup = (server:any) => {
  const wss = new WebSocket.Server({ server });

  function addClientToGroup(group:any, client:any) {
    if (!groups.has(group)) {
      groups.set(group, new Set());
    }
    groups.get(group).add(client);
  }

  function removeClientFromGroups(client:any) {
    groups.forEach((clientsSet) => {
      clientsSet.delete(client);
    });
  }

  function broadcastToGroup(group:any, data:any) {
    const clients = groups.get(group);
    if (!clients) return;
    clients.forEach((client:any) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  wss.on('connection', (ws) => {
    ws.on('message', async (message:any) => {
      try {
        const buffer = Buffer.from(message)
        let m = buffer.toString()

        const data = JSON.parse(m);
        console.log("got message though ::: ", data)
        if(data.type == 'join'){if(!data['x-auth-key']) return ws.send(JSON.stringify({
            type: 'system',
            message: 'forbiden',
            code:'403'
          }));
        let user = await authLayer.verifyToken(data['x-auth-key'])

        if(user.status == false) return ws.send(JSON.stringify({
            type: 'system',
            message: 'forbiden',
            code:'403'
          }));}

        if (data.type === 'join' && data.group) {
          addClientToGroup(data.group, ws);
          ws.send(JSON.stringify({
            type: 'system',
            message: `Joined group ${data.group}`,
            code:'200'
          }));
          return;
        }

        if (data.type === 'message' && data.group && data.content) {
          const broadcastPayload = JSON.stringify({
            group: data.group,
            content: data.content,
            code:'200',
            timestamp: new Date(),
          });
          broadcastToGroup(data.group, broadcastPayload);
          return;
        }

        ws.send(JSON.stringify({
            type: 'system',
            message: `Invalid message format or missing fields`,
            code:'400'
          }));
      } catch (err) {
        ws.send(JSON.stringify({
            type: 'system',
            message: 'Error parsing message JSON',
            code:'500'
          }));
      }
    });

    ws.on('close', () => {
      removeClientFromGroups(ws);
    });
  });
};

export default socketSetup;
