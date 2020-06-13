import Token from "./../models/Token";

// Save Token
const addtoken = async (req, res) => {
  try {
    const token = await Token.findOne({ $and: [{ user_id: req.body.user_id }, { IMEI_UUID: req.body.IMEI_UUID }, { platform: req.body.platform }] })
    if (token) {
      Token.updateOne({ _id: token._id }, { $set: { token: req.body.token } })
        .then(success => {
          if (success.n > 0) {
            res.status(200).json("Save data successfully");
          } else {
            res.status(400).json();
          }
        })
        .catch(err => {
          console.log(err);
          res.status(400).json();
        });
    } else {
      const newData = new Token({
        token: req.body.token,
        user_id: req.body.user_id,
        user_type: req.body.user_type,
        IMEI_UUID: req.body.IMEI_UUID,
        platform: req.body.platform
      });
      newData
        .save()
        .then(success => {
          res.status(200).json("Save data successfully");
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

const get_all_by_user_type = (req, res) => {
  try {
    Token.find({
      $and: [{ user_type: req.params.user_type }, { is_active: "active" }]
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

const delete_token = (req, res) => {
  try {
    Token.deleteOne()
      .then(success => {
        if (success.n > 0) {
          res.status(200).json(success);
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

export { addtoken, get_all_by_user_type, delete_token };
