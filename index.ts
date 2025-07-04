import "reflect-metadata"
import express from 'express'
import Logger from "./src/startup/logger";
import { registerServer } from "./src/startup/registerip";
import appConfig from "./src/config.ts";
import { prismaSetup } from "./src/startup/db";
import { routerSetup } from "./src/startup/router";
import { getUsersConsumer } from "./src/rabbitmq/consumers/example";
import { userRepository } from "./src/handlers/repositories";
import https from 'https'
import fs from 'fs'
import { consumeMessageWithResponse } from "./src/rabbitmq";
import { prismaClient } from "./src/prisma";
import socketSetup from "./src/startup/socket";
import http from 'http'
import { periodicalsService } from "./src/handlers/services";
import { uploadToFtp } from "./src/services_layer/ftp";
import path from 'path'
// import './src/BFF/misc/convert_to_mp3'
const app = express();
const logger = new Logger('index')
const PORT = appConfig.app.PORT;

const sslKey = fs.readFileSync('./ssl/key.pem')
const sslCrt = fs.readFileSync("./ssl/certificate.pem")

routerSetup(app)
logger.unCought()

const server = http.createServer(app)

socketSetup(server)
// logger.unCought()
server.listen(PORT, async () => {
  prismaSetup()
  logger.genLog('app listening on port', PORT, 'SERVER', 'LOG')
  const remoteFileName = path.basename('./2.png')
});
