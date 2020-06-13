import Like_feed from './../models/Like_feed'


const get_like_by_shop_feed_id = (req, res) => {
    try {
        Like_feed.find({ shop_feed_id: req.params.shop_feed_id })
            .populate({
                path: "cus_id",
                select: "name profile_img"
            })
            .then(success => {
                if (success.length > 0) {
                    res.status(200).json(success)
                } else {
                    res.status(204).json()
                }
            })
            .catch(e => {
                console.log(e)
                res.status(400).json()
            })
    } catch (e) {
        console.log(e)
        res.status(400).json()
    }
}

export {
    get_like_by_shop_feed_id
}

