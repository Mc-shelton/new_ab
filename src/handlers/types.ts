import { events, users } from "@prisma/client"

interface cuser extends Omit<users, 'id' | 'created_at' | 'status'  > {}
interface cevent extends Omit<events, 'id' | 'created_at'>{}
type IObject = { [key: string]: string }

type gUser = {
    email?: string,
    phone?: string
}
type genRes = {
    status: 'TRUE' | 'FALSE' | 'TRUTHY'
    message?: string,
    data?: { [key: string]: string | null | boolean | number }
}
const statusEnums = {
    TRUTHY: 200,
    TRUE: 201,
    FALSE: 404
}
const errorEnums = {
    SERVER: 'internal server error. try again later',
    FIELDS: 'you must provid all the fields',
    PROFILE: "You are not authorized to access this resource"

}
type libSelector = 'ALL' | 'BYNAME'
type paperSelector = "ALL" | 'BYTYPE' | 'BYSUBJECT' | 'BYLIB'

type access = 'USER' | 'ADMIN' | 'S_USER' | 'GUEST'
type methods = 'can_read' | 'can_write' | 'is_super' | 'can_delete'
type acl = {[key in methods]?:boolean}


export {
    genRes,
    paperSelector,
    IObject,
    libSelector,
    cuser,
    statusEnums,
    access,
    cevent,
    methods,
    acl,
    errorEnums,
    gUser,
}