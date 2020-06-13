import { writeFile } from "fs"
import uuid from "uuid"


// Upload single file
const single_upload = async (image) => {
    const imageName = uuid() + Date.now() + ".jpg"
    const path_img = "./../img/dp_category/"
    return new Promise((resolve, reject) => {
        writeFile(path_img + imageName, image.data, err => {
            if (err) {
                return resolve(false)
            } else {
                return resolve(imageName)
            }
        })
    })
}

export {
    single_upload
}