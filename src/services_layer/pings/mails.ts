import nodemailer, { SendMailOptions } from 'nodemailer'
import { joinerHtml } from './templates'

import Logger from '../../startup/logger'
import { joinerDataType } from '../../types/service.types'
const logger = new Logger('mail service layer')
const transporter = nodemailer.createTransport({
    host: 'mail.adventband.org',
    name: 'Advent Band',
    port: 465,
    secure: true,
    auth: {
        user: 'app@adventband.org',
        pass: "app@AdventBand"
    }
})

const mail = async ({ subject, data }: { subject: string, data: joinerDataType }) => {

    const mailOptions: SendMailOptions = {
        from: 'Advent Band <app@adventband.org>',
        to: data.email,
        subject: 'ADVENT BAND NOTIFICATIONS - ' + subject,
        html: joinerHtml(data),
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return logger.genError('error sending mail', err.message)
        console.log("message sent successfuly", info)
    })

}

export default mail
export {
    transporter
}