class httpError extends Error{
    constructor(message,errorCode){
        super(message,errorCode)
    }
}

module.exports = httpError