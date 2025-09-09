import express, { Request, Response } from 'express'
// import { oAuthCtonroller } from '../handlers/controllers'
const oAuthRouter = express.Router()

// oAuthRouter.post('/request',oAuthCtonroller.postOuath)
// oAuthRouter.get('/',oAuthCtonroller.getOAuth)
oAuthRouter.get('/extra',(req:Request, res:Response)=>{
    res.status(200).json({
        message:'auth'
    })
})

export default oAuthRouter