import { consumeMessageWithResponse } from "..";
import { userService } from "../../handlers/services";

export async function getUsersConsumer() {
    const queue = 'user_by_id';

    consumeMessageWithResponse(queue, async(message) => {
        // Process message and return response
        const m = JSON.parse(message)
        let user =  await userService.getUser(m)
        console.log('here is what i got ', message)
        return JSON.stringify(user);
    });
}

export async function getApprovalMails() {
    const queue = 'app_by_id';

    consumeMessageWithResponse(queue, async(message) => {
        // Process message and return response
        const m = JSON.parse(message)
        let user =  await userService.getUser(m)
        console.log('here is what i got ', message)
        return JSON.stringify(user);
    });
}
