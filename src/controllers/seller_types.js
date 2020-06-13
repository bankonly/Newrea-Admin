const express = require("express")
express.Router()

const Seller_type = require("./../models/Seller_Type");

exports.addSeller_Type = (req, res) => {
    if (Object.keys(req.body.name).length === 0) {
        res.status(400).json(sellerTypeReq_fail)
    } else {
        let name_Lower = req.body.name.toLowerCase()
        const newAddSeller_Type = new Seller_type({
            name: name_Lower
        })
        newAddSeller_Type.save()
            .then(success => {
                res.status(200).json(sellerTypeAdd_Sucess)
            })
            .catch(err => {
                res.status(400).json(trysellerType_fail)
            })
    }

}

exports.getAllSeller_type = (req, res) => {
    Seller_type.find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(dataNotFound_fail)
        })
}

exports.editSeller_type = (req, res) => {
    if (Object.keys(req.body.seller_Type_Name).length === 0) {
        res.status(400).json(sellerTypeReq_fail)
    } else {
        let seller_Type_Name_Lower = req.body.seller_Type_Name.toLowerCase()
        Seller_type.updateOne({ _id: req.params.st_id }, { $set: { seller_Type_Name: seller_Type_Name_Lower } })
            .then(success => {
                res.status(200).json(sellerTypeUpdated_Sucess)
            })
            .catch(err => {
                res.status(400).json(sellerTypeUpdated_fail)
            })
    }
}