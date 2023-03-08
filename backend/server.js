const app = require("./app")

const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

// handling uncaughtException  --> anyThing Not defined
process.on("uncaughtException" ,(err)=>{

    console.log(`Error ${err.message}`)
    console.log(`Shutting down the server due to uncaughtException Error `)
    
    process.exit(1)
})


//console.log(youtube) // Uncaught Exception

//Config
dotenv.config({path : 'backend/config/config.env'})

// connecting database
connectDatabase()

const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled  Promise Rejection ---> mongoDB cluster ERROR
process.on("unhandledRejection" , err => {
    console.log(`Error ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)

    server.close(()=>{
        process.exit(1)
    })
})



