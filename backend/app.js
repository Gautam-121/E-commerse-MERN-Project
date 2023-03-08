const express = require("express")
const app = express()

const errorMiddleware = require("./middleware/error.js")

app.use(express.json())

// Route Import
const productRoute  = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")

app.use('/api/v1' , productRoute)
app.use('/api/v1', userRoute)

//middleware For Error
app.use(errorMiddleware)


module.exports = app