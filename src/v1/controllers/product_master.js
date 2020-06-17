import Product_master from "./../models/Product_master"


// Validation
import product_master_add from "./../validations/product_master_add"

import { single_upload } from './../uploadImage/product_master'
import { imgReq_error } from "../message/error_message"
// Funtional 
import { savePDMaster, saveProduct_optionData } from "../func/product"

const addProduct_master = async (req, res) => {
    try {
        const { errors, isValid } = product_master_add(req.body)

        if (!isValid) {
            res.status(400).json(errors)
        } else {
            if (!req.files || Object.keys(req.files.img).length === 0) {
                res.status(400).json(imgReq_error)
            } else {
                const img = req.files.img.data ? [req.files.img] : req.files.img
                const imgName = await single_upload(img)
                const newProduct_master = new Product_master({
                    name: req.body.name,
                    brand: req.body.brand,
                    img: imgName,
                    SKU: req.body.SKU,
                    cat_id: req.body.cat_id,
                    is_added_by: "admin"
                })
                const addData = await savePDMaster(newProduct_master)
                if (addData) {
                    res.status(201).json(addProd_success)
                } else {
                    res.status(400).json(addProdFail_error)
                }
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json("Err")
    }
}

const get_products_master_by_cat_id = (req, res) => {
    Product_master.find({ $and: [{ cat_id: req.params.cat_id }, { is_added_by: "admin" }] })
        .populate({
            path: "cat_id",
            populate: {
                path: "parent_id",
                populate: {
                    path: "parent_id"

                }
            }
        })
        .then(result => {
            if (result.length > 0) {
                res.status(200).json(result)
            } else {
                res.status(204).json()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json()
        })
}

// get_products_master_by_cat_id and pd_master_id
const get_products_master_by_pd_master_id = (req, res) => {
    Product_master.find({ _id: req.params.pd_master_id })
        .populate({
            path: "cat_id",
            populate: {
                path: "parent_id",
                populate: {
                    path: "parent_id"

                }
            }
        })
        .then(result => {
            if (result.length > 0) {
                res.status(200).json(result)
            } else {
                res.status(204).json()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(somethingWrn_error)
        })
}

export {
    addProduct_master,
    get_products_master_by_cat_id,
    get_products_master_by_pd_master_id,
}