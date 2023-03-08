const ErrorHandler = require("../util/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const User =  require("../Models/userModel")

//Register User

const registerUser = catchAsyncError(async(req,res,next)=>{

    const {name , email , password} = req.body

    const user =  await User.create({
        name,
        email,
        password,
        avatar:{
            public_id : "this is Sample id",
            url : "profilePicUrl"
        }
    })

    res.status(201).send({
        success : true,
        user
    })
})


module.exports =  {registerUser}
