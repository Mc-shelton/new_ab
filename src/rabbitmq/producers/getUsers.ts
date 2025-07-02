import { sendMessageWithResponse } from "..";

export async function produceMessageAndGetResponse() {
    const queue = 'postUser';
    const message = 'Hello, RabbitMQ!';

    const response = await sendMessageWithResponse(queue, message);
    console.log(" [x] Received response:", response);
}
