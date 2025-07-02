import InvalidQueryError from "./query";
import UserErrors, { UsedEmail } from "./userErrors";
import EmptyFieldError from "./emptyfields";
import BridgeError, { UniqueParam } from "./idbrigde";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import EmailError from "./emailError";

const customErrorChecker = (error:any):boolean=>{
    if(error instanceof  PrismaClientKnownRequestError){
        error.message = 'constraint error'
    }
return  error instanceof UniqueParam ||error instanceof UserErrors || error instanceof UsedEmail || error instanceof EmptyFieldError  || error instanceof EmailError || error instanceof BridgeError || error instanceof  PrismaClientKnownRequestError
}
export {
    InvalidQueryError,
    UserErrors,
    EmptyFieldError,
    EmailError,
    UniqueParam,
    customErrorChecker,
    
}