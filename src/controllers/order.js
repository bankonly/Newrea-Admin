// import Order from "./../models/Order"
import Product_item from "./../models/Product_item";
// import Pickup_from_seller from './../models/Pickup_from_seller'

// get new Order
const get_all_new_order_by_sellerId = (req, res) => {
  try {
    // console.log(req.params.seller_id)
    Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: req.params.seller_id },
            { order_status_id: "5e47955f155e132ea0625ca5" }
          ]
        }
      }
    })
      .populate({
        path: "order_id",
        select: "order_number created_date total_price",
        populate: {
          path: "cus_id",
          select: "name"
        }
      })
      // .select("_id")
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (
                data_item.seller_id == req.params.seller_id &&
                data_item.order_status_id == "5e47955f155e132ea0625ca5"
              ) {
                resoult.push({
                  _id: data._id,
                  // order_id: data.order_id,
                  order_number: data.order_id.order_number,
                  name: data.order_id.cus_id.name,
                  total_price: data.order_id.total_price,
                  seller_id: data_item.seller_id,
                  order_status: data_item.order_status_id,
                  created_date: data.order_id.created_date
                });
              } else {
              }
            });
          });
          res.status(200).json(resoult);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// get packing Order
const get_all_packing_order_by_sellerId = (req, res) => {
  try {
    // console.log(req.params.seller_id)
    Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: req.params.seller_id },
            { order_status_id: "5e47955f155e132ea0625ca0" }
          ]
        }
      }
    })
      .populate({
        path: "order_id",
        select: "order_number created_date total_price",
        populate: {
          path: "cus_id",
          select: "name"
        }
      })
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (
                data_item.seller_id == req.params.seller_id &&
                data_item.order_status_id == "5e47955f155e132ea0625ca0"
              ) {
                resoult.push({
                  _id: data._id,
                  // order_id: data.order_id,
                  order_number: data.order_id.order_number,
                  name: data.order_id.cus_id.name,
                  total_price: data.order_id.total_price,
                  seller_id: data_item.seller_id,
                  order_status: data_item.order_status_id,
                  created_date: data.order_id.created_date
                });
              } else {
              }
            });
          });
          res.status(200).json(resoult);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
// const get_all_packing_order_by_sellerId = (req, res) => {
//     try {
//         // console.log(req.params.seller_id)
//         Product_item.find({ items: { $elemMatch: { $and: [{ seller_id: req.params.seller_id }, { order_status_id: "5e47955f155e132ea0625ca0" }] } } })
//             .populate({
//                 path: "order_id",
//                 populate: {
//                     path: "cus_id",
//                     select: "-password"
//                 }
//             })
//             .then(success => {
//                 // console.log(success)
//                 if (success.length > 0) {
//                     let resoult = []
//                     success.map(data => {
//                         data.items.map(data_item => {
//                             if (data_item.seller_id == req.params.seller_id && data_item.order_status_id == "5e47955f155e132ea0625ca0") {
//                                 resoult.push({
//                                     _id: data._id,
//                                     order_id: data.order_id,
//                                     seller_id: data_item.seller_id,
//                                     option: data_item.option,
//                                     order_status: data_item.order_status_id
//                                 })
//                             } else {

//                             }
//                         })
//                     })
//                     res.status(200).json(resoult)
//                 } else {
//                     res.status(204).json()
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     } catch (err) {
//         console.log(err);
//         res.status(400).end()
//     }
// }

// get realdy to pickup Order
const get_all_realdy_to_pickup_order_by_sellerId = (req, res) => {
  try {
    // console.log(req.params.seller_id)
    Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: req.params.seller_id },
            { order_status_id: "5e47955f155e132ea0625ca1" }
          ]
        }
      }
    })
      .populate({
        path: "order_id",
        select: "order_number created_date total_price",
        populate: {
          path: "cus_id",
          select: "name"
        }
      })
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (
                data_item.seller_id == req.params.seller_id &&
                data_item.order_status_id == "5e47955f155e132ea0625ca1"
              ) {
                resoult.push({
                  _id: data._id,
                  // order_id: data.order_id,
                  order_number: data.order_id.order_number,
                  name: data.order_id.cus_id.name,
                  total_price: data.order_id.total_price,
                  seller_id: data_item.seller_id,
                  order_status: data_item.order_status_id,
                  created_date: data.order_id.created_date
                });
              } else {
              }
            });
          });
          res.status(200).json(resoult);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// get complete Order
const get_all_complete_order_by_sellerId = (req, res) => {
  try {
    // console.log(req.params.seller_id)
    Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: req.params.seller_id },
            { order_status_id: "5e47955f155e132ea0625ca8" }
          ]
        }
      }
    })
      .populate({
        path: "order_id",
        select: "order_number created_date total_price",
        populate: {
          path: "cus_id",
          select: "name"
        }
      })
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (
                data_item.seller_id == req.params.seller_id &&
                data_item.order_status_id == "5e47955f155e132ea0625ca8"
              ) {
                resoult.push({
                  _id: data._id,
                  // order_id: data.order_id,
                  order_number: data.order_id.order_number,
                  name: data.order_id.cus_id.name,
                  total_price: data.order_id.total_price,
                  seller_id: data_item.seller_id,
                  order_status: data_item.order_status_id,
                  created_date: data.order_id.created_date
                });
              } else {
              }
            });
          });
          res.status(200).json(resoult);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// update_packing_order_by_sellerId
const update_packing_order_by_sellerId = (req, res) => {
  try {
    const option =
      typeof req.body.option === "string" ? [req.body.option] : req.body.option;
    const options = option.map(res => {
      return JSON.parse(res);
    });
    // console.log(req.body);
    Product_item.updateOne(
      { _id: req.body.product_item_id, "items.seller_id": req.body.seller_id },
      {
        $set: {
          "items.$.order_status_id": "5e47955f155e132ea0625ca0",
          "items.$.option": options
        }
      }
    )
      .then(success => {
        if (success.n > 0) {
          res.status(200).json("Update data Successfully");
        } else {
          res.status(400).json("update Failure");
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// update_realdy_to_pickup_order_by_sellerId
const update_realdy_to_pickup_order_by_sellerId = (req, res) => {
  try {
    Product_item.updateOne(
      { _id: req.body.product_item_id, "items.seller_id": req.body.seller_id },
      { $set: { "items.$.order_status_id": "5e47955f155e132ea0625ca1" } }
    )
      .then(success => {
        if (success.n > 0) {
          res.status(200).json("Update data Successfully");
        } else {
          res.status(400).json("update Failure");
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

// update_cancel_to_pickup_order_by_sellerId
const update_cancle_order_by_sellerId = (req, res) => {
  try {
    Product_item.updateOne(
      { _id: req.body.product_item_id, "items.seller_id": req.body.seller_id },
      { $set: { "items.$.order_status_id": "5e47955f155e132ea0625ca2" } }
    )
      .then(success => {
        if (success.n > 0) {
          res.status(200).json("Update data Successfully");
        } else {
          res.status(400).json("update Failure");
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

const get_order_by_seller_and_order_id = (req, res) => {
  try {
    // console.log(req.params.seller_id)
    Product_item.find({
      $and: [
        { items: { $elemMatch: { seller_id: req.body.seller_id } } },
        { _id: req.body.order_id }
      ]
    })
      .populate({
        path: "order_id",
        populate: {
          path: "cus_id",
          select: "-password"
        }
      })
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (data_item.seller_id == req.body.seller_id) {
                resoult.push({
                  _id: data._id,
                  order_id: data.order_id,
                  seller_id: data_item.seller_id,
                  option: data_item.option,
                  order_status: data_item.order_status_id
                });
              } else {
              }
            });
          });
          res.status(200).json(resoult);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

const get_count_order_ready_packing_coplete = async (req, res) => {
  try {
    const ready = await order_ready(req.params.seller_id);
    const packing = await order_packing(req.params.seller_id);
    const complete = await order_complete(req.params.seller_id);

    res.status(200).json({
      ready: ready,
      packing: packing,
      complete: complete
    });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
// order_ready
async function order_ready(seller_id) {
  try {
    return Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: seller_id },
            { order_status_id: "5e47955f155e132ea0625ca1" }
          ]
        }
      }
    })
      .populate({
        path: "order_id",
        select: "order_number created_date total_price",
        populate: {
          path: "cus_id",
          select: "name"
        }
      })
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (
                data_item.seller_id == seller_id &&
                data_item.order_status_id == "5e47955f155e132ea0625ca1"
              ) {
                resoult.push({
                  order_status: data_item.order_status_id
                });
              } else {
              }
            });
          });
          return resoult.length;
        } else {
          return 0;
        }
      })
      .catch(err => {
        console.log(err);
        return 0;
      });
  } catch (err) {
    console.log(err);
    return 0;
  }
}
// packing
async function order_packing(seller_id) {
  try {
    return Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: seller_id },
            { order_status_id: "5e47955f155e132ea0625ca0" }
          ]
        }
      }
    })
      .populate({
        path: "order_id",
        select: "order_number created_date total_price",
        populate: {
          path: "cus_id",
          select: "name"
        }
      })
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (
                data_item.seller_id == seller_id &&
                data_item.order_status_id == "5e47955f155e132ea0625ca0"
              ) {
                resoult.push({
                  order_status: data_item.order_status_id
                });
              } else {
              }
            });
          });
          return resoult.length;
        } else {
          return 0;
        }
      })
      .catch(err => {
        console.log(err);
        return 0;
      });
  } catch (err) {
    console.log(err);
    return 0;
  }
}
// complete
async function order_complete(seller_id) {
  try {
    return Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: seller_id },
            { order_status_id: "5e47955f155e132ea0625ca8" }
          ]
        }
      }
    })
      .populate({
        path: "order_id",
        select: "order_number created_date total_price",
        populate: {
          path: "cus_id",
          select: "name"
        }
      })
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (
                data_item.seller_id == seller_id &&
                data_item.order_status_id == "5e47955f155e132ea0625ca8"
              ) {
                resoult.push({
                  order_status: data_item.order_status_id
                });
              } else {
              }
            });
          });
          return resoult.length;
        } else {
          return 0;
        }
      })
      .catch(err => {
        console.log(err);
        return 0;
      });
  } catch (err) {
    console.log(err);
    return 0;
  }
}

const history_complete_cancel = (req, res) => {
  try {
    Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: req.params.seller_id },
            {
              $or: [
                { order_status_id: "5e47955f155e132ea0625ca8" },
                { order_status_id: "5e47955f155e132ea0625ca2" }
              ]
            }
          ]
        }
      }
    })
      .populate({
        path: "order_id items.order_status_id",
        select: "order_number created_date total_price name",
        populate: {
          path: "cus_id",
          select: "name"
        }
      })
      .then(success => {
        // console.log(success)
        if (success.length > 0) {
          let resoult = [];
          success.map(data => {
            data.items.map(data_item => {
              if (
                (data_item.seller_id == req.params.seller_id &&
                  data_item.order_status_id._id == "5e47955f155e132ea0625ca8") ||
                data_item.order_status_id._id == "5e47955f155e132ea0625ca2"
              ) {
                resoult.push({
                  _id: data._id,
                  // order_id: data.order_id,
                  order_number: data.order_id.order_number,
                  name: data.order_id.cus_id.name,
                  total_price: data.order_id.total_price,
                  seller_id: data_item.seller_id,
                  order_status: data_item.order_status_id,
                  created_date: data.order_id.created_date
                });
              } else {
              }
            });
          });
          res.status(200).json(resoult);
        } else {
          res.status(204).json();
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};


const get_order_detail = (req, res) => {
  try {
    Product_item.findById(req.body.product_item_id)
      .populate({
        path: "order_id items.order_status_id",
        populate: {
          path: "cus_id",
          select: "-password"
        }
      })
      .then(success => {
        const result = []
        success.items.map(data_item => {
          if (data_item.seller_id == req.body.seller_id) {
            result.push({
              _id: success._id,
              customer: success.order_id.cus_id,
              items: data_item,
              created_date: success.created_date
            })
          }
        });
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json();
      });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
}

export {
  get_all_new_order_by_sellerId,
  get_all_packing_order_by_sellerId,
  get_all_realdy_to_pickup_order_by_sellerId,
  get_all_complete_order_by_sellerId,
  update_packing_order_by_sellerId,
  update_realdy_to_pickup_order_by_sellerId,
  update_cancle_order_by_sellerId,
  get_order_by_seller_and_order_id,
  get_count_order_ready_packing_coplete,
  history_complete_cancel,
  get_order_detail
};
