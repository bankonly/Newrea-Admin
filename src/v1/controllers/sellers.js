// const gravatar = require("gravatar");
import { genSalt, hash as _hash } from "bcryptjs";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
const { secretOrKey, secretOrKeyPass, secretChangePassword } = require("./../configs/setup");
import Seller from "./../models/Seller";
import Popular_product from "./../models/Popular_product";
import Category from "./../models/Category"
import crypto from "crypto-js";

import { save_change_password } from "./change_password"

// Noti
import { send_noti_on_change_status, send_noti_on_change_password } from './notification'

// Load Input Validation
import validateRegisterInput from "./../validations/registerSeller";
import validateLoginInput from "./../validations/loginSeller";
import validateEditInput from "./../validations/editSeller";
import validateChangePasswordInput from "./../validations/changePassword";

// Upload Image
import {
  uploadImage,
  editmultiImage,
  editImage_seller_image,
  editImage_seller_logo,
} from "./../uploadImage/seller";

// Delete
import {
  deleteImage,
  deleteseller_image,
  deleteseller_logo,
} from "./../deleteImage/seller";

// Response Message
import { login_sucess, passChange_Sucess } from "./../message/sucess_message";
import {
  login_error,
  userAlreadyExt_error,
  internetCheck_error,
  somethingWrn_error,
  passMismatch_error,
  logoMissing_error,
  selNotFound_error,
  updateProfile_fail,
} from "./../message/error_message";

// @route   Add Seller
// @desc    Register Seller
// @access  Public
export async function seller_register(req, res, next) {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const userName = await Seller.findOne({ user_name: req.body.user_name });
    if (userName) {
      return res.status(400).json(userAlreadyExt_error);
    } else {
      const localtion = [
        {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
      ];
      const logo = req.files.logo;
      const img = req.files.img;

      if (logo && img) {
        const imageName = await uploadImage(img, logo);
        const password = req.body.pass;
        const encriptPass = crypto.AES.encrypt(
          JSON.stringify(password),
          secretOrKeyPass
        );

        const category_id =
          typeof req.body.category_id === "string"
            ? [req.body.category_id]
            : req.body.category_id;
        const newData = new Seller({

          category_id: category_id,
          user_name: req.body.user_name,
          name: req.body.name,
          pass: encriptPass,
          phone: req.body.phone,
          img: imageName.img,
          logo: imageName.logo,
          location: localtion[0],
          address: req.body.address,
          delivery_fee_option_id: req.body.delivery_fee_option_id,
          type: req.body.type,
        });
        newData
          .save()
          .then((result) => {
            if (result) {
              return res.status(201).json(result);
            } else {
              return res.status(400).json(somethingWrn_error);
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(somethingWrn_error);
          });
      } else {
        return res.status(400).json(logoMissing_error);
      }
    }
  }
}

async function updateSellerProfile(sell_id, data) {
  return Seller.updateOne({ _id: sell_id }, { $set: data })
    .then((success) => {
      if (success.n) {
        return 200;
      } else {
        return 400;
      }
    })
    .catch((err) => {
      console.log(err);
      return 400;
    });
}


// Edit profile
export async function editProfile(req, res) {
  const { errors, isValid } = validateEditInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    if (req.body.product_id === undefined) {
      var product_id = []
    } else {
      var product_id =
        typeof req.body.product_id === "string"
          ? [req.body.product_id]
          : req.body.product_id;
    }

    // console.log(product_id)

    const seller = await Seller.findById(req.body.sell_id);
    if (!seller) {
      return res.status(204).json(selNotFound_error);
    } else {
      const oldData = {
        _id: seller._id,
        com: seller.com,
        user_uame: seller.user_uame,
        date: seller.date,
      };

      const localtion = [
        {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
      ];

      const seller_logo = req.files === null ? req.files : req.files.logo;
      const seller_img = req.files === null ? req.files : req.files.img;

      if (seller_logo && seller_img) {
        let oldImage = [seller.img, seller.logo];
        let newImage = [seller_img, seller_logo];
        const imageName = await editmultiImage(newImage, oldImage);
        const data = {
          name: req.body.name,
          category_id: req.body.category_id,
          phone: req.body.phone,
          location: localtion,
          address: req.body.address,

          img: imageName.img,
          logo: imageName.logo,
        };
        const updateprofile = await updateSellerProfile(req.body.sell_id, data);
        if (updateprofile === 200) {
          const category = await Category.find({ _id: req.body.category_id })

          data.category_id = category
          const resultData = { ...data, ...oldData };

          // Popula product
          const popula_product = await Popular_product.findOne({ seller_id: req.body.sell_id })
          // console.log(popula_product)
          if (popula_product) {
            Popular_product.updateOne({ seller_id: req.body.sell_id }, { $set: { product_id: product_id } })
              .then(suc => {
                if (suc.n > 0) {
                  return res.status(updateprofile).json(resultData);
                } else {
                  return res.status(updateprofile).json(resultData);
                }
              }).catch(e => {
                // return res.status(updateprofile).json(updateProfile_fail);
                return res.status(updateprofile).json(resultData);
              })
          } else {
            const populaData = new Popular_product({
              seller_id: req.body.sell_id,
              product_id: product_id
            })
            populaData.save()
              .then(suc => {
                return res.status(updateprofile).json(resultData);
              })
              .catch(e => {
                // return res.status(updateprofile).json(updateProfile_fail);
                return res.status(updateprofile).json(resultData);
              })
          }

          // return res.status(updateprofile).json(resultData);
        } else {
          return res.status(updateprofile).json(updateProfile_fail);
        }
      } else {
        if (seller_img) {
          const seller_imageName = await editImage_seller_image(
            seller_img,
            seller.img
          );
          const data = {
            name: req.body.name,
            category_id: req.body.category_id,
            phone: req.body.phone,
            location: localtion,
            address: req.body.address,

            img: seller_imageName.img,
            logo: req.body.logo,
          };
          const updateprofile = await updateSellerProfile(
            req.body.sell_id,
            data
          );
          if (updateprofile === 200) {
            const category = await Category.find({ _id: req.body.category_id })

            data.category_id = category
            const resultData = { ...data, ...oldData };
            // Popula product
            const popula_product = await Popular_product.findOne({ seller_id: req.body.sell_id })
            // console.log(popula_product)
            if (popula_product) {
              Popular_product.updateOne({ seller_id: req.body.sell_id }, { $set: { product_id: product_id } })
                .then(suc => {
                  if (suc.n > 0) {
                    return res.status(updateprofile).json(resultData);
                  } else {
                    return res.status(updateprofile).json(resultData);
                  }
                }).catch(e => {
                  // return res.status(updateprofile).json(updateProfile_fail);
                  return res.status(updateprofile).json(resultData);
                })
            } else {
              const populaData = new Popular_product({
                seller_id: req.body.sell_id,
                product_id: product_id
              })
              populaData.save()
                .then(suc => {
                  return res.status(updateprofile).json(resultData);
                })
                .catch(e => {
                  // return res.status(updateprofile).json(updateProfile_fail);
                  return res.status(updateprofile).json(resultData);
                })
            }

            //   const resultData = { ...data, ...oldData };
            //   return res.status(updateprofile).json(resultData);
          } else {
            return res.status(updateprofile).json(updateProfile_fail);
          }
        } else if (seller_logo) {
          const seller_logoName = await editImage_seller_logo(
            seller_logo,
            seller.logo
          );
          const data = {
            name: req.body.name,
            category_id: req.body.category_id,
            phone: req.body.phone,
            location: localtion,
            address: req.body.address,

            img: req.body.img,
            logo: seller_logoName.logo,
          };
          const updateprofile = await updateSellerProfile(
            req.body.sell_id,
            data
          );
          if (updateprofile === 200) {
            const category = await Category.find({ _id: req.body.category_id })

            data.category_id = category
            const resultData = { ...data, ...oldData };

            // Popula product
            const popula_product = await Popular_product.findOne({ seller_id: req.body.sell_id })
            if (popula_product) {
              Popular_product.updateOne({ seller_id: req.body.sell_id }, { $set: { product_id: product_id } })
                .then(suc => {
                  if (suc.n > 0) {
                    return res.status(updateprofile).json(resultData);
                  } else {
                    return res.status(updateprofile).json(resultData);
                  }
                }).catch(e => {
                  // return res.status(updateprofile).json(updateProfile_fail);
                  return res.status(updateprofile).json(resultData);
                })
            } else {
              const populaData = new Popular_product({
                seller_id: req.body.sell_id,
                product_id: product_id
              })
              populaData.save()
                .then(suc => {
                  return res.status(updateprofile).json(resultData);
                })
                .catch(e => {
                  // return res.status(updateprofile).json(updateProfile_fail);
                  return res.status(updateprofile).json(resultData);
                })
            }

            // return res.status(updateprofile).json(resultData);
          } else {
            return res.status(updateprofile).json(updateProfile_fail);
          }
        } else {
          const data = {
            name: req.body.name,
            category_id: req.body.category_id,
            phone: req.body.phone,
            location: localtion,
            address: req.body.address,

            img: req.body.img,
            logo: req.body.logo,
          };

          const updateprofile = await updateSellerProfile(
            req.body.sell_id,
            data
          );
          if (updateprofile === 200) {
            const category = await Category.find({ _id: req.body.category_id })

            data.category_id = category
            const resultData = { ...data, ...oldData };

            // Popula product
            const popula_product = await Popular_product.findOne({ seller_id: req.body.sell_id })
            if (popula_product) {
              Popular_product.updateOne({ seller_id: req.body.sell_id }, { $set: { product_id: product_id } })
                .then(suc => {
                  if (suc.n > 0) {
                    return res.status(updateprofile).json(resultData);
                  } else {
                    return res.status(updateprofile).json(resultData);
                  }
                }).catch(e => {
                  // return res.status(updateprofile).json(updateProfile_fail);
                  return res.status(updateprofile).json(resultData);
                })
            } else {
              const populaData = new Popular_product({
                seller_id: req.body.sell_id,
                product_id: product_id
              })
              populaData.save()
                .then(suc => {
                  return res.status(updateprofile).json(resultData);
                })
                .catch(e => {
                  // return res.status(updateprofile).json(updateProfile_fail);
                  return res.status(updateprofile).json(resultData);
                })
            }

            // return res.status(updateprofile).json(resultData);
          } else {
            return res.status(updateprofile).json(updateProfile_fail);
          }
        }
      }
    }
  }
}

// @route   POST Seller
// @desc    Login User / Returning JWT Token
// @access  Pivate
export async function sell_login(req, res, next) {
  // console.log(req.body)

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user_name = req.body.user_name;
  const password = req.body.pass;

  // Find user by email
  const seller = await Seller.findOne({ user_name: user_name });
  // Check for user

  if (!seller) {
    return res.status(404).json(login_error);
  } else {
    let passDecript = crypto.AES.decrypt(
      seller.pass.toString(),
      secretOrKeyPass
    );

    let decryptPass = passDecript.toString(crypto.enc.Utf8);
    // console.log(decryptPass)
    if (decryptPass) {
      decryptPass = decryptPass.replace(/"/g, "");
      if (password === decryptPass) {
        const payload = {
          id: seller.id,
        }; // Create JWT Payload
        const token = sign(payload, secretOrKey, {
          expiresIn: 600,
        });
        const response = {
          success: true,
          token: "Bearer " + token,
        };
        return res.status(200).json(response);
      } else {
        return res.status(400).json(passMismatch_error);
      }
    } else {
      return res.status(400).json(login_error);
    }
  }
}

// @route   GET Customer
// @desc    Return current user
// @access  Private
const _Seller = (req, res, next) => {
  Seller.findById(req.user.id)
    .populate({
      path: "delivery_fee_option_id category_id",
    })
    .select("-pass")
    .then((seller) => {
      if (seller) {
        return res.status(200).json(seller);
      }
      res.status(400).json(selNotFound_error);
    })
    .catch((err) => console.log(err));
};
export { _Seller as seller };

// Change password
export async function changPassword(req, res) {
  const { errors, isValid } = validateChangePasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const sell_id = req.body.sell_id;
    const oldpassword = req.body.sell_old_pass;
    const newpassword = req.body.sell_new_pass;
    // Find user by ID
    const seller = await Seller.findById(sell_id);
    if (!seller) {
      res.status(204).end();
    } else {
      let passDecript = crypto.AES.decrypt(
        seller.pass.toString(),
        secretOrKeyPass
      );
      var decryptPass = passDecript.toString(crypto.enc.Utf8);
      if (decryptPass) {
        decryptPass = decryptPass.replace(/"/g, "");
        if (oldpassword === decryptPass) {
          const encriptPass = crypto.AES.encrypt(
            JSON.stringify(newpassword),
            secretOrKeyPass
          );
          Seller.updateOne(
            { _id: sell_id },
            { $set: { pass: encriptPass.toString() } }
          )
            .then((success) => {
              if (success.n) {
                res.status(200).json(passChange_Sucess);


                const data_change = crypto.AES.encrypt(
                  JSON.stringify(Date.now()),
                  secretChangePassword
                );
                const data_change_pass = {
                  user_id: req.body.sell_id,
                  data_change: data_change.toString(),
                  IMEI_UUID: req.body.IMEI_UUID,
                }
                save_change_password(data_change_pass)
                // const notiData = {
                //   user_id: sell_id,
                //   IMEI_UUID: req.body.IMEI_UUID
                // }
                // send_noti_on_change_password(notiData)
              } else {
                res.status(203).json(somethingWrn_error);
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json(somethingWrn_error);
            });
        } else {
          return res.status(400).json(passMismatch_error);
        }
      }
    }
  }
}

export function get_allSeller(req, res) {
  Seller.find()
    .then((seller) => {
      res.status(200).json(seller);
    })
    .catch((err) => {
      console.log(err);
    });
}
// Update Status
export async function updateSellerSatatus(req, res) {
  const seller = await Seller.findById(req.body.sell_id);
  // console.log(req.body)
  if (!seller) {
    res.status(204).json(selNotFound_error);
  } else {
    Seller.updateOne(
      { _id: req.body.sell_id },
      { $set: { sell_status: req.body.sell_status } }
    )
      .then((success) => {
        console.log(success)
        if (success.n) {
          const data = {
            _id: seller._id,
            userName: seller.userName,
            sell_name: seller.sell_name,
            sell_phone: seller.sell_phone,
            sell_location: seller.localtion,
            sell_address: seller.sell_address,
            sell_type: seller.sell_type,
            sell_img: seller.sell_img,
            sell_logo: seller.sell_logo,
            sell_com: seller.sell_com,
            sell_status: req.body.sell_status,
            sell_type: seller.sell_type,
            sell_date: seller.sell_date,
          };
          res.status(200).json(data);
          const notiData = {
            user_id: seller._id,
            IMEI_UUID: req.body.IMEI_UUID
          }
          send_noti_on_change_status(notiData)
        } else {
          res.status(204).end();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(204).end();
      });
  }
}

export function test(req, res) {
  try {
    // const flower = {
    //   colors: {
    //     red: true
    //   }
    // }

    // console.log(flower.colors.red) // this will work
    // console.log(flower.species?.lily)

    // // Array
    // let flowers = ['lily', 'daisy', 'rose']
    // console.log(flowers[1]) // daisy
    // flowers = null
    // console.log(flowers?.[1]) // undefined
    // // console.log(flowers[1]) // TypeError: Cannot read property '1' of null
    // let number = 0
    // let myNumber = number || 7
    // let myNumber2 = number ?? 7
    // console.log({ myNumber, myNumber2 })

    const text = "from 2019-01-29 to 2020-01-30";
    const regexp = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/gu;
    const results = text.match(regexp);

    console.log(results);
    // console.log(regexp);
    // [ '2019.01.29', '2019.01.30' ]
    res.status(200).json("Success")
  } catch (err) {
    console.log(err)
    res.status(400).json("Failure")
  }
}

export async function update_seller_online(req, res) {
  const seller = await Seller.findById(req.body.sell_id)
    .populate({
      path: "delivery_fee_option_id category_id",
    })
    .select("-pass")
  if (!seller) {
    res.status(204).json(selNotFound_error);
  } else {
    Seller.updateOne(
      { _id: req.body.sell_id },
      { $set: { is_online: req.body.is_online } }
    )
      .then((success) => {
        if (success.n) {
          // const data = {
          //   _id: seller._id,
          //   seller_type_id: seller.seller_type_id,
          //   user_name: seller.user_name,
          //   name: seller.name,
          //   phone: seller.phone,
          //   img: seller.img,
          //   logo: seller.logo,
          //   location: seller.location,
          //   address: seller.address,
          //   com: seller.com,
          //   is_online: req.body.is_online,
          // };
          let data = seller
          data.is_online = req.body.is_online
          res.status(200).json(data);
          const notiData = {
            user_id: seller._id,
            IMEI_UUID: req.body.IMEI_UUID,
            is_online: req.body.is_online
          }
          send_noti_on_change_status(notiData)
        } else {
          res.status(204).end();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(204).end();
      });
  }
}
