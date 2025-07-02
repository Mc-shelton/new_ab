class InvalidQueryError extends Error{
    constructor(
        queryType:string,
        query:string
    ){
        super(`${queryType} query for query : ${query} is invalid or wrong`)
    }

}



export default InvalidQueryError