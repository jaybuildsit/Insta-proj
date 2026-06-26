const followModel = require("../config/models/follow.model")
const followRequestModel = require("../config/models/status.model")


async function followUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followeeUsername == followerUsername) {
        return res.status(400).json({
            message: "You cant follow Yourself"
        })
    }

    const isFolloweeExists = await followModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(401).json({
            message:"User you are trying to follow doesnt exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (isAlreadyFollowing) {
        return res.status(401).json({
            message: `You are already following ${followeeUsername}`, follow: isAlreadyFollowing
        })
    }


    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername

    })

    res.status(201).json({
        message: `You are following ${followeeUsername}`, follow: followRecord
    })

}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername,
    })

    if(!isUserFollowing){
        return res.status(201).json({
            message:`You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })

}

async function acceptRequestController(req,res){

        const username = req.user.username
        const requestId = req.params.requestId
        // console.log(requestId);

        const request = await followRequestModel.findById(requestId);

        if(!request){
            return res.status(404).json({
                message:"Request Not Found!"
            })
        }

        request.status="accepted";
        await request.save();


        res.json({
            message:"Follow Request Accepted!!",request
        })

}

async function declineRequestController(req,res){

    const requestId = req.params.requestId

    const request = await followRequestModel.findById(requestId);
    
    if(!request){
        return res.status(404).json({
            message:"Request not found"
        })
    }

    request.status="declined";
    await request.save();

    res.json({
        message:"Follow request Declined"
    })
    
}




module.exports = {
    followUserController,unfollowUserController,acceptRequestController,declineRequestController
}

