const mongoose = require("mongoose")


const followRequestSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Please enter the sender id"]
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Please enter the receiver id"]
    },
    status:{
        type:String,
        enum:["accepted","declined","pending"]
    }
},{
    timestamps:true
})

const followRequestModel = mongoose.model("followRequest",followRequestSchema);

module.exports = followRequestModel