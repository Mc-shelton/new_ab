import { prismaClient } from "../prisma"
import Logger from "./logger"

const logger = new Logger('db setup')
const prismaSetup = async ()=>{
    prismaClient.$connect().then(()=>{
        logger.genLog('connnected to db')
    }).catch(()=>{
        throw new Error('failed to connect to db')
    })
}

export {
    prismaSetup
}