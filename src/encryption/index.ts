import * as crypto from 'crypto'
import appConfig from '../config.ts'

let IV = appConfig.app.IV
const generateNonce = ()=>{
    const date = new Date().toUTCString()
    let hex =  crypto.randomBytes(256).toString('hex')
    let nonce = `${date}:${hex}`
    let challenge = encrypt(nonce)
    return {challenge, date}
}
const hashChallenge= (serviceSecrete:string, challenge:string)=>{
    return crypto.createHash("sha256").update(`${serviceSecrete}:${challenge}`).digest('base64')
}

const genKey = ()=>{
    let secret = appConfig.app.SECRET
    let salt = appConfig.app.SALT
    const key = crypto.pbkdf2Sync(secret,salt,100000,32,'sha256')
    return key
}
const encrypt = (data:string)=>{
    const key = genKey()
    // const cipher = crypto.createCipheriv('aes-256-cbc',key,IV)
    // let encData = cipher.update(data, 'utf-8','hex')
    // encData += cipher.final('hex')
    // return encData
}

const decrypt = (data:string)=>{
    const key = genKey()
    // const decipher = crypto.createDecipheriv('aes-256-cbc',key,IV)
    // let decData = decipher.update(data,'hex', 'utf-8')
    // decData += decipher.final('utf-8')
    // return decData
}

export {generateNonce, hashChallenge, encrypt,decrypt}