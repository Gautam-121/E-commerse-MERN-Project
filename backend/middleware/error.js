const ErrorHandler = require("../util/errorHandler.js")

const errorMiddleware = (err, req , res , next)=>{

    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500

    //wrong MongoDB ID error
    if(err.name == "CastError"){
        const message = `Resource not found Invalid : ${err.path}`
        err =  new ErrorHandler(message , 400)
    }

    if(err.name == "MongoServerError"){
        const message = `The Email is Already exist and its coflict`
        err =  new ErrorHandler(message , 409)
    }

    console.log(err.name)

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}

module.exports = errorMiddleware