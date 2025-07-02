import IEvents from ".";
import { mail } from "../../services_layer/pings"
import Logger from "../../startup/logger"
import { joinerDataType } from "../../types/service.types";
import { IPingMethods } from "./types"

const ping_event = new IEvents();
const logger = new Logger("ping events")

class PingMethods implements IPingMethods {
    async sendCampMail(data:joinerDataType) {
        let subject = 'USER CREATED' 
        try{
            await mail({subject, data})
            logger.genLog("email sent")
        }catch(err){
            logger.genError("failed to send email")
        }
        
    }
}
const pingMethods = new PingMethods()

ping_event.on('send_mail',(d:joinerDataType)=>{
    pingMethods.sendCampMail(d)
})
ping_event.on('error',(e)=>{
    logger.genError('an error occured at ping event',e)
})

export default ping_event