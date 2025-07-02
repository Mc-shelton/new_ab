import { users } from "@prisma/client";
import jwt  from "jsonwebtoken";
import { IauthLayer } from "../../types/service.interface";
import {  jwtReturn } from "../../types/service.types";
import { userService } from "../../handlers/services";
import { UserErrors } from "../../handlers/errors";
import appConfig from "../../config.ts";
import { userRepository } from "../../handlers/repositories";
import { cuser } from "../../handlers/types";

class AuthLayer implements IauthLayer {
    
    private readonly key:string
    constructor(
    ){
        this.key = appConfig.jwt.SECRET
    }
    signToken(p: users): string {
        console.log('we went till here', p)
        const token = jwt.sign(p,this.key, {expiresIn:'7d'})
        console.log('we went till here after isgn')
        return token
    }
    async verifyToken(t: string): Promise<jwtReturn> {
        let jReturn:jwtReturn ={
            status:false
        };
        try{
            const verify = jwt.verify(t, this.key) as users
            const user = await userService.getUser(verify.id)
            if(!user)throw new UserErrors(verify.id)
            jReturn ={
                status:true,
                user
            }
            
        }catch(err:any){
            jReturn={status: false, message:err.message}

        }
        return jReturn
    }
     
    async decodeToken(t: string): Promise<jwtReturn> {
        let jReturn:jwtReturn ={
            status:false
        };
        try{
            const verify = jwt.decode(t) as any
            let user:users | null;
            user = await userRepository.getUser(verify.sub)
            if(!user) {
                const userModel:cuser = {
                    email:verify.email,
                    name:verify.sub,
                    phone: null
                }
                user = await userRepository.createUser(userModel)
            }
            jReturn ={
                status:true,
                user
            }
            
        }catch(err:any){
            jReturn={status: false, message:err.message}

        }
        return jReturn
    }
    
}
const authLayer = new AuthLayer()
export default authLayer