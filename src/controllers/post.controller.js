const postModel = require("../config/models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privatekey: process.env.ImageKit_PRIVATE_KEY,
})

async function createPostController(req, res) {

    console.log(req.body, req.file)

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token not provided,Unauthorized access"
        })
    }

    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    console.log(decoded)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "Cohort-2-IG-Clone"
    })


    const post = await postModel.create({
        caption: req.body.caption,
        img: file.url,
        users: decoded.id
    })

    res.status(201).json({
        message: "Post created Successfully!!", post
    })
    // res.send(file)
}

async function getPostController(req, res) {

    const token = req.cookies.token


    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Token Invalid"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        users: userId,
    })

    res.status(200).json({
        message: "Post Fetched Successfully!!", posts
    })


}

async function getPostDetailsController(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }


    let decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    const userId = decoded.id
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