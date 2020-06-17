import Like_feed from './../models/Like_feed'
import Comment_feed from './../models/Comment_feed'
import Follower_seller from './../models/Follower_seller'

const get_follower_like_comment = async (req, res) => {
    try {
        const follower = await Follower_seller.find({ seller_id: req.params.seller_id }).count()
        const like = await Like_feed.find({ seller_id: req.params.seller_id }).count()
        const comment = await Comment_feed.find({ seller_id: req.params.seller_id }).count()
        res.status(200).json(
            {
                follower: follower,
                like: like,
                comment: comment,
            }
        )
    } catch (e) {
        console.log(e)
        res.status(400).json()
    }
}

export {
    get_follower_like_comment
}