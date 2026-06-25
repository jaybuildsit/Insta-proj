const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        required: [true, "Please provide an image"]
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Please provide a ID to create a post"]
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }]
})


const postModel = mongoose.model("Post", postSchema)

module.exports = postModel
