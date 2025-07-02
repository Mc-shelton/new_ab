import { joinerDataType } from "../../types/service.types"

interface IBlackListMethods {
    addBlackList(phone:string, token:string):void
}
interface IPingMethods{
    sendCampMail(data:joinerDataType):void
}
export {
    IBlackListMethods,
    IPingMethods
}