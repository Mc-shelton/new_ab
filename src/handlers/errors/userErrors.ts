class UserErrors extends Error{
    constructor(message?:string){
        super(`${message} : not a user, or wrong credetials`)
    }
}

class UsedEmail extends Error{
    constructor(email?:string){
        super(`Failed creating user : ${email} already taken `)
    }
}

export default UserErrors
export {
    UsedEmail
}