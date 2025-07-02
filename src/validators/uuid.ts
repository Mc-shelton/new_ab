const validateUUID = (string:string):boolean=>{
    const uuidPattern = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}$/
    return uuidPattern.test(string)
}

export default validateUUID