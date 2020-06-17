import Bank from "./../models/Bank"

// Validation
import validate_add_bank from '../../validations/add_bank'

import { upload_bank_image } from "./../uploadImage/upload_image"
import { delete_img } from "./../deleteImage/delete_image"

const add_bank = async (req, res) => {

    try {
        const { errors, isValid } = validate_add_bank(req.body)
        if (!isValid) {
            res.status(400).json(errors)
        } else {
            if (!req.files || Object.keys(req.files.logo).length === 0) {
                res.status(400).json({
                    logo: "Logo field is required"
                })
            } else {
                const logo = [req.files.logo]
                const path_img = "./../img/bank/"
                const path_img_resize = false
                const logo_name = await upload_bank_image(logo, path_img, path_img_resize)
                if (logo_name) {
                    const newData = new Bank({
                        name_la: req.body.name_la,
                        name_en: req.body.name_en,
                        logo: logo
                    })
                    newData.save()
                        .then(success => {
                            res.status(200).json("Add Data successfully")
                        }).catch(err => {
                            console.log(err)
                            res.status(400).json()
                        })
                } else {
                    res.status(400).json()
                }
            }
        }
    } catch (err) {
        console.log(err)
        res.status(400).json()
    }
}

export { add_bank }