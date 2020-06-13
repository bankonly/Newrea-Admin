import express from "express";
import { connect } from "mongoose";
import { urlencoded, json } from "body-parser";
import fileupload from "express-fileupload";
import passport from "passport";
// import tunnel from "tunnel-ssh";
// import mongoose from "mongoose";

const app = express();

// Body parser middleware
app.use(urlencoded({ extended: false }));
app.use(json());

// File Middleware
app.use(fileupload());

// DB Config
import { mongoURI as db } from "../configs/setup";

// // Connect to MongoDB
connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// const config = {
//   username: "root",
//   password: "C0n%2019",
//   host: "134.209.107.223",
//   port: 22,
//   dstPort: 12323,
// };

// tunnel(config, function (error, server) {
//   if (error) {
//     console.log("SSH connection error: " + error);
//   }

//   mongoose
//     .connect(db, {
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log(err));
//   let dbs = mongoose.connection;

//   dbs.on("error", console.error.bind(console, "DB connection error:"));
//   dbs.once("open", function () {
//     // we're connected!
//     // console.log("DB connection successful");
//     // console.log(server);
//   });
//   //   .then(() => console.log('DB connection successful'))
//   //   .catch((error) => console.error.bind(console, 'DB connection error:'));
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./../configs/passport").default(passport);

//Route Image
app.use(
  "/img/seller_img/logo",
  express.static(__dirname + "./../../../img/seller_img/logo")
);
app.use(
  "/img/seller_img/logo/128x128",
  express.static(__dirname + "./../../../img/seller_img/logo/128x128")
);
app.use(
  "/img/seller_img/profile",
  express.static(__dirname + "./../../../img/seller_img/profile")
);
app.use(
  "/img/seller_img/profile/512x512",
  express.static(__dirname + "./../../../img/seller_img/profile/512x512")
);

app.use("/img/pd_img", express.static(__dirname + "./../../../img/pd_img"));
app.use(
  "/img/pd_img_256x256",
  express.static(__dirname + "./../../../img/pd_img/resize/256x256")
);

app.use(
  "/img/shop_feed",
  express.static(__dirname + "./../../../img/shop_feed")
);
app.use("/img/bank", express.static(__dirname + "./../../../img/bank"));

// Customer
app.use("/img/customer", express.static(__dirname + "./../../../img/cus_profile"));

// Noti
app.use("/img/noti", express.static(__dirname + "./../../../img/noti/256x256"));

// Path Route
import sellerRoute from "./../routes/api/seller";
import product from "./../routes/api/product";
import seller_typeRoute from "../routes/api/seller_type";
import category from "../routes/api/category";
import product_master from "../routes/api/product_master";
import product_seller from "../routes/api/product_seller";
import delivery_fee_option from "../routes/api/delivery_fee_option";
import shop_feed from "../routes/api/shop_feed";
import bank from "../routes/api/bank";
import wallet from "../routes/api/wallet";
import notification from "../routes/api/notification";
import flash_deal from "../routes/api/flash_deal";
import order from "../routes/api/order";
import promo_code from "../routes/api/promo_code";
import cancel_reason from "../routes/api/cancel_reason";
import token from "../routes/api/token";
import report from "../routes/api/report";
import history_wallet from "../routes/api/history_wallet";
import like_feed from './../routes/api/like_feed'
import comment_feed from './../routes/api/comment_feed'
import popular_product from './../routes/api/popular_product'
import follower_like_comment from './../routes/api/follower_like_comment'
import change_password from './../routes/api/change_password'

import Order from "../models/Order";
import Order_Status from "../models/Order_Status";
import Customer from "../models/Customer";
import Bank_type from "../models/Bank_type";
//Path
const DPPath = "/d_p/v1";
// Use Routes
app.use(
  DPPath,
  sellerRoute,
  product,
  seller_typeRoute,
  category,
  product_master,
  product_seller,
  delivery_fee_option,
  shop_feed,
  bank,
  wallet,
  notification,
  flash_deal,
  order,
  promo_code,
  cancel_reason,
  token,
  report,
  history_wallet,
  like_feed,
  comment_feed,
  popular_product,
  follower_like_comment,
  change_password
);

app.use((req, res, next) => {
  const error = new Error("Not found API");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use(Bank_type, Order, Order_Status, Customer);

export default app;
