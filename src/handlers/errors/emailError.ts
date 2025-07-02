class EmailError extends Error{
    constructor(
    ){
        let message = 'failed to send email, check if email is valid'
        super(message)
    }
}
export default EmailError