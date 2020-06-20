import Res from "./response_controller";

const sellerModel = require("../models/seller");

const crypto = require("crypto-js");

// get all sellers
exports.getSellerList = async (req, res) => {
  const response = Res(res);
  try {
    const sellers = await sellerModel.find().populate(["category_id"]);
    if (sellers.length > 0) {
      response.success({ data: sellers });
    } else {
      response.success({ data: sellers, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// get seller by ID
exports.findSellerByID = async (req, res) => {
  const response = Res(res);
  const sellerID = req.params.sellerID;
  try {
    const sellers = await sellerModel
      .findById(sellerID)
      .populate("category_id");
    if (sellers) {
      response.success({ data: sellers });
    } else {
      response.success({ data: sellers, msg: "no data found" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
// create new  seller
exports.createSeller = async (req, res) => {
  const response = Res(res);
  const SECRET_KEY_PASS = process.env.SECRET_KEY_PASS;
  const sellerData = req.body;
  const encriptedPass = crypto.AES.encrypt(
    JSON.stringify(req.body.pass),
    SECRET_KEY_PASS
  );
  req.body.pass = encriptedPass;
  try {
    const newSeller = new sellerModel(sellerData);
    const savedSeller = await newSeller.save();
    if (savedSeller) {
      response.created({
        data: savedSeller,
        msg: "create seller successfully",
      });
    } else {
      response.success({ data: sellers, msg: "create seller failed" });
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// disable  seller
exports.disableSeller = async (req, res) => {
  const response = Res(res);
  const sellerID = req.params.sellerID;
  try {
    const foundSeller = await sellerModel.findById(sellerID);
    if (!foundSeller) {
      response.notFound({ data: sellers, msg: "seller not found" });
    }
    foundSeller.is_active = "inActive";
    if (await foundSeller.save()) {
      response.success({ data: foundSeller, msg: "disable seller success" });
    } else {
      response.somethingWrong({});
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

// edit  seller
exports.updateSeller = async (req, res) => {
  const response = Res(res);
  const sellerID = req.params.sellerID;
  const sellerData = req.body;
  try {
    let foundSeller = await sellerModel.findById(sellerID);
    if (!foundSeller) {
      response.notFound({ data: sellers, msg: "seller not found" });
    }
    foundSeller.set(sellerData);
    if (await foundSeller.save()) {
      response.success({
        data: foundSeller,
        msg: "update seller successfully",
      });
    } else {
      response.somethingWrong({});
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};

//   seller login
exports.sellerLogin = async (req, res) => {
  console.log("working...");

  const response = Res(res);
  const SECRET_KEY_PASS = process.env.SECRET_KEY_PASS;
  const SECRET_KEY = process.env.SECRET_KEY;
  const sellerPass = req.body.pass;
  const sellerName = req.body.user_name;
  try {
    let foundSeller = await sellerModel.findOne({ user_name: sellerName });
    console.log(foundSeller);

    if (!foundSeller) {
      response.notFound({ data: foundSeller, msg: "seller not found" });
    }
    let passDecript = crypto.AES.decrypt(
      foundSeller.pass.toString(),
      SECRET_KEY_PASS
    );

    let decryptPass = passDecript.toString(crypto.enc.Utf8);
    if (decryptPass) {
      decryptPass = decryptPass.replace(/"/g, "");
      if (sellerPass === decryptPass) {
        const JWTpayload = {
          id: foundSeller._id,
        };
        // Create JWT Payload
        const token = sign(JWTpayload, SECRET_KEY, {
          expiresIn: 600,
        });
        const data = {
          success: true,
          token: "Bearer " + token,
        };
        response.success({ data: data });
      } else {
        throw new Error();
      }
    }
  } catch (ex) {
    response.somethingWrong({ error: ex });
  }
};
