"use strict";
// import { inject, injectable } from "tsyringe";
// import { IOtpHandler } from "../../types/service.interface";
// import { otpRes, otpSetter } from "../../types/service.types";
// import { IRedisHandler } from "../../redis/types";
// import Logger from "../../startup/logger";
// import { mailOtp } from "../pings/otp";
// const logger = new Logger('OTP handler')
// @injectable()
// class OtpHandler implements IOtpHandler {
//   constructor(@inject("redisHandler") readonly redisHandler: IRedisHandler) {}
//   async sendOtp(p: otpSetter): Promise<otpRes> {
//     const { key, otp: data } = p;
//     const redisRes = await this.redisHandler.setter({ key, data });
//     if (redisRes.status === false)
//       return { status: false, message: "server error. could not set otp" };
//     //send otp onfon media
//     logger.genLog('Sent otp : ',data)
//     mailOtp({name:p.name, otp:data}, key)
//     return {
//       status: true,
//       message: "Otp sent to email : " + key,
//     };
//   }
//   async verifyOtp(p: otpSetter): Promise<otpRes> {
//     const { key, otp: data } = p;
//     const redisRes = await this.redisHandler.getter(key);
//     if (redisRes.status === false)
//       return { status: false, message: "OTP not found, register again" };
//       logger.genLog('recieved otp : ',data)
//     if (redisRes.data != data)
//       return {
//         status: false,
//         message: "invalid OTP",
//       };
//     return {
//       status: true,
//       message: "OTP verified",
//     };
//   }
//   deleteOtp(p: string):void {
//     const del = this.redisHandler.deleter(p)
//   }
// }
// export default OtpHandler
