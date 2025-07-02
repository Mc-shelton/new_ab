const syncObjectUpdate = <T>(origin:T,object:T):T=>{

    if(!(origin instanceof Object) || !(object instanceof Object)) throw new Error('payload must be object')
    const originCopy= Object.assign({}, origin)

    for(const key in object){
        const k:keyof T = key as keyof T
        if(originCopy.hasOwnProperty(k) && (object[k] !== undefined && object[k] !== null)){
            originCopy[k] = object[k]
        }
    }

    return originCopy
}

export default syncObjectUpdate