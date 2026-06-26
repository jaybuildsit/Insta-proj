const mongoose = require("mongoose")
const { likePostController } = require("../../controllers/post.controller")


const likeSchema = new mongoose.Schema({
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post ID is required to like this post!"]

    },
    user: {
        type: String,
        required: [true, "Username is required !"]
    }
}, {
    timestamps: true
})

likeSchema.index({ post : 1, user: 1 }, { unique: true })

const likeModel = mongoose.model("likes",likeSchema)

module.exports = likeModel