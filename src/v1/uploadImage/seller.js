import fs from "fs"
import uuid from "uuid"

// Image Resize
import { resizeSellerImage, resizeSeller_image, resizeSeller_logo } from "./../resizeImage/seller"

// DeleteImage
import { deleteImage, deleteseller_image, deleteseller_logo } from "./../deleteImage/seller"
import Seller from "../models/Seller"

export async function uploadImage(img, logo) {
    const imageName_sell = uuid() + ".jpg"
    const imageName_logo = uuid() + ".jpg"
    const path_img = "./../img/seller_img/profile/"
    const path_logo = "./../img/seller_img/logo/"

    fs.writeFileSync(path_img + imageName_sell, img.data)
    fs.writeFileSync(path_logo + imageName_logo, logo.data)
    resizeSellerImage(imageName_sell, imageName_logo)

    return ({
        img: imageName_sell,
        logo: imageName_logo,
    })
}

export async function editmultiImage(newImage, oldImage) {
    const imageName_sell = uuid() + ".jpg"
    const imageName_logo = uuid() + ".jpg"
    const path_img = "./../img/seller_img/profile/"
    const path_logo = "./../img/seller_img/logo/"

    // fs.writeFileSync(path_img + imageName_sell, newImage[0].data)
    // fs.writeFileSync(path_logo + imageName_logo, newImage[1].data)
    // resizeSellerImage(imageName_sell, imageName_logo);
    // deleteImage(oldImage)

    const img = await new Promise((resolve, reject) => {
        return fs.writeFile(path_img + imageName_sell, newImage[0].data, (err) => {
            if (err) {
                console.log(err)
                return resolve(oldImage[0])
            } else {
                resizeSeller_image(imageName_sell)
                deleteseller_image(oldImage[0])
                return resolve(imageName_sell)
            }
        })
    })
    const logo = await new Promise((resolve, reject) => {
        return fs.writeFile(path_logo + imageName_logo, newImage[1].data, (err) => {
            if (err) {
                console.log(err)
                return resolve(oldImage[1])
            } else {
                resizeSeller_logo(imageName_logo)
                deleteseller_logo(oldImage[1])
                return resolve(imageName_logo)
            }
        })
    })
    return ({
        img: img,
        logo: logo,
    })
}

export async function editImage_seller_image(newImage, oldImage) {
    const imageName_sell = uuid() + ".jpg"
    const path_img = "./../img/seller_img/profile/"
    return new Promise((resolve, reject) => {
        fs.writeFile(path_img + imageName_sell, newImage.data, (err) => {
            if (err) {
                console.log(err)
                return resolve({
                    img: oldImage,
                })
            } else {
                resizeSeller_image(imageName_sell)
                deleteseller_image(oldImage)
                return resolve({
                    img: imageName_sell,
                })
            }
        })
    })
}
export async function editImage_seller_logo(newImage, oldImage) {
    const imageName_logo = uuid() + ".jpg"
    const path_logo = "./../img/seller_img/logo/"
    return new Promise((resolve, reject) => {
        fs.writeFile(path_logo + imageName_logo, newImage.data, (err) => {
            if (err) {
                console.log(err)
                return resolve({
                    logo: oldImage
                })
            } else {
                resizeSeller_logo(imageName_logo)
                deleteseller_logo(oldImage)
                return resolve({
                    logo: imageName_logo
                })
            }
        })
    })

}

