import { writeFile } from "fs"
import uuid from "uuid"
import sharp from "sharp"

// Update Product
const upload_product_image = async (imageDataFiles, path_img, path_img_resize) => {
    const fileData = imageDataFiles
    const img_path = path_img
    const resize_path = path_img_resize
    var pd_imageName = []
    await fileData.map(res => {
        const imName = uuid() + Date.now() + ".jpg"
        sharp(res.data)
            .resize(800)
            .jpeg({ quality: 50, progressive: true })
            .toBuffer()
            .then(async data => {
                writeFile(
                    img_path + imName,
                    data, err => {
                        if (err) {
                            console.log(err)
                            // pd_imageName.push(resolve(imName))
                        } else {
                            // return imName
                            // console.log(imName);
                            // pd_imageName.push(imName)
                            // return resolve(imName)
                        }
                    }
                );
            })
            .catch(err => {
                console.log(err);
            })
        pd_imageName.push(imName)
    })
    return pd_imageName
}

// Update Product
const upload_bank_image = async (imageDataFiles, path_img, path_img_resize) => {
    const fileData = imageDataFiles
    const img_path = path_img
    const resize_path = path_img_resize
    var pd_imageName = []
    await fileData.map(res => {
        const imName = uuid() + Date.now() + ".jpg"
        sharp(res.data)
            .resize(200, 200)
            .jpeg({ quality: 50, progressive: true })
            .toBuffer()
            .then(async data => {
                writeFile(
                    img_path + imName,
                    data, err => {
                        if (err) {
                            console.log(err)
                            // pd_imageName.push(resolve(imName))
                        } else {
                            // return imName
                            // console.log(imName);
                            // pd_imageName.push(imName)
                            // return resolve(imName)
                        }
                    }
                );
            })
            .catch(err => {
                console.log(err);
            })
        pd_imageName.push(imName)
    })
    return pd_imageName
}

export {
    upload_product_image,
    upload_bank_image
}