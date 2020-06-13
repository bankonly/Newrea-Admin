import { writeFile } from "fs"
import uuid from "uuid"
import Jimp from 'jimp';
import sharp from "sharp"


// Upload single file
const single_upload = async (image) => {
    const path_img = "./../img/pd_img/"
    const path_img256 = "./../img/pd_img/resize/256x256/"
    // return new Promise((resolve, reject) => {
    //     writeFile(path_img + imageName, image.data, err => {
    //         if (err) {
    //             return resolve(false)
    //         } else {
    //             return resolve(imageName)
    //         }
    //     })
    // })

    if (image.length > 0) {
        return image.map(res => {
            // const imName = uuid() + ".jpg"
            const imName = uuid() + Date.now() + ".jpg"
            Jimp.read(res.data)
                .then(lenna => {
                    return lenna
                        .resize(800, Jimp.AUTO) // resize
                        .quality(50)
                        .write(path_img + imName); // save
                })
                .catch(err => {
                    console.error(err);
                });
            Jimp.read(res.data)
                .then(lenna => {
                    return lenna
                        .resize(256, 256) // resize
                        .quality(50)
                        .write(path_img256 + imName); // save
                })
                .catch(err => {
                    console.error(err);
                });

            return imName
        })
    }
}



// Upload single file
const sigle_option_upload = async (option_imgName) => {
    const option_img = await upload_option(option_imgName)

    return {
        option_img: option_img
    }
}
// Upload multi file
const multi_upload = async (imgName, option_imgName) => {
    const img = await upload_img(imgName)
    const option_img = await upload_option(option_imgName)

    return {
        img: img,
        option_img: option_img
    }
}

async function upload_img(image) {
    const path_img = "./../img/pd_img/"
    const path_img256 = "./../img/pd_img/resize/256x256/"
    if (image.length > 0) {
        return image.map(res => {
            // const imName = uuid() + ".jpg"
            const imName = uuid() + Date.now() + ".jpg"
            Jimp.read(res.data)
                .then(lenna => {
                    return lenna
                        .resize(800, Jimp.AUTO) // resize
                        .quality(50)
                        .write(path_img + imName); // save
                })
                .catch(err => {
                    console.error(err);
                });
            Jimp.read(res.data)
                .then(lenna => {
                    return lenna
                        .resize(256, 256) // resize
                        .quality(50)
                        .write(path_img256 + imName); // save
                })
                .catch(err => {
                    console.error(err);
                });

            return imName
        })
    }
}

async function upload_option(image) {
    const path_img = "./../img/pd_img/"
    const path_img256 = "./../img/pd_img/resize/256x256/"
    if (image.length > 0) {
        return image.map(res => {
            // const imName = uuid() + ".jpg"
            const imName = uuid() + Date.now() + ".jpg"
            Jimp.read(res.data)
                .then(lenna => {
                    return lenna
                        .resize(800, Jimp.AUTO) // resize
                        .quality(50)
                        .write(path_img + imName); // save
                })
                .catch(err => {
                    console.error(err);
                });
            Jimp.read(res.data)
                .then(lenna => {
                    return lenna
                        .resize(256, 256) // resize
                        .quality(50)
                        .write(path_img256 + imName); // save
                })
                .catch(err => {
                    console.error(err);
                });

            return {
                img: imName
            }
        })
    }
}

// Update Product
const update_product_image = async (imageDataFiles) => {
    const fileData = imageDataFiles.img ? imageDataFiles.img.data ? [imageDataFiles.img] : imageDataFiles.img : imageDataFiles
    const path_img = "./../img/pd_img/"
    const path_img_resize = "./../img/pd_img/resize/256x256/"
    var pd_imageName = []
    await fileData.map(res => {
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
        sharp(res.data)
            .resize(256, 256)
            // .jpeg({ quality: 50, progressive: true })
            .toBuffer()
            .then(async data => {
                writeFile(
                    path_img_resize + imName,
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

const upload_img_master = async (imgFile) => {
    // console.log(imgFile)
    // console.log(imgFile.data)
    const fileData = imgFile.data ? [imgFile] : imgFile
    // console.log(fileData)
    const path_img = "./../img/pd_img/"
    const path_img_resize = "./../img/pd_img/resize/256x256/"
    var pd_imageName = []
    await fileData.map(res => {
        // console.log(res.data)
        const imName = uuid() + Date.now() + ".jpg"
        sharp(res.data)
            .resize(800)
            .jpeg({ quality: 50, progressive: true })
            .toBuffer()
            .then(data => {
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
            // .jpeg({ quality: 50, progressive: true })
            .toBuffer()
            .then(data => {
                writeFile(
                    path_img_resize + imName,
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
    // console.log()
    return pd_imageName
}

const upload_option_img_master = async (imgFile) => {
    const fileData = imgFile.data ? [imgFile] : imgFile
    const path_img = "./../img/pd_img/"
    const path_img_resize = "./../img/pd_img/resize/256x256/"
    var pd_imageName = []
    await fileData.map(res => {
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
            // .jpeg({ quality: 50, progressive: true })
            .toBuffer()
            .then(async data => {
                writeFile(
                    path_img_resize + imName,
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
        pd_imageName.push({ img: imName })
    })
    return pd_imageName
}

export {
    single_upload,
    multi_upload,
    update_product_image,
    upload_img_master,
    upload_option_img_master,
    sigle_option_upload
}