import fs from "fs"

export function deleteImage(data) {
    console.log(data[0])
    fs.unlink("./../img/seller_img/profile/" + data[0], (err) => {
        if (err) {
            console.log(err)
        } else {
            return true
        }
    })
    fs.unlink("./../img/seller_img/profile/512x512/" + data[0], (err) => {
        if (err) {
            console.log(err)
        } else {
            return true
        }
    })
    fs.unlink("./../img/seller_img/logo/" + data[1], (err) => {
        if (err) {
            console.log(err)
        } else {
            return true
        }
    })
    fs.unlink("./../img/seller_img/logo/128x128/" + data[1], (err) => {
        if (err) {
            console.log(err)
        } else {
            return true
        }
    })
}

export function deleteseller_image(data) {
    fs.unlink("./../img/seller_img/profile/" + data, (err) => {
        if (err) {
            console.log(err)
        } else {
            return true
        }
    })
    fs.unlink("./../img/seller_img/profile/512x512/" + data, (err) => {
        if (err) {
            console.log(err)
        } else {
            return true
        }
    })
}
export function deleteseller_logo(data) {
    fs.unlink("./../img/seller_img/logo/" + data, (err) => {
        if (err) {
            console.log(err)
        } else {
            return true
        }
    })
    fs.unlink("./../img/seller_img/logo/128x128/" + data, (err) => {
        if (err) {
            console.log(err)
        } else {
            return true
        }
    })
}