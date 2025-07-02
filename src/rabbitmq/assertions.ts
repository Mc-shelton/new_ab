import { Channel } from 'amqplib/callback_api';

export function assertQueue(channel: Channel, queue: string, options?: any) {
    return new Promise<void>((resolve, reject) => {
        channel.assertQueue(queue, options, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
