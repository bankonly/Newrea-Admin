import { unlink } from "fs"

const deleteseller_pd_img = (dataFile) => {
    const path_img = "./../img/pd_img/"
    const path_img_resize = "./../img/pd_img/resize/256x256/"
    dataFile.map(data => {
        unlink(path_img + data, (err) => {
            if (err) {
                console.log(err)
            } else {
                return true
            }
        })
        unlink(path_img_resize + data, (err) => {
            if (err) {
                console.log(err)
            } else {
                return true
            }
        })
    })
}

const del_pd_img = async (del_img, old_img) => {
    const path_img = "./../img/pd_img/"
    const path_img_resize = "./../img/pd_img/resize/256x256/"
    // console.log("del_img: ", del_img)
    // await new Promise((resolve, reject) => {
    const del = typeof del_img === 'string' ? [del_img] : del_img
    del.map(data => {
        unlink(path_img + data, (err) => {
            if (err) {
                console.log(err)
            } else {
                // return resolve(data)
            }
        })
        unlink(path_img_resize + data, (err) => {
            if (err) {
                console.log(err)
            } else {
            }
        })

    })
    // })
    // console.log("del: ", del)
    const image = old_img.filter(val => !del.includes(val));
    return image
}

// delete singer image
const del_singer_pd_img = async (del_img) => {
    const path_img = "./../img/pd_img/"
    const path_img_resize = "./../img/pd_img/resize/256x256/"
    // console.log("del_img: ", del_img)
    // await new Promise((resolve, reject) => {
    const del = typeof del_img === 'string' ? [del_img] : del_img
    del.map(data => {
        unlink(path_img + data, (err) => {
            if (err) {
                console.log(err)
            } else {
                // return resolve(data)
            }
        })
        unlink(path_img_resize + data, (err) => {
            if (err) {
                console.log(err)
            } else {
            }
        })
    })
}

// delete multi image
const del_multi_pd_img = async (img, option) => {
    const path_img = "./../img/pd_img/"
    const path_img_resize = "./../img/pd_img/resize/256x256/"
    // console.log("del_img: ", del_img)
    // await new Promise((resolve, reject) => {
    const del = typeof img === 'string' ? [img] : img
    const option_img = typeof option === 'string' ? [option] : option
    del.map(data => {
        unlink(path_img + data, (err) => {
            if (err) {
                console.log(err)
            } else {
                // return resolve(data)
            }
        })
        unlink(path_img_resize + data, (err) => {
            if (err) {
                console.log(err)
            } else {
            }
        })
    })

    option_img.map(data => {
        unlink(path_img + data, (err) => {
            if (err) {
                console.log(err)
            } else {
                // return resolve(data)
            }
        })
        unlink(path_img_resize + data, (err) => {
            if (err) {
                console.log(err)
            } else {
            }
        })
    })
}

export {
    deleteseller_pd_img,
    del_pd_img,
    del_singer_pd_img,
    del_multi_pd_img
}