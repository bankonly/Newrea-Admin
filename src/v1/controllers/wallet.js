import Wallet from './../models/Wallet'
import Bank from './../models/Bank'
import Bank_type from './../models/Bank_type'
const { secretOrKeyBank } = require("./../configs/setup");
import crypto from "crypto-js"

// Validation
import validate_add_wallet from './../validations/add_wallet'
import validate_edit_wallet from './../validations/edit_wallet'
const add_wallet = (req, res) => {
    try {
        const { errors, isValid } = validate_add_wallet(req.body)
        if (!isValid) {
            res.status(400).json(errors)
        } else {
            const bank_acc_no = req.body.bank_acc_no
            const encript_bank_acc_no = crypto.AES.encrypt(JSON.stringify(bank_acc_no), secretOrKeyBank);
            const newData = new Wallet({
                bank_id: req.body.bank_id,
                sell_id: req.body.sell_id,
                bank_acc_name: req.body.bank_acc_name,
                bank_acc_no: encript_bank_acc_no,
                bank_type_id: req.body.bank_type_id
            })
            newData.save()
                .then(success => {
                    res.status(201).json("Add Data successfully")
                }).catch(err => {
                    console.log(err)
                    res.status(400).json()
                })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json()
    }
}

// Get All
const get_all_wallet_by_res_id = (req, res) => {
    try {
        Wallet.find({ $and: [{ sell_id: req.params.sell_id }, { is_active: "active" }] })
            .populate({
                path: "bank_id bank_type_id",
                select: "-created_date -is_active"
            })
            .select("-created_date -is_active -sell_id ")
            .then(success => {
                if (success.length > 0) {
                    const resoult = success.map(resoult => {
                        return ({
                            _id: resoult._id,
                            bank_id: resoult.bank_id,
                            bank_type_id: resoult.bank_type_id,
                            bank_acc_name: resoult.bank_acc_name,
                            bank_acc_no:
                                crypto.AES.decrypt(resoult.bank_acc_no.toString(), secretOrKeyBank).toString(crypto.enc.Utf8).replace(/"/g, "").slice(0, 8) +
                                "xxxxxxxx" +
                                crypto.AES.decrypt(resoult.bank_acc_no.toString(), secretOrKeyBank).toString(crypto.enc.Utf8).replace(/"/g, "").substr(- 2),
                        })
                    })
                    res.status(200).json(resoult)
                } else {
                    res.status(204).json()
                }
            })

    } catch (err) {
        console.log(err)
        res.status(400).json()
    }
}

// Detlete
const delete_wallet = (req, res) => {
    try {
        Wallet.updateOne({ _id: req.params.wallet_id }, { $set: { is_active: "inactive" } })
            .then(success => {
                if (success.n > 0) {
                    res.status(200).json("Delete successfully")
                } else {
                    res.status(400).json()
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json()
            })
    } catch{
        console.log(err)
        res.status(400).json()
    }
}

// Edit
const edit_wallet = (req, res) => {
    try {
        // console.log(req.body)
        const { errors, isValid } = validate_edit_wallet(req.body)
        if (!isValid) {
            res.status(400).json(errors)
        } else {
            const bank_acc_no = req.body.bank_acc_no
            const encript_bank_acc_no = crypto.AES.encrypt(JSON.stringify(bank_acc_no), secretOrKeyBank);
            const newData = {
                bank_id: req.body.bank_id,
                sell_id: req.body.sell_id,
                bank_acc_name: req.body.bank_acc_name,
                bank_acc_no: encript_bank_acc_no.toString(),
                bank_type_id: req.body.bank_type_id
            }
            Wallet.updateOne({ _id: req.body.wallet_id }, { $set: newData })
                .then(success => {
                    if (success.n > 0) {
                        res.status(200).json("Edit data successfully")
                    } else {
                        res.status(400).json()
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json()
                })
        }
    } catch{
        console.log(err)
        res.status(400).json()
    }
}

// Bank
// Get All
const get_all_bank = (req, res) => {
    try {
        Bank.find({ is_active: "active" })
            .select("-created_date -is_active")
            .then(success => {
                if (success.length > 0) {
                    res.status(200).json(success)
                } else {
                    res.status(204).json()
                }
            })

    } catch (err) {
        console.log(err)
        res.status(400).json()
    }
}

// Bank Type
// Get All
const get_all_bank_type = (req, res) => {
    try {
        Bank_type.find({ is_active: "active" })
            .select("-created_date -is_active")
            .then(success => {
                if (success.length > 0) {
                    res.status(200).json(success)
                } else {
                    res.status(204).json()
                }
            })

    } catch (err) {
        console.log(err)
        res.status(400).json()
    }
}
export {
    add_wallet,
    get_all_wallet_by_res_id,
    delete_wallet,
    edit_wallet,
    get_all_bank,
    get_all_bank_type
}