import os from 'os'
import appConfig from '../config.ts/index.js';
import axios, { AxiosError } from 'axios';
import { decrypt, hashChallenge } from '../encryption/index.js';
import Logger from './logger.js';

const logger = new Logger('register ip')
async function registerServer(count?:number) {
  let counter = count || 0
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const key in interfaces) {
    //@ts-ignore
    for (const iface of interfaces[key]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  
  logger.genLog('server addresses : ',addresses)
  const regPayLoad = {
    name:'AUTH_SERVICE',
    port:parseInt(appConfig.app.PORT),
    status:true,
    host:addresses[1],
    url:`http://${addresses[1]}:${appConfig.app.PORT}`,
    timeStamp:''
  }
  axios.post(appConfig.app.GATE_WAY_ENDPOINT+"/register",regPayLoad,{headers:{
    "www-auth-challenge":"Digest",
    "www-auth-hash":"Digest"

  }}).then((res)=>{
    if(res.status === 201 && res.data.message === 'www challenge'){
      //combat challenge
      let challenge_cypher = res.headers['www-auth-challenge']
      let challenge = decrypt(challenge_cypher)
      let split_challenge = challenge.split("|")
      let challenge_Date = split_challenge[0].trim()
      let challenge_hex = split_challenge[1].trim()
      let hash = hashChallenge(appConfig.app.CRYPTO_SECRET,challenge)
      regPayLoad.timeStamp = challenge_Date
      axios.post(appConfig.app.GATE_WAY_ENDPOINT+"/register",regPayLoad,{headers:{
        "www-auth-challenge":"Digest "+challenge_cypher,
        "www-auth-hash":"Digest "+hash
    
      }}).then((res)=>{
        console.log(res.data, challenge_hex)
      }).catch((err)=>{
        console.log('error', err)
        if(err.response.status === 400){
          if(counter > 3){
            //send mail
            logger.genError('terminating server, registering retry exeeded 3')
            return
          }
          setTimeout(()=>{
            logger.genLog('could not register server, error 400. retrying index :',counter)
            counter = counter+1
            registerServer(counter)
          },1000)
        }else if(err.response.status === 500){
          //send server error mail
          logger.genError('terminating server, gateway returned 500')

        }else{
          logger.genError('could not register server...gateway offline')
        }
      })
    }
  }).catch((err:AxiosError)=>{
    if(err.code === 'ECONNREFUSED'){
      logger.genError('terminating server, gateway refused to connect')
      return
    }else if(err.response?.status === 400) {
      const data:any = err.response.data
      logger.genError('terminating server, error in service program ')
      return
      //recursion here if message is normal error
      
    }else{
      logger.genError("could not register server...gateway offline")
    }
  })

  appConfig.app.HOST = addresses[0];
  // appConfig.app.BASE_URL = `${addresses[0]}:${appConfig.app.PORT}/${appConfig.app.API_VERSION}`
}

export {
  registerServer
}