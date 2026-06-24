const postModel = require("../routes/post.routes")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privatekey: process.env.ImageKit_PRIVATE_KEY,
})

async function createPostController(req, res) {

    console.log(req.body, req.file)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),"a06ee0e0a17429c3133d456c95ca929b.jpg"),
        fileName: "test",
    })

    res.send(file)
}

module.exports = { createPostController }