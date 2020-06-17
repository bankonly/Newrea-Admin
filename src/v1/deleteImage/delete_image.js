import { unlink } from "fs"

const delete_img = (image_name, path_img, path_img_resize) => {
    const img = image_name
    const img_path = path_img
    const resize_path = path_img_resize
    img.map(data => {
        unlink(img_path + data, (err) => {
            if (err) {
                console.log(err)
            } else {
                return true
            }
        })
    })
}

export {
    delete_img
}