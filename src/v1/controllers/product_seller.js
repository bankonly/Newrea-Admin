import ProductSeller from "./../models/ProductSeller";
import Product_master from "./../models/Product_master";
import Product_option from "./../models/Product_option";
import Flash_deal from "./../models/Flash_deal";

// Validation
import product_master_add from "./../validations/product_master_add";
import {
  single_upload,
  multi_upload,
  update_product_image,
  upload_img_master,
  upload_option_img_master,
  sigle_option_upload,
} from "./../uploadImage/product_master";
import {
  deleteseller_pd_img,
  del_pd_img,
  del_singer_pd_img,
  del_multi_pd_img,
} from "./../deleteImage/product";

// Funtional
import {
  savePDMaster,
  savePDSeller,
  saveProduct_optionData,
} from "../func/product";
// import { pd_option } from "../func/product_option"
// import { addProd_success, updateProduct_Sucess } from "../message/sucess_message"
// import { somethingWrn_error, updateProduct_fail } from "../message/error_message"
// import e from "express"
import {
  addProd_success,
  updateProduct_Sucess,
} from "../message/sucess_message";
import {
  somethingWrn_error,
  updateProduct_fail,
  addProdFail_error,
} from "../message/error_message";

const addProductSeller = async (req, res) => {
  try {
    if (req.body.price && req.body.stock) {
      if (req.body.product_master_id) {
        const newProductSeller = new ProductSeller({
          product_master_id: req.body.product_master_id,
          seller_id: req.body.seller_id,
          get_coins: req.body.get_coins,
          gender: req.body.gender,
          price: parseInt(req.body.price),
          stock: parseInt(req.body.stock),
        });
        const pd_seller = await savePDSeller(newProductSeller);
        if (pd_seller) {
          res.status(201).json(addProd_success);
        } else {
          res.status(400).json(addProdFail_error);
        }
      } else {
        const img = req.files.img.data ? [req.files.img] : req.files.img;
        const imgName = await single_upload(img);
        const newProduct_master = new Product_master({
          name: req.body.name,
          brand: req.body.brand,
          img: imgName,
          SKU: req.body.SKU,
          desc: req.body.desc,
          cat_id: req.body.cat_id,
          is_added_by: "seller",
        });
        const addData = await savePDMaster(newProduct_master);
        if (addData) {
          const newProductSeller = new ProductSeller({
            product_master_id: newProduct_master._id,
            seller_id: req.body.seller_id,
            get_coins: req.body.get_coins,
            gender: req.body.gender,
            price: parseInt(req.body.price),
            stock: parseInt(req.body.stock),
          });
          const pd_seller = await savePDSeller(newProductSeller);
          if (pd_seller) {
            res.status(201).json(addProd_success);
          } else {
            res.status(400).json(addProdFail_error);
          }
        } else {
          res.status(400).json(addProdFail_error);
        }
      }
    } else {
      // console.log(req.body)
      // console.log(req.files)
      if (req.body.product_master_id) {
        const option_detail =
          typeof req.body.option_detail === "string"
            ? [req.body.option_detail]
            : req.body.option_detail;
        // console.log(option_detail)
        const option_title = req.body.option_title;
        const op_dt = option_detail.map((res) => {
          return JSON.parse(res);
        });
        const data = await pd_option_image_has_master(
          req.files.option_img,
          op_dt
        );
        const newProduct_optionData = new Product_option({
          option_title: option_title,
          option_detail: data.pd_option,
        });
        // console.log(newProduct_optionData)
        const addPD_optionData = await saveProduct_optionData(
          newProduct_optionData
        );
        if (addPD_optionData) {
          const newProductSeller = new ProductSeller({
            product_master_id: req.body.product_master_id,
            seller_id: req.body.seller_id,
            get_coins: req.body.get_coins,
            gender: req.body.gender,
            product_option_id: newProduct_optionData._id,
          });
          newProductSeller
            .save()
            .then((success) => {
              res.status(201).json(addProd_success);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json();
            });
        } else {
          res.status(400).json();
        }
      } else {
        const option_detail =
          typeof req.body.option_detail === "string"
            ? [req.body.option_detail]
            : req.body.option_detail;
        // console.log(option_detail)
        const option_title = req.body.option_title;
        const op_dt = option_detail.map((res) => {
          return JSON.parse(res);
        });
        const img = req.files.img.data ? [req.files.img] : req.files.img;
        // console.log(req.files.option_img)
        const data =
          req.files.option_img === undefined
            ? await pd_option_no_image(img, op_dt)
            : await pd_option_image(req.files.option_img, img, op_dt);
        const newProduct_optionData = new Product_option({
          option_title: option_title,
          option_detail: data.pd_option,
        });
        const { errors, isValid } = product_master_add(req.body);

        if (!isValid) {
          res.status(400).json(errors);
        } else {
          if (!req.files || Object.keys(req.files.img).length === 0) {
            res.status(400).json({ img: "Image field is required" });
          } else {
            const newProduct_master = new Product_master({
              name: req.body.name,
              brand: req.body.brand,
              img: data.img,
              SKU: req.body.SKU,
              cat_id: req.body.cat_id,
              desc: req.body.desc,
              is_added_by: "seller",
            });
            const addData = await savePDMaster(newProduct_master);
            if (addData) {
              const addPD_optionData = await saveProduct_optionData(
                newProduct_optionData
              );
              if (addPD_optionData) {
                const newProductSeller = new ProductSeller({
                  product_master_id: newProduct_master._id,
                  seller_id: req.body.seller_id,
                  get_coins: req.body.get_coins,
                  gender: req.body.gender,
                  product_option_id: newProduct_optionData._id,
                });
                const pd_seller = await savePDSeller(newProductSeller);
                if (pd_seller) {
                  res.status(201).json(addProd_success);
                } else {
                  res.status(400).json(addProdFail_error);
                }
              } else {
                res.status(400).json(addProdFail_error);
              }
            } else {
              res.status(400).json(addProdFail_error);
            }
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(somethingWrn_error);
  }
};

async function pd_option_image_has_master(optionImage, op_dt) {
  const option_img = optionImage.data ? [optionImage] : optionImage;
  const imgName = await sigle_option_upload(option_img);
  let option_detail_result = op_dt.map((item, i) =>
    Object.assign({}, item, imgName.option_img[i])
  );
  const pd_option = option_detail_result.map((res) => {
    return {
      ...res,
      price: parseInt(res.price.replace(/\.|,|-|[a-zA-Z]| /g, "")),
      stock: parseInt(res.stock.replace(/\.|,|-|[a-zA-Z]| /g, "")),
      img: res.img,
    };
  });
  return {
    pd_option: pd_option,
  };
}

async function pd_option_image(optionImage, img, op_dt) {
  const option_img = optionImage.data ? [optionImage] : optionImage;
  const imgName = await multi_upload(img, option_img);
  let option_detail_result = op_dt.map((item, i) =>
    Object.assign({}, item, imgName.option_img[i])
  );
  const pd_option = option_detail_result.map((res) => {
    return {
      ...res,
      price: parseInt(res.price.replace(/\.|,|-|[a-zA-Z]| /g, "")),
      stock: parseInt(res.stock.replace(/\.|,|-|[a-zA-Z]| /g, "")),
      img: res.img,
    };
  });
  return {
    img: imgName.img,
    pd_option: pd_option,
  };
}

async function pd_option_no_image(img, op_dt) {
  const imgName = await single_upload(img);
  const option_detail = op_dt.map((res) => {
    return {
      ...res,
      price: parseInt(res.price.replace(/\.|,|-|[a-zA-Z]| /g, "")),
      stock: parseInt(res.stock.replace(/\.|,|-|[a-zA-Z]| /g, "")),
    };
  });
  return {
    img: imgName,
    pd_option: option_detail,
  };
}

// Get all product seller
const get_all_product_by_sell_id = (req, res) => {
  ProductSeller.find({
    $and: [{ seller_id: req.params.seller_id }, { is_active: "active" }],
  })
    .populate({
      path: "product_master_id",
      populate: {
        path: "cat_id",
        select: "name parent_id",
        populate: {
          path: "parent_id",
          populate: {
            path: "parent_id",
          },
        },
      },
    })
    .populate({
      path: "product_option_id",
    })
    .then((success) => {
      if (success.length > 0) {
        res.status(200).json(success);
      } else {
        res.status(204).json(success);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(somethingWrn_error);
    });
};
// Get all product seller
const get_product_by_pd_sell_id = (req, res) => {
  ProductSeller.find({
    $and: [{ _id: req.params.pd_sell_id }, { is_active: "active" }],
  })
    .populate({
      path: "product_master_id",
      populate: {
        path: "cat_id",
        select: "name parent_id",
        populate: {
          path: "parent_id",
          select: "name parent_id",
          populate: {
            path: "parent_id",
            select: "name parent_id",
          },
        },
      },
    })
    .populate({
      path: "product_option_id",
    })
    .then((success) => {
      if (success.length > 0) {
        res.status(200).json(success);
      } else {
        res.status(204).json(success);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(success);
    });
};

// Delete
const delete_product = (req, res) => {
  ProductSeller.updateOne(
    { _id: req.params.pd_seller_id },
    { $set: { is_active: "inactive" } }
  )
    .then((success) => {
      if (success.n > 0) {
        res.status(200).json("Deleted");
      } else {
        res.status(400).json("Delete failur");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json();
    });
};

// Seller Edit Product
const edit_pd_by_pd_seller_id_no_option = async (req, res) => {
  try {
    const product = await ProductSeller.findById(req.body.pd_id).populate(
      "product_master_id",
      "img name brand SKU"
    );
    if (product) {
      // console.log(req.body)
      // console.log()
      if (req.body.changed_img && req.files) {
        // console.log("change Image: ", req.body.changed_img)
        if (req.body.price) {
          // const img_file = req.files.option_img === undefined ? await pd_option_no_image(img, op_dt) : await pd_option_image(req.files.option_img, img, op_dt)
          const imgfile = req.files.img.data ? [req.files.img] : req.files.img;
          const image_pd_name = await update_product_image(imgfile);
          if (image_pd_name.length > 0) {
            // console.log(image_pd_name)
            const changed_img = JSON.parse(req.body.changed_img);
            const old_image = product.product_master_id.img.filter(
              (val) => !changed_img.img.includes(val)
            );
            const delete_img = product.product_master_id.img.filter((val) =>
              changed_img.img.includes(val)
            );
            const newData = [...old_image, ...image_pd_name];
            const newData_pd_master = {
              img: newData,
              name: req.body.name,
              brand: req.body.brand,
              desc: req.body.desc,
              cat_id: req.body.cat_id,
            };
            const newData_pd_seller = {
              price: req.body.price,
              gender: req.body.gender,
              stock: req.body.stock,
            };
            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_seller = await update_pd_seller(
              product._id,
              newData_pd_seller
            );
            if (pd_master && pd_seller) {
              deleteseller_pd_img(delete_img);
              res.status(200).json(updateProduct_Sucess);
            } else {
              const oldData = {
                img: product.product_master_id.img,
                name: product.product_master_id.name,
                brand: product.product_master_id.brand,
                SKU: product.product_master_id.SKU,
                desc: product.product_master_id.desc,
                cat_id: product.product_master_id.cat_id,
              };
              if (pd_master) {
                deleteseller_pd_img(image_pd_name);
                await update_pd_master(product.product_master_id._id, oldData);
                res.status(400).json(updateProduct_fail);
              } else if (pd_seller) {
                deleteseller_pd_img(image_pd_name);
                const oldData_seller = {
                  price: product.price,
                  stock: product.stock,
                };
                await update_pd_seller(product._id, oldData_seller);
                res.status(400).json(updateProduct_fail);
              } else {
                deleteseller_pd_img(image_pd_name);
                res.status(400).json(updateProduct_fail);
              }
            }
          }
        } else {
          console.log(" Not change Price: ");
        }
      } else {
        const changed_img = JSON.parse(req.body.changed_img);
        const del_img =
          changed_img.img.length > 0
            ? await del_pd_img(changed_img.img, product.product_master_id.img)
            : typeof req.body.img === "string"
              ? [req.body.img]
              : req.body.img;
        const img = req.files ? await update_product_image(req.files) : del_img;
        const new_img = req.files ? [...img, ...del_img] : img;
        const newData_pd_master = {
          img: new_img,
          name: req.body.name,
          brand: req.body.brand,
          desc: req.body.desc,
          cat_id: req.body.cat_id,
        };
        const newData_pd_seller = {
          price: req.body.price,
          gender: req.body.gender,
          stock: req.body.stock,
        };
        const pd_master = await update_pd_master(
          product.product_master_id._id,
          newData_pd_master
        );
        const pd_seller = await update_pd_seller(
          product._id,
          newData_pd_seller
        );
        if (pd_master && pd_seller) {
          res.status(200).json(updateProduct_Sucess);
        } else {
          const oldData = {
            img: product.product_master_id.img,
            name: product.product_master_id.name,
            brand: product.product_master_id.brand,
            SKU: product.product_master_id.SKU,
            desc: product.product_master_id.desc,
            cat_id: product.product_master_id.cat_id,
          };
          if (pd_master) {
            await update_pd_master(product.product_master_id._id, oldData);
            res.status(400).json(updateProduct_fail);
          } else if (pd_seller) {
            const oldData_seller = {
              price: product.price,
              stock: product.stock,
            };
            await update_pd_seller(product._id, oldData_seller);
            res.status(400).json(updateProduct_fail);
          } else {
            // deleteseller_pd_img(image_pd_name)
            res.status(400).json(updateProduct_fail);
          }
        }
      }
    } else {
      res.status(400).json();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

async function update_pd_master(id, data) {
  return Product_master.updateOne({ _id: id }, { $set: data })
    .then((success) => {
      if (success.n > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

// Update Product Seller
async function update_pd_seller(id, data) {
  return ProductSeller.updateOne({ _id: id }, { $set: data })
    .then((success) => {
      if (success.n > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

// Update Product Option
async function update_pd_option(id, data) {
  return Product_option.updateOne({ _id: id }, { $set: data })
    .then((success) => {
      if (success.n > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

const edit_pd_by_pd_seller_id_has_option = async (req, res) => {
  try {
    const product = await ProductSeller.findById(req.body.pd_id).populate(
      "product_master_id",
      "img name brand SKU"
    );
    if (product) {
      const file = req.files;
      if (file) {
        const changed_img = JSON.parse(req.body.changed_img);
        // console.log(changed_img)
        // console.log("Not change")
        const option_detail =
          typeof req.body.option_detail === "string"
            ? [req.body.option_detail]
            : req.body.option_detail;
        // console.log(option_detail)
        const option_title =
          typeof req.body.option_title === "string"
            ? [req.body.option_title]
            : req.body.option_title;
        const op_dt = option_detail.map((res) => {
          return JSON.parse(res);
        });
        const option_detail_data = op_dt.map((res) => {
          return {
            ...res,
            price:
              typeof res.price === "string"
                ? parseInt(res.price.replace(/\.|,|-|[a-zA-Z]| /g, ""))
                : res.price,
            stock:
              typeof res.stock === "string"
                ? parseInt(res.stock.replace(/\.|,|-|[a-zA-Z]| /g, ""))
                : res.stock,
            img: res.img,
          };
        });

        const newData_pd_master = {
          name: req.body.name,
          brand: req.body.brand,
          desc: req.body.desc,
          cat_id: req.body.cat_id,
        };
        const newData_pd_option = {
          option_title: option_title,
          option_detail: option_detail_data,
        };
        if (file.img && file.option_img) {
          if (changed_img.img.length > 0 && changed_img.img.length > 0) {
            const old_img =
              typeof req.body.img === "string" ? [req.body.img] : req.body.img;
            const img = await upload_img_master(file.img);
            newData_pd_master.img = [...img, ...old_img];

            // Option
            const option_img =
              typeof req.body.option_img === "string"
                ? [req.body.option_img]
                : req.body.option_img;
            const old_option_img = option_img.map((res) => {
              return { img: res };
            });
            const option_detailData = await update_pd_option_image(
              file.option_img,
              old_option_img,
              option_detail_data
            );
            newData_pd_option.option_detail = option_detailData;

            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
              del_singer_pd_img(changed_img.option_img);
            } else {
              res.status(400).json(updateProduct_fail);
            }
            // console.log("Delete")
          } else {
            // console.log(req.body)
            // img
            const old_img =
              typeof req.body.img === "string" ? [req.body.img] : req.body.img;
            const img = await upload_img_master(file.img);
            newData_pd_master.img = [...img, ...old_img];

            // Option
            const option_img =
              typeof req.body.option_img === "string"
                ? [req.body.option_img]
                : req.body.option_img;
            const old_option_img = option_img.map((res) => {
              return { img: res };
            });
            const option_detailData = await update_pd_option_image(
              file.option_img,
              old_option_img,
              option_detail_data
            );
            newData_pd_option.option_detail = option_detailData;

            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
              del_singer_pd_img(changed_img.option_img);
              del_singer_pd_img(changed_img.img);
            } else {
              res.status(400).json(updateProduct_fail);
            }
            // console.log("Have option_img and img")
          }
        } else if (file.img) {
          const old_img =
            typeof req.body.img === "string" ? [req.body.img] : req.body.img;
          if (changed_img.img.length > 0) {
            // Add Image and delete in master
            const img = await upload_img_master(file.img);
            newData_pd_master.img = [...img, ...old_img];
            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
              del_singer_pd_img(changed_img.option_img);
            } else {
              res.status(400).json(updateProduct_fail);
            }
          } else {
            // console.log(req.files)
            // console.log(req.body)
            // Add Image in master only
            const img = await upload_img_master(file.img);
            newData_pd_master.img = [...img, ...old_img];
            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
              del_singer_pd_img(changed_img.img);
            } else {
              res.status(400).json(updateProduct_fail);
            }
          }
        } else {
          if (changed_img.option_img.length > 0) {
            // console.log(req.body)
            // const old_image = product.product_master_id.img.filter(val => !changed_img.option_img.includes(val));
            // const delete_img = product.product_master_id.img.filter(val => changed_img.option_img.includes(val));
            const option_img =
              typeof req.body.option_img === "string"
                ? [req.body.option_img]
                : req.body.option_img;
            const old_option_img = option_img.map((res) => {
              return { img: res };
            });
            // console.log(option_detail_data)
            const option_detailData = await update_pd_option_image(
              file.option_img,
              old_option_img,
              option_detail_data
            );
            newData_pd_option.option_detail = option_detailData;

            // console.log(newData_pd_option)
            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
            } else {
              res.status(400).json(updateProduct_fail);
            }
          } else {
            const option_img =
              typeof req.body.option_img === "string"
                ? [req.body.option_img]
                : req.body.option_img;
            const old_option_img = option_img.map((res) => {
              return { img: res };
            });
            // console.log(option_detail_data)
            const option_detailData = await update_pd_option_image(
              file.option_img,
              old_option_img,
              option_detail_data
            );
            newData_pd_option.option_detail = option_detailData;

            // console.log(newData_pd_option)
            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
            } else {
              res.status(400).json(updateProduct_fail);
            }
          }
        }
      } else {
        // console.log(req.body)
        const changed_img = JSON.parse(req.body.changed_img);
        // console.log("Not change")
        const option_detail =
          typeof req.body.option_detail === "string"
            ? [req.body.option_detail]
            : req.body.option_detail;
        // console.log(option_detail)
        const option_title =
          typeof req.body.option_title === "string"
            ? [req.body.option_title]
            : req.body.option_title;
        const op_dt = option_detail.map((res) => {
          return JSON.parse(res);
        });
        // console.log(op_dt)
        const pd_option = op_dt.map((res) => {
          return {
            ...res,
            price:
              typeof res.price === "string"
                ? parseInt(res.price.replace(/\.|,|-|[a-zA-Z]| /g, ""))
                : res.price,
            stock:
              typeof res.stock === "string"
                ? parseInt(res.stock.replace(/\.|,|-|[a-zA-Z]| /g, ""))
                : res.stock,
            img: res.img,
          };
        });

        const newData_pd_master = {
          img: req.body.img,
          name: req.body.name,
          brand: req.body.brand,
          desc: req.body.desc,
          cat_id: req.body.cat_id,
        };
        const newData_pd_option = {
          option_title: option_title,
          option_detail: pd_option,
        };
        if (changed_img) {
          if (changed_img.img.length > 0 && changed_img.option_img.length > 0) {
            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
              del_multi_pd_img(changed_img.img, changed_img.option_img);
            } else {
              res.status(400).json(updateProduct_fail);
            }
          } else if (changed_img.img.length > 0) {
            // console.log("Have img_change")
            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
              del_singer_pd_img(changed_img.img);
            } else {
              res.status(400).json(updateProduct_fail);
            }
          } else {
            // console.log("Have option_change")
            const pd_master = await update_pd_master(
              product.product_master_id._id,
              newData_pd_master
            );
            const pd_option = await update_pd_option(
              product.product_option_id,
              newData_pd_option
            );
            if (pd_master && pd_option) {
              res.status(200).json(updateProduct_Sucess);
              del_singer_pd_img(changed_img.option_img);
            } else {
              res.status(400).json(updateProduct_fail);
            }
          }
        } else {
          const pd_master = await update_pd_master(
            product.product_master_id._id,
            newData_pd_master
          );
          const pd_option = await update_pd_option(
            product.product_option_id,
            newData_pd_option
          );
          if (pd_master && pd_option) {
            res.status(200).json(updateProduct_Sucess);
          } else {
            res.status(400).json(updateProduct_fail);
          }
        }
      }
    } else {
      res.status(400).json(updateProduct_fail);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

async function update_pd_singer_option_image(optionImage, old_image, op_dt) {
  const option_img = optionImage.data ? [optionImage] : optionImage;
  const imgName = await update_pd_option_image(img, option_img);
  let option_detail_result = op_dt.map((item, i) =>
    Object.assign({}, item, imgName.option_img[i])
  );
  const pd_option = option_detail_result.map((res) => {
    return {
      ...res,
      price: parseInt(res.price.replace(/\.|,|-|[a-zA-Z]| /g, "")),
      stock: parseInt(res.stock.replace(/\.|,|-|[a-zA-Z]| /g, "")),
      img: res.img,
    };
  });
  return {
    img: imgName.img,
    pd_option: pd_option,
  };
}

async function update_pd_option_image(optionImage, old_option_img, op_dt) {
  const option_img = optionImage.data ? [optionImage] : optionImage;
  var imgName = await upload_option_img_master(option_img);
  // console.log("imgName1: ", imgName)
  // console.log("op_dt: ", op_dt)
  // const old_option_img_data = typeof old_option_img === "string" ? [old_option_img] : old_option_img
  // const new_option_img_data = typeof imgName === "string" ? [imgName] : imgName
  imgName = [...old_option_img, ...imgName];
  // imgName = [...old_option_img_data, ...new_option_img_data]
  // console.log("imgName2: ", imgName)
  let option_detail_result = op_dt.map((item, i) =>
    Object.assign({}, item, imgName[i])
  );
  // console.log(option_detail_result)
  const pd_option = option_detail_result.map((res) => {
    return {
      ...res,
      price:
        typeof res.price === "string"
          ? parseInt(res.price.replace(/\.|,|-|[a-zA-Z]| /g, ""))
          : res.price,
      stock:
        typeof res.stock === "string"
          ? parseInt(res.stock.replace(/\.|,|-|[a-zA-Z]| /g, ""))
          : res.stock,
      img: res.img,
    };
  });
  // console.log(pd_option)
  return pd_option;
}

// $and: [
//     {
//       res_status_active: "active",
//       res_name: {
//         $regex: req.body.res_name,
//         $options: "i"
//       }
//     }
//   ]

const search_produc = async (req, res) => {
  try {
    const pd_master = await Product_master.find({
      $and: [
        {
          is_active: "active",
          name: {
            $regex: req.body.name,
            $options: "i",
          },
        },
      ],
    }).select("_id");
    const pd_master_array = pd_master.map((data) => {
      return data._id;
    });
    const pd_sell = await ProductSeller.find({
      seller_id: req.body.seller_id,
    }).select("product_master_id");
    const pd_sell_array = pd_sell.map((data) => {
      return data.product_master_id;
    });
    const master = pd_master_array.filter(
      (val) => !pd_sell_array.includes(val)
    );
    const seller = pd_master_array.filter((val) => pd_sell_array.includes(val));
    const test = [...pd_master_array, ...pd_sell_array];

    var names = ["Mike", "Matt", "Nancy", "Adam", "Jenny", "Nancy", "Carl"];

    var uniq = test
      .map((name) => {
        return {
          count: 1,
          name: name,
        };
      })
      .reduce((a, b) => {
        a[b.name] = (a[b.name] || 0) + b.count;
        return a;
      }, {});
    var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
    const product_result = await ProductSeller.find({
      product_master_id: { $in: duplicates },
    })
      .populate({
        path: "product_master_id",
        populate: {
          path: "cat_id",
          select: "name parent_id",
          populate: {
            path: "parent_id",
            select: "name parent_id",
          },
        },
      })
      .populate({
        path: "product_option_id",
      });

    // res
    //   .status(200)
    //   .json({ master: master, seller: seller, seller2: pd_sell_array });
    // res.status(200).json({ master: pd_master_array, seller: pd_sell_array });
    res.status(200).json(product_result);
  } catch (err) {
    console.log(err);
    resizeBy.status(400).json();
  }
};


const get_product_for_set_flash_deal = async (req, res) => {
  try {
    // console.log(req.body.pd_discount.length);
    if (req.body.pd_discount.length > 0) {
      const pd_discount_data = await ProductSeller.find({
        $and: [
          { _id: { $in: req.body.pd_discount } },
          { seller_id: req.body.seller_id },
          { is_active: "active" },
        ],
      }).populate({
        path: "product_master_id",
        populate: {
          path: "cat_id",
          select: "name parent_id",
          populate: {
            path: "parent_id",
            populate: {
              path: "parent_id",
            },
          },
        },
      })
        .populate({
          path: "product_option_id",
        })

      const pd_has_discount = await Flash_deal.find({
        $and: [
          { seller_id: req.body.seller_id },
          { product_seller_id: { $ne: [] } },
          { is_active: "active" },
        ],
      }).select("product_seller_id");
      // console.log(pd_has_discount);

      if (pd_has_discount.length < 0) {
        var result = [];
      } else {
        var result = [];
        pd_has_discount.map((pd) => {
          pd.product_seller_id.map((product_seller_id) => {
            result.push(product_seller_id);
          });
        });
      }
      // console.log(result);
      const product = await ProductSeller.find({
        $and: [
          { is_active: "active" },
          { seller_id: req.body.seller_id },
          { _id: { $nin: result } },
        ],
      }).populate({
        path: "product_master_id",
        populate: {
          path: "cat_id",
          select: "name parent_id",
          populate: {
            path: "parent_id",
            populate: {
              path: "parent_id",
            },
          },
        },
      })
        .populate({
          path: "product_option_id",
        })

      // res.status(200).json({
      //   product_discount: pd_discount_data,
      //   product: product,
      // });
      res.status(200).json([...pd_discount_data, ...product]);
    } else {
      const pd_has_discount = await Flash_deal.find({
        $and: [
          { seller_id: req.body.seller_id },
          { product_seller_id: { $ne: [] } },
          { is_active: "active" },
        ],
      }).select("product_seller_id");
      // console.log(pd_has_discount)

      if (pd_has_discount.length < 0) {
        var result = [];
      } else {
        var result = [];
        pd_has_discount.map((pd) => {
          pd.product_seller_id.map((product_seller_id) => {
            result.push(product_seller_id);
          });
        });
      }

      // console.log(result);
      const product = await ProductSeller.find({
        $and: [
          { is_active: "active" },
          { seller_id: req.body.seller_id },
          { _id: { $nin: result } },
        ],
      }).populate({
        path: "product_master_id",
        populate: {
          path: "cat_id",
          select: "name parent_id",
          populate: {
            path: "parent_id",
            populate: {
              path: "parent_id",
            },
          },
        },
      })
        .populate({
          path: "product_option_id",
        })
      res.status(200).json(product);
      // res.status(200).json({
      //   product_discount: [],
      //   product: product,
      // });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
};

export {
  addProductSeller,
  get_all_product_by_sell_id,
  delete_product,
  get_product_by_pd_sell_id,
  edit_pd_by_pd_seller_id_no_option,
  edit_pd_by_pd_seller_id_has_option,
  search_produc,
  get_product_for_set_flash_deal
};
