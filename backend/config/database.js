const mongoose = require("mongoose")

const connectDatabase = ()=>{

    mongoose.connect(process.env.DB_URL ,{ // mongoDb string me Errror aaye to use bolte hai Unhandled Promised Rejection , use app.listen() ke baad handled Kiya hai isko handled krne me hme catch bliock likhne ki jarurat nhi hai
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then((data)=>console.log(`MongoDB connected with server : ${data.connection.host}`))
}

module.exports = connectDatabase

