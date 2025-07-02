class BridgeError extends Error{
    constructor(
        item:string,
    ){
        super(`bad request. ${item} does not exist`)
    }
}

class UniqueParam extends Error{
    constructor(
        query:string,
        param:string,
        value:string
    ){
        super(`bad request. a ${query} of ${param} : ${value} already exists`)
    }
}

export default BridgeError
export {
    UniqueParam
}