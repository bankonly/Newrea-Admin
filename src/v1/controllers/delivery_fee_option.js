import Delivery_fee_option from "./../models/Delivery_fee_option";
import Seller from "./../models/Seller";

const add_delivery_free = (req, res) => {
  const newData = new Delivery_fee_option({
    name: req.body.name,
    percen: req.body.percen,
  });
  newData
    .save()
    .then((sucess) => {
      res.status(201).json("Add Data Sucessfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json();
    });
};

const get_delivery_fee_option = (req, res) => {
  try {
    Delivery_fee_option.find()
      .then((sucess) => {
        if (sucess.length > 0) {
          res.status(200).json(sucess);
        } else {
          console.log(err);
          res.status(400).json();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json();
      });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

//
const add_delivery_free_seller = (req, res) => {
  try {
    Seller.updateOne(
      { _id: req.body.seller_id },
      { $set: { delivery_fee_option_id: req.body.delivery_fee_option_id } }
    )
      .then((sucess) => {
        if (sucess.n > 0) {
          res.status(200).json("Update delivery fee successfully.");
        } else {
          console.log(err);
          res.status(400).json();
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json();
      });
  } catch (e) {
    console.log(err);
    res.status(400).json();
  }
};

export { add_delivery_free, get_delivery_fee_option, add_delivery_free_seller };
