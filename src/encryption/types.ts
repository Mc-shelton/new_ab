import { Hash } from "crypto"

interface Icrypt{
    hash(p:string):string
    verHash(h:string, p:string):boolean
    encrypt(t:string):string
    decrypt(t:string):string
}

export {
    Icrypt
}