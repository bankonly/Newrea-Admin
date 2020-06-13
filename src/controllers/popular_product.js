import Popular_product from "./../models/Popular_product";

const get_all_popula_product_by_seller_id = (req, res) => {
    try {
        Popular_product.find({ seller_id: req.params.seller_id })
            .populate({

                path: "product_id",
                populate: {
                    path: "product_master_id product_option_id",
                    populate: {
                        path: "cat_id",
                        select: "name parent_id",
                        populate: {
                            path: "parent_id",
                            populate: {
                                path: "parent_id",
                            },
                        },
                    },
                }
            })
            //   .populate({
            //     path: "product_option_id",
            //   })
            .then(success => {
                if (success.length > 0 && success[0].product_id.length > 0) {
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
    get_all_popula_product_by_seller_id
}