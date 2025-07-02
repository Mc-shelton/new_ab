import fs from 'fs'
import {  invoiceData, joinerDataType, otpData, receivedData } from '../../../types/service.types'
import appConfig from '../../../config.ts'
import Handlebars from 'handlebars'

const tempPath = appConfig.mailer.TEMPLATE_SRC
const joinerPath = `${tempPath}joiner_.hbs`
const otpPath = tempPath + 'otp.hbs'
const invoicePath = `${tempPath}invoice.hbs`
const receivedPath = `${tempPath}recieved.hbs`


const joinerTemplateSource = fs.readFileSync(joinerPath,'utf8')
const otpTemplateSource = fs.readFileSync(otpPath,'utf8')
const invoiceTempSource = fs.readFileSync(invoicePath, 'utf8')
const receivedTempSource = fs.readFileSync(receivedPath, 'utf8')

const joinerTemplate = Handlebars.compile(joinerTemplateSource)
const otpTemplate = Handlebars.compile(otpTemplateSource)
const invoiceTemplate = Handlebars.compile(invoiceTempSource)
const receivedTemplate = Handlebars.compile(receivedTempSource)


const joinerHtml = (joinData:joinerDataType)=>{
    return joinerTemplate({...joinData})
}

const otpHtml = (otpData:otpData)=>{
    return otpTemplate({...otpData})
}

const invoiceHtml = (p: invoiceData) => {
    return invoiceTemplate({ ...p })
}

const receivedHtml = (p: receivedData) => {
    return receivedTemplate({ ...p })
}
export {
    invoiceHtml,
    joinerHtml,
    otpHtml,
    receivedHtml
}