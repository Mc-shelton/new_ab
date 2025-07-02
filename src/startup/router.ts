import { Application, Request, Response } from "express"
import apiv1 from "../routes"
import Logger from "./logger"
import bodyParser from "body-parser"
import cors from 'cors'
import morgan from "morgan"
import helmet from "helmet"
import authenticate from "../handlers/middlewares/auth"
import accessControl from "../handlers/middlewares/actl"
import appConfig from "../config.ts"
const logger = new Logger('router setup')

export const routerSetup=(app:Application)=>{
    //middlewares
    app.use(morgan('common'))
    app.use(helmet())
    const corOptions = {
        origin:'*'
    }
    app.use(cors(corOptions))
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json({limit:'15MB'}))

    app.get('/new_ab/liveprobe', (req, res)=>{
        logger.genLog('server live probe')
        res.status(200).json({
            status:'Live',
            message: 'Server is running on port : '+ appConfig.app.PORT
        })
    })

    //api
    app.use('/api/v1',authenticate, apiv1)
}