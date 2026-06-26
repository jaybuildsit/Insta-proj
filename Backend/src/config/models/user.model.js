const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already exists"],
        required:[true,"Please provide a username"]
    },
    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,"Please provide an email"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    bio:{
        type:String,
    },
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/pt125kcah/5abd985735a8fd4adcb0e795de6a1005.jpg"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel