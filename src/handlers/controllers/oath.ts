import { Request, Response } from "express";
import appConfig from "../../config.ts";
import oAuth2Client from "../../services_layer/auth/ssoclient.auth";
import authLayer from "../../services_layer/auth/auth";
import UserErrors from "../errors/userErrors";
import { customErrorChecker } from "../errors/index";
import { users } from "@prisma/client";

const postOuath = async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Referrer-Policy", "no-referrer-when-downgrade")
    console.log(req.body)
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
        prompt: 'consent'
    })
    res.json({ url: authorizeUrl })
}

const getUserData = async (access_token: string) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    console.log('res : ', response)
    const data = await response.json();
    console.log('data : ', data)
    return data
}

const getOAuth = async (req: Request, resp: Response) => {
    const code = req.query.code;
    try {
        const res = await oAuth2Client.getToken(code as string);
        await oAuth2Client.setCredentials(res.tokens)
        console.log('token acquired : ')
        const user: any = oAuth2Client.credentials;
        // console.log(user)
        let d = await getUserData(user.access_token)
        resp.cookie('AuthToken', JSON.stringify({ user, d }), { domain: 'adventband.org' })
        user.customToken = 'customtoken'
        const finUser = { user, d } as any
        const dbUser = await authLayer.decodeToken(user.id_token)
        console.log("right here is user: ", dbUser)
        if (dbUser.status === false) {
            
            throw new UserErrors(finUser.d.name)
        }
        let u = dbUser.user as Omit<users, 'passwrod'>
        console.log('here is the db user', dbUser)
        const dToken = authLayer.signToken(u)
        finUser.db_token = dToken
        console.log(finUser)
        const s = JSON.stringify(finUser)
        console.log(finUser)

        resp.redirect(302, 'appConfig.google.SSO_REDIRECT_FE' + '?user=' + s)
    } catch (err: any) {
        console.log('error with google ', err)
        const error = customErrorChecker(err)
        let errMessage = 'internal server error, try again'
        if (error) errMessage = err.message
        resp.redirect(302, 'appConfig.google.SSO_REDIRECT_FE' + '?error=' + errMessage)
    }
}
export {
    postOuath,
    getOAuth
}