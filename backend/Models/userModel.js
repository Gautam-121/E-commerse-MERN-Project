const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true , "Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 Character"],
        minLength:[4,"Name should have more than 4 Character"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique: `This email is Already Taken {value}`,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password:{
        type:String,
        required:[true ,"Please Enter Your Password"],
        minLength:[8,"Password should be greater than 8 chracter"],
        select : false
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function(next){
  
    if (!this.isModified("password")){
        next()    
    }

    this.password = await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = 

module.exports = mongoose.model("user" , userSchema) 

