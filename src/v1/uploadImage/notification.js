import { writeFile } from "fs"
import uuid from "uuid"
import sharp from "sharp"

const upload_noti = async (imageDataFiles) => {
    // console.log(imageDataFiles)
    const path_img = "./../img/noti/"
    const path_img256x256 = "./../img/noti/256x256/"
    var pd_imageName = []
    await imageDataFiles.map(res => {
        const imName = uuid() + Date.now() + ".jpg"
        sharp(res.data)
            .resize(800)
            .jpeg({ quality: 50, progressive: true })
            .toBuffer()
            .then(async data => {
                writeFile(
                    path_img + imName,
                    data, err => {
                        if (err) {
                            console.log(err)
                        } else {
                        }
                    }
                );
            })
            .catch(err => {
                console.log(err);
            })
        sharp(res.data)
            .resize(256, 256)
            .jpeg({ quality: 50, progressive: true })
            .toBuffer()
            .then(async data => {
                writeFile(
                    path_img256x256 + imName,
                    data, err => {
                        if (err) {
                            console.log(err)
                        } else {
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
    upload_noti
}