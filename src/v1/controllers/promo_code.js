import PromoCode from "./../models/PromoCode";
import { secretPromoKey } from "./../configs/setup";
import crypto from "crypto-js";

// Validation
import validate_add_promo_code from "./../validations/add_promo_code";
const add_promo_code = (req, res) => {
  try {
    // console.log(req.body)
    const { errors, isValid } = validate_add_promo_code(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const percentData = req.body.percent === undefined ? 0 : req.body.percent;
      const priceData = req.body.price === undefined ? 0 : req.body.price;
      const percent =
        typeof percentData === "string"
          ? parseInt(req.body.percent.replace(/[a-zA-Z]|\.|,|-| |/g, ""))
          : percentData;
      const price =
        typeof priceData === "string"
          ? parseInt(req.body.price.replace(/[a-zA-Z]|\.|,|-| |/g, ""))
          : priceData;
      const code = req.body.code;
      const encript_code = crypto.AES.encrypt(
        JSON.stringify(code),
        secretPromoKey
      );
      const newData = new PromoCode({
        seller_id: req.body.seller_id,
        name: req.body.name,
        code: encript_code,
        percent: percent,
        price: price,
        end_date: req.body.end_date,
        start_date: req.body.start_date,
        type: req.body.type,
        limited: req.body.limited,
        product: req.body.product,
      });
      newData
        .save()
        .then((success) => {
          res.status(201).json("Add data successfully");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).end();
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// get_all_promo_code
const get_all_promo_code_by_sell_id = (req, res) => {
  try {
    PromoCode.find({
      $and: [{ seller_id: req.params.seller_id }, { is_active: "active" }],
    })
      .then((success) => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(204).json();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).end();
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// get_all_promo_code_discount
const get_all_promo_code_discount_by_sell_id = (req, res) => {
  try {
    PromoCode.find({
      $and: [
        { seller_id: req.params.seller_id },
        { type: "discount" },
        { is_active: "active" },
      ],
    })
      .then((success) => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(204).json();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).end();
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
// get_all_promo_code
const get_all_promo_code_sku_by_sell_id = (req, res) => {
  try {
    PromoCode.find({
      $and: [
        { seller_id: req.params.seller_id },
        { type: "sku" },
        { is_active: "active" },
      ],
    })
      .then((success) => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(204).json();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).end();
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// delete promocode
const delete_promo_code_by_id = (req, res) => {
  try {
    PromoCode.updateOne(
      { _id: req.params.promo_id },
      { $set: { is_active: "inactive" } }
    )
      .then((success) => {
        if (success.n > 0) {
          res.status(200).json("Deleted");
        } else {
          res.status(400).json();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).end();
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

const edit_promo_code = (req, res) => {
  try {
    const { errors, isValid } = validate_add_promo_code(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const percentData = req.body.percent === undefined ? 0 : req.body.percent;
      const priceData = req.body.price === undefined ? 0 : req.body.price;
      const percent =
        typeof percentData === "string"
          ? parseInt(req.body.percent.replace(/[a-zA-Z]|\.|,|-| |/g, ""))
          : percentData;
      const price =
        typeof priceData === "string"
          ? parseInt(req.body.price.replace(/[a-zA-Z]|\.|,|-| |/g, ""))
          : priceData;
      const pd_id = req.body.product === undefined ? [] : req.body.product;
      const code = req.body.code;
      const encript_code = crypto.AES.encrypt(
        JSON.stringify(code),
        secretPromoKey
      );
      const data = {
        seller_id: req.body.seller_id,
        name: req.body.name,
        code: encript_code.toString(),
        percent: percent,
        price: price,
        end_date: req.body.end_date,
        start_date: req.body.start_date,
        type: req.body.type,
        limited: req.body.limited,
        product: pd_id,
      };
      PromoCode.updateOne({ _id: req.body.promo_id }, { $set: data })
        .then((success) => {
          if (success.n) {
            res.status(200).json("Edit data successfully");
          } else {
            res.status(400).end();
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).end();
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export {
  add_promo_code,
  get_all_promo_code_by_sell_id,
  get_all_promo_code_discount_by_sell_id,
  get_all_promo_code_sku_by_sell_id,
  delete_promo_code_by_id,
  edit_promo_code,
};
