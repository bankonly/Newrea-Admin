import History_wallet from "./../models/History_wallet";

const get_all_history_wallet = (req, res) => {
  try {
    // console.log(req.params.seller_id);
    History_wallet.find({
      $and: [{ is_active: "active" }, { seller_id: req.params.seller_id }],
    })
      .then((success) => {
        if (success.length > 0) {
          res.status(200).json(success);
        } else {
          res.status(204).json();
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json();
      });
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
};

export { get_all_history_wallet };
