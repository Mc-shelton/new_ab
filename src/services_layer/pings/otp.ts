import { SendMailOptions } from "nodemailer"
import { otpHtml } from "./templates"
import { otpData } from "../../types/service.types"
import { transporter } from "./mails"
import Logger from "../../startup/logger"
import { EmailError } from "../../handlers/errors"

const logger = new Logger('send mail otp')
const mailOtp = async (data: otpData, email: string) => {
    const mailOptions: SendMailOptions = {
        from: 'Advent Band <app@adventband.org>',
        to: email,
        subject: 'ADVENT BAND NOTIFICATIONS - OTP',
        html: otpHtml(data),
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger.genError('error sending mail', err.message)
            throw new EmailError()
        }
        console.log("message sent successfuly", info)
    })
}
const messageOtp = () => {
    //message otp to phone
}

export {
    mailOtp,
    messageOtp
}