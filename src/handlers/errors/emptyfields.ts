class EmptyFieldError extends Error{
    constructor(
        object:Object
    ){
        let message = 'payload missing values : '
        for(let key in object){
            const ikey:keyof object = key as keyof object
            if(!object[ikey])message+key+", " 
        }
        super(message)
    }
}
export default EmptyFieldError