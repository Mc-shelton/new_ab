import { randomBytes, randomFill, randomUUID } from "crypto"

const randomiz = (n:number):string=>{
   const buf = randomBytes(n);
   return buf.toString('hex')
}
export default randomiz