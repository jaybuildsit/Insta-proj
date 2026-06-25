const postModel = require("../config/models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privatekey: process.env.ImageKit_PRIVATE_KEY,
})

async function createPostController(req, res) {


    console.log(decoded)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "Cohort-2-IG-Clone"
    })


    const post = await postModel.create({
        caption: req.body.caption,
        img: file.url,
        users: req.user.id
    })

    res.status(201).json({
        message: "Post created Successfully!!", post
    })
}

async function getPostController(req, res) {

    const userId = req.user.id

    const posts = await postModel.find({
        users: userId,
    })

    res.status(200).json({
        message: "Post Fetched Successfully!!", posts
    })


}

async function getPostDetailsController(req, res) {


    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)


    if (!post) {
        return res.status(404).json({
            message: "Post Not Found By the ID"
        })
    }

    const isValidUser = post.users.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "You are not authorized to view this post"
        })
    }
    return res.status(200).json({
        message: "Post Fetched Successfully!!", post
    })

}

module.exports = { createPostController, getPostController, getPostDetailsController }