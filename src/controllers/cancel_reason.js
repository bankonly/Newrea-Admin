import Cancel_reason from "./../models/Cancel_reason";

const get_all_cancel_reason = (req, res) => {
  try {
    Cancel_reason.find({
      $and: [{ is_active: "active" }, { cancel_by: "seller" }]
    })
      .then(success => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(400).end();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).end();
      });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

export { get_all_cancel_reason };
