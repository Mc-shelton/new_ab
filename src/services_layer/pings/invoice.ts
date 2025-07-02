import nodemailer, { SendMailOptions } from 'nodemailer'
import Logger from '../../startup/logger'
import { invoiceHtml, receivedHtml } from './templates'
import fs from 'fs'
import { invoiceData, receivedData } from '../../types/service.types'
const logger = new Logger('mail service layer')

const transporter = nodemailer.createTransport({
    host: 'webmail.adventband.org',
    name: 'AHC Shops & Services',
    port: 465,
    secure: true,
    auth: {
        user: 'sales@adventband.org',
        pass: 'sales@Shellton'
    },
    tls: {
        // Do not fail on invalid certs (if necessary)
        rejectUnauthorized: false,
        // The certificates
        key: fs.readFileSync('./ssl/key.pem'),
        cert: fs.readFileSync('./ssl/certificate.pem'),
    }
})

const mail = async (data: invoiceData) => {
        // console.log(data)
        const mailOptions: SendMailOptions = {
        from: 'AHC Shops & Services <sales@adventband.org>',
        to: data.customer_email,
        subject: 'AHC - ORDER CONFIRMED - INVOICE',
        html: invoiceHtml(data),
        cc: ['sales@adventband.org', 'somondi@adventband.org']
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return logger.genError('error sending mail', err.message)
        console.log("message sent successfuly")
    })
}

const receivedMail = async (data: receivedData) => {
    const mailOptions: SendMailOptions = {
        from: 'AHC Shops & Services <sales@adventband.org>',
        to: data.customer_email,
        subject: 'AHC - ORDER RECEIVED',
        html: receivedHtml(data),
        cc: ['sales@adventband.org', 'somondi@adventband.org']
    }

    transporter.sendMail(mailOptions, (err, info) => {
        // console.log(data)
        if (err) return logger.genError('error sending mail', err.message)
        console.log("message sent successfuly")
    })

}


export {
    transporter,
    mail,
    receivedMail,
}