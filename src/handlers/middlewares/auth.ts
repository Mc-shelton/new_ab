import express, { NextFunction, Request, Response } from "express";
import { IRequest } from "../../types/service.interface";
import Logger from "../../startup/logger";
import appConfig from "../../config.ts";
import { errorEnums } from "../types";
import authLayer from "../../services_layer/auth/auth";

const logger = new Logger("auth middleware")
const authenticate = async (req: IRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  const auth_key = req.headers["x-api-key"];
  console.log(req.url)
  try {
    if (auth_key != appConfig.app.API_KEY && !req.url.includes('auth') && !req.url.includes('static')) {
      return res.status(403).json({
        message: "invalid api key",
      });
    }
    if (!bearer?.split("Bearer ")[1]) return next()
    const token = bearer?.split("Bearer ")[1].trim();
    if (!token)
      return res.status(403).json({
        message: "invalid bearer token",
      });
    const { status, message, user } = await authLayer.verifyToken(token);
    if (status === false)
    return next()

    // let blackList = (await redisHandler.getter('BlackList')).data as unknown as TokenBlackList[]
    // let l = blackList.filter((l) => l.key === bearer)
    // if (l.length > 0) return res.status(403).json({ message: 'this user has been disabled or deleted' })

    req.user = user;

    next();


  } catch (err: any) {
    res.status(500).json({ message: errorEnums.SERVER })
    logger.genError(err.message)
  }
};

export default authenticate;
