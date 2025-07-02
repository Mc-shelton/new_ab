import dotenv from 'dotenv'
process.env.NODE_ENV == 'production'? dotenv.config({path:'.env'}) : dotenv.config({path:'.env.development'})
console.log(process.env)


const config = (envString:string):string=>{
    const env = process.env[envString]
    if(!env) throw new Error(`Missing env : ${envString}`)
    return env
}
export default config