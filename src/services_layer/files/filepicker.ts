// pick files from request, and saves them
import { IFileHandler } from '../../handlers/interface'
import { Request, Response } from 'express'
import randomiz from '../utils/randomiz'
import fs from 'fs'
import Logger from '../../startup/logger'
import { filePaths } from '../../types/service.types'
import appConfig from '../../config.ts'

const logger  = new Logger('file picker - file persistor')
class FileHandler implements IFileHandler{
    private readonly path:string = appConfig.app.FILE_PATH
    constructor(){
    }
    filePersistor (tempName:string,file:string, filePath:filePaths):string | null{
        const encName = randomiz(8)
        const fileName = `${encName}_${tempName}`
        try{
            fs.writeFile(`${this.path}/${filePath}/${fileName}.png`,file,'base64',(err)=>{
                console.log(err)
                if(err) throw new Error("failed saving image")
            })
        return fileName+'.png'
        }catch(err:any){
            logger.genError(err.message)
            console.log(err)
            return null
        }
    }
    deleteFile(name:string){
        fs.unlink(`${this.path}/${name}`,(err)=>{
            if(err)logger.genError(err.message)

            // if(err) throw new Error('failed deleting file')

        })
        return
    }
}

export default FileHandler