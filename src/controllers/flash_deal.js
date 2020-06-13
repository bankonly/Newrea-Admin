import Flash_deal from "./../models/Flash_deal";
import ProductSeller from "./../models/ProductSeller";

// Validation
import validate_add_flash_deal from "./../validations/add_flash_deal";
// import validate_edit_wallet from './../validations/edit_wallet'
const add_flash_deal = async (req, res) => {
  try {
    const { errors, isValid } = validate_add_flash_deal(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const pd_id =
        typeof req.body.product_seller_id === "string"
          ? [req.body.product_seller_id]
          : req.body.product_seller_id;
      // const result = []
      // console.log("price:  ", req.body.price)
      // console.log("price:  ", typeof req.body.price)
      const percentData = req.body.percent === undefined ? 0 : req.body.percent;
      // const priceData = req.body.price === undefined ? 0 : req.body.price
      const percent =
        typeof percentData === "string"
          ? parseInt(req.body.percent.replace(/[a-zA-Z]|\.|,|-| |/g, ""))
          : percentData;
      // const price =
      //     typeof priceData === "string"
      //         ? parseInt(req.body.price.replace(/[a-zA-Z]|\.|,|-| |/g, ""))
      //         : priceData;
      // pd_id.map(res => {
      //     result.push(new Flash_deal({
      //         product_seller_id: res,
      //         seller_id: req.body.seller_id,
      //         percent: percent,
      //         price: price,
      //         start_date: req.body.start_date,
      //         end_date: req.body.end_date,
      //         created_date: Date.now()
      //     }))
      // })

      const newData = new Flash_deal({
        product_seller_id: pd_id,
        seller_id: req.body.seller_id,
        percent: percent,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        created_date: Date.now()
      });
      // console.log(newData)
      newData
        .save()
        .then(success => {
          res.status(201).json("Add data successfully");
        })
        .catch(err => {
          console.log(err);
          res.status(400).json();
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

// Get All flash deal by seller Id
const get_flash_deal_by_seller_id = (req, res) => {
  try {
    Flash_deal.find({
      $and: [{ seller_id: req.params.seller_id }, { is_active: "active" }]
    })
      // .populate({
      //     path: "product_seller_id",
      //     // select: "name img"
      // })
      .then(success => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json();
      });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

// delete_flash_deal_by_id
const delete_flash_deal_by_id = (req, res) => {
  try {
    Flash_deal.updateOne(
      { _id: req.params.id },
      { $set: { is_active: "inactive" } }
    )
      .then(success => {
        if (success.n > 0) {
          res.status(200).json("Delete Data Successfully");
        } else {
          res.status(400).json();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json();
      });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

// edit flash deal by Id
const edit_flash_deal_by_id = (req, res) => {
  try {
    // console.log(req.body)
    const pd_id =
      typeof req.body.product_seller_id === "string"
        ? [req.body.product_seller_id]
        : req.body.product_seller_id;
    const percentData = req.body.percent === undefined ? 0 : req.body.percent;
    const percent =
      typeof percentData === "string"
        ? parseInt(req.body.percent.replace(/[a-zA-Z]|\.|,|-| |/g, ""))
        : percentData;
    const data = {
      product_seller_id: pd_id,
      percent: percent,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    };
    Flash_deal.updateOne({ _id: req.body.flash_deal_id }, { $set: data })
      .then(success => {
        if (success.n > 0) {
          res.status(200).json("Update Successfully");
        } else {
          res.status(400).json();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json();
      });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

const get_product_by_pd_id_array = (req, res) => {
  try {
    const pd_id =
      typeof req.body.product_seller_id === "string"
        ? [req.body.product_seller_id]
        : req.body.product_seller_id;
    ProductSeller.find({ _id: { $in: pd_id } })
      .populate({
        path: "product_master_id product_option_id"
      })
      .then(success => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json();
      });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};


// get_product_flash_deal_by_seller_id
const get_product_flash_deal_by_seller_id = (req, res) => {
  try {
    Flash_deal.find({
      $and: [{ seller_id: req.params.seller_id }, { is_active: "active" }]
    })
      .populate({
        path: "product_seller_id",
        populate: {
          path: "product_master_id product_option_id",
        }
        // select: "name img"
      })
      .then(success => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).json();
      });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

export {
  add_flash_deal,
  get_flash_deal_by_seller_id,
  delete_flash_deal_by_id,
  edit_flash_deal_by_id,
  get_product_by_pd_id_array,
  get_product_flash_deal_by_seller_id
};
