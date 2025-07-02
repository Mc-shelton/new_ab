import { boolean } from "joi";
import jwt  from "jsonwebtoken";
import { ISessions, IauthLayer } from "../../types/service.interface";
import {  jwtReturn, sessionRes } from "../../types/service.types";
import appConfig from "../../config.ts";

class SessionLayer implements ISessions {
    private readonly key:string
    constructor(
    ){
        this.key = appConfig.jwt.SECRET
    }
    async validateSession(p: string): Promise<sessionRes> {
        return{
            existingSession:false,
            message:'nothing to do here'
        }
    }
}
const authLayer = new SessionLayer()
export default authLayer