import { connect, Channel, Replies } from 'amqplib/callback_api';
import { assertQueue } from './assertions';

export function sendMessageWithResponse(queue: string, message: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        connect('amqp://be.uat.opencapital.com', (error0, connection) => {
            if (error0) {
                reject(error0);
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    reject(error1);
                }
                assertQueue(channel, queue)
                    .then(() => {
                        channel.assertQueue('', { exclusive: true }, (error2, q) => {
                            if (error2) {
                                reject(error2);
                            }
                            const correlationId = generateUuid();
                            channel.consume(q.queue, (msg:any) => {
                                if (msg.properties.correlationId === correlationId) {
                                    resolve(msg.content.toString());
                                }
                            }, { noAck: true });

                            channel.sendToQueue(queue, Buffer.from(message), { correlationId, replyTo: q.queue });
                        });
                    })
                    .catch(reject);
            });
        });
    });
}

export function consumeMessageWithResponse(queue: string, processMessage: (message: string) => Promise<string>) {
    connect('amqp://be.uat.opencapital.com', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            assertQueue(channel, queue)
                .then(() => {
                    channel.consume(queue, async (msg) => {
                        if (msg !== null) {
                            const response = await processMessage(msg.content.toString());
                            channel.sendToQueue(
                                msg.properties.replyTo,
                                Buffer.from(response),
                                { correlationId: msg.properties.correlationId }
                            );
                        }
                    }, { noAck: true });
                    console.log(" [*] Waiting for messages. To exit press CTRL+C");
                })
                .catch(console.error);
        });
    });
}
function generateUuid() {
    return Math.random().toString() +
           Math.random().toString() +
           Math.random().toString();
}
