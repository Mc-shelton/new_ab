import { users } from "@prisma/client"

type jwtReturn ={
        status:boolean
        message?:string
        user?:users
    }
type otpSetter ={
    key:string,
    otp:string,
    name?:string
}

type otpData = {
    name?:string,
    otp:string
}
type invoiceItems = {
    name:string
    quantity:string
    price:string
}
type invoiceData = {
    customer_name:string
    customer_id:string
    customer_email:string
    invoice_id:string
    created_at:string
    due_at:string
    time:string
    items:invoiceItems[]
    total:string
    location:string
}

type receivedData = {
    customer_name:string,
    invoice_id:string,
    customer_email:string
    created_at:string
}
type otpRes = {
    status:boolean,
    message:string
}
type filePaths = 'projects' | 'profiles' | 'roles'
type acList = {
    [key:string]:{[key:string]:string[]}
}
type sessionRes ={
    session?:string,
    message:string,
    existingSession:boolean
}
type joinerDataType ={
    name:string
    email:string
}
type iQuery = {[key:string]:any}

export {
    joinerDataType,
    jwtReturn,
    otpRes,
    otpSetter,
    sessionRes,
    iQuery,
    filePaths,
    acList,
    invoiceData,
    invoiceItems,
    otpData,
    receivedData
}