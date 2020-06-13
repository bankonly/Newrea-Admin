import Category from "./../models/Category"

// Upload Image 
import { single_upload } from "./../uploadImage/category"
import { somethingWrn_error,newCat_sucess } from "../message/error_message"

const addCategory = async (req, res) => {
    const newCategory = new Category({
        parent_id: req.body.parent_id,
        name: req.body.name,
        slug_name: req.body.slug_name,
    })
    if (!req.files || Object.keys(req.files.img).length === 0) {
        newCategory.save()
            .then(success => {
                res.status(201).json("")
            }).catch(err => {
                console.log(err)
                res.status(400).json(somethingWrn_error)
            })
    } else {
        const imageNmae = await single_upload(req.files.img)
        // console.log(imageNmae)
        newCategory.img = imageNmae
        newCategory.save()
            .then(success => {
                res.status(201).json(newCat_sucess)
            }).catch(err => {
                console.log(err)
                res.status(400).json(somethingWrn_error)
            })
    }

}

// Get all Getegory
const get_all_parent_category = (req, res) => {
    Category.find({ "parent_id": null })
        .then(success => {
            if (success.length > 0) {
                res.status(200).json(success)
            } else {
                res.status(204).json(success)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(somethingWrn_error)
        })
}

// Get Category by Id
const get_category_by_id = (req, res) => {
    Category.findById(req.params.cat_id)
        .then(success => {
            if (success) {
                res.status(200).json(success)
            } else {
                res.status(204).json(success)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(somethingWrn_error)
        })
}

// Get Category by Id
const get_category_by_parent_id = (req, res) => {
    Category.find({ parent_id: req.params.parent_id })
        .populate({
            path: "parent_id",
            select: "name img",
            populate: {
                path: "parent_id",
                select: "-__v -created_date -is_active"
            }
        })
        .select("-__v -created_date")
        .then(success => {
            if (success.length > 0) {
                res.status(200).json(success)
            } else {
                res.status(204).json(success)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(somethingWrn_error)
        })
}


export {
    addCategory,
    get_all_parent_category,
    get_category_by_id,
    get_category_by_parent_id
}