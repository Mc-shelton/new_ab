import { jwtReturn, otpRes, otpSetter, sessionRes } from "./service.types"
import { Request } from "express"

interface IauthLayer{
    signToken(p:any):string
    verifyToken(t:string):Promise<jwtReturn>
    decodeToken(t:string):Promise<jwtReturn>
}

interface IOtpHandler{
    sendOtp(p:otpSetter):Promise<otpRes>
    verifyOtp(p:otpSetter):Promise<otpRes>
    deleteOtp(p:string):void
}
interface ISessions{
    validateSession(p:string):Promise<sessionRes>
}
interface IRequest extends Request{
    user?:any
    access?:any
}

export {
    IauthLayer,
    IOtpHandler,
    IRequest,
    ISessions
}