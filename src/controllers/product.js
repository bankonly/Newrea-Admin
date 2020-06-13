// import Product from "./../models/Product"
import Product_option from "./../models/Product_option"

// Validation
import validationProductInput from "./../validations/product"



export async function addProduct(req, res) {

    console.log(req.body)
    console.log(req.files)
    const option_title = [
        {
            title: "Color",
            values: ["red", "blue", "green"]
        },
        {
            title: "Size",
            values: ["S", "M", "L"]
        }
    ]
    const option_detail = [
        {
            Color: "red",
            Size: "S",
            price: "20,000",
            stock: "100",
            pd_img: "https://justcreative.com/wp-content/uploads/2015/06/webdesign-courses.jpg"
        },
        {
            Color: "red",
            Size: "M",
            price: "30.000",
            stock: "10,0",
            pd_img: "https://image.shutterstock.com/image-vector/summer-sale-banner-paper-cut-260nw-1034479297.jpg"
        },
        {
            Color: "blue",
            Size: "S",
            price: "15e000",
            stock: "10",
            pd_img: "https://image.freepik.com/free-photo/empty-screen-laptop-with-camera-ice-coffee-cafe_39688-1668.jpg"
        },
        {
            Color: "blue",
            Size: "M",
            price: "20 000",
            stock: "15",
            pd_img: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/97939042/original/03a7ea8a8ad9705570b678f8fc88c29b6e1fd6af/create-stunning-custom-t-shirt-design.jpg"
        },
        {
            Color: "green",
            Size: "L",
            price: "40-000",
            stock: "5A0",
            pd_img: "https://justcreative.com/wp-content/uploads/2015/06/webdesign-courses.jpg"
        },
    ]

    let parseInt_option_detail =
        option_detail.map(res => {
            return ({
                ...res,
                price: parseInt(res.price.replace(/\.|,|-|[a-zA-Z]| /g, "")),
                stock: parseInt(res.stock.replace(/\.|,|-|[a-zA-Z]| /g, "")),
                pd_img: res.pd_img

            })
        })
    // const intData = parseInt(test)
    // console.log(toint)

    res.json(parseInt_option_detail)

    // const { errors } = validationProductInput(req.body)
    // console.log(errors)
    // console.log(req.body)
    // if (!errors) {
    //     res.status(400).json(errors)
    // } else {}


    // const newProductData = new Product({
    //     seller_id: req.body.seller_id,
    //     pd_name: req.body.pd_name,
    //     pd_bran: req.body.pd_bran,
    //     pd_desc: req.body.pd_desc
    // })
    // const newProduct_optionData = new Product_option({
    //     pd_id: newProductData._id,
    //     option_title: option_title,
    //     option_detail: option_detail
    // })
    // const product = await addProductData(newProductData, newProduct_optionData._id)
    // const product_option = await addProduct_optionData(newProduct_optionData)
    // if (product && product_option) {
    //     res.status(200).json({ success: true })
    // } else {
    //     if (product) {
    //         await Product.deleteOne({ _id: newProductData._id })
    //         res.status(400).json({ success: false })
    //     } else {
    //         await Product_option.deleteOne({ _id: newProduct_optionData._id })
    //         res.status(400).json({ success: false })
    //     }
    // }
}


// Func Add product
async function addProductData(data, option_id) {
    data.option = option_id
    return data.save()
        .then(success => {
            if (success) {
                return true
            } else {
                return false
            }
        })
        .catch(err => {
            // console.log(err)
            return false
        })
}

// Func Add product_option
async function addProduct_optionData(data) {
    return data.save()
        .then(success => {
            if (success) {
                return true
            } else {
                return false
            }
        })
        .catch(err => {
            // console.log(err)
            return false
        })
}

// Get All Product
export function get_allProduct(req, res) {
    Product.find()
        .populate("option")
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ success: false })
        })
}

// get Product By seller Id
export function get_allProduct_by_sellerID(req, res) {
    Product.find({ seller_id: req.params.seller_id })
        .populate("option")
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ success: false })
        })
}

// get Product By Id
export function get_Product_byID(req, res) {
    Product.findById(req.params.pd_id)
        .populate("option")
        .then(result => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(200).json([])
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ success: false })
        })
}