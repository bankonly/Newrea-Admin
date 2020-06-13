import Product_item from "./../models/Product_item";
import ProductSeller from "./../models/ProductSeller";
// complete
const report_order_complete = (req, res) => {
  try {
    // console.log(req.body);
    const ord_start_date = req.body.start_date;
    const start_date = ord_start_date.slice(0, ord_start_date.lastIndexOf("T"));
    const startDate = start_date + "T00:00:00.000Z";
    const ord_end_date = req.body.end_date;
    const end_date = ord_end_date.slice(0, ord_end_date.lastIndexOf("T"));
    const endDate = end_date + "T23:59:59.000Z";
    Product_item.find({
      $and: [
        {
          created_date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate),
          },
        },
        {
          items: {
            $elemMatch: {
              $and: [
                { seller_id: req.body.seller_id },
                { order_status_id: "5e47955f155e132ea0625ca8" },
              ],
            },
          },
        },
      ],
    })
      .then((success) => {
        if (success.length > 0) {
          let resoult = [];
          success.map((data) => {
            data.items.map((data_item) => {
              if (
                data_item.seller_id == req.body.seller_id &&
                data_item.order_status_id == "5e47955f155e132ea0625ca8"
              ) {
                resoult.push({
                  _id: data._id,
                  total_price: data.order_id.total_price,
                  seller_id: data_item.seller_id,
                  distance: data_item.distance,
                  total_delivery: data_item.total_delivery,
                  total_price: data_item.total_price,
                  edit_id: data_item.edit_id,
                  order_status: data_item.order_status_id,
                  created_date: data.created_date,
                });
              } else {
              }
            });
          });
          res.status(200).json(resoult);
          //   res.status(200).json(success);
        } else {
          res.status(204).json();
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

const top_five_product_sold = (req, res) => {
  try {
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
            select: "name parent_id",
          },
        },
      })
      .populate({
        path: "product_option_id",
      })
      .limit(5)
      .then((success) => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(204).json();
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

// Report
const reports = async (req, res) => {
  try {
    const visitors = 0;
    const buyer = await Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: req.params.seller_id },
            { order_status_id: "5e47955f155e132ea0625ca8" },
          ],
        },
      },
    }).count();
    const conversion_rate = 0;
    const pageviews = 0;
    const new_order = await Product_item.find({
      items: {
        $elemMatch: {
          $and: [
            { seller_id: req.params.seller_id },
            { order_status_id: "5e47955f155e132ea0625ca5" },
          ],
        },
      },
    }).count();
    const avg_per_order = 0;

    // console.log(buyer);
    // console.log(new_order);
    res.status(200).json({
      visitors: visitors,
      buyer: buyer,
      conversion_rate: conversion_rate,
      pageviews: pageviews,
      new_order: new_order,
      avg_per_order: avg_per_order,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
};

export { report_order_complete, top_five_product_sold, reports };
