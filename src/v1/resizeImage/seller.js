import sharp from "sharp"
import { writeFileSync } from "fs"

export function resizeSellerImage(seller, logo) {
    sharp("./../img/seller_img/profile/" + seller)
        .resize(512, 512)
        .toBuffer()
        .then(data => {
            writeFileSync(
                "./../img/seller_img/profile/512x512/" + seller,
                data
            );
        })
        .catch(err => {
            console.log(err);
        });
    sharp("./../img/seller_img/logo/" + logo)
        .resize(128, 128)
        .toBuffer()
        .then(data => {
            writeFileSync(
                "./../img/seller_img/logo/128x128/" + logo,
                data
            );
        })
        .catch(err => {
            console.log(err);
        });
}


// Resize Profile
export function resizeSeller_image(seller) {
    sharp("./../img/seller_img/profile/" + seller)
        .resize(512, 512)
        .toBuffer()
        .then(data => {
            writeFileSync(
                "./../img/seller_img/profile/512x512/" + seller,
                data
            );
        })
        .catch(err => {
            console.log(err);
        });
}


// Resize Logo
export function resizeSeller_logo(logo) {
    sharp("./../img/seller_img/logo/" + logo)
        .resize(128, 128)
        .toBuffer()
        .then(data => {
            writeFileSync(
                "./../img/seller_img/logo/128x128/" + logo,
                data
            );
        })
        .catch(err => {
            console.log(err);
        });
}