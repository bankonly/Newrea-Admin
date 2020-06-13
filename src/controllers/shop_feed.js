import Shop_feed from "./../models/Shop_feed";
import Comment_feed from "./../models/Comment_feed";
import Like_feed from "./../models/Like_feed";

import { upload_product_image } from "./../uploadImage/upload_image";
import { delete_img } from "./../deleteImage/delete_image";

const add_shop_feed = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files.img).length === 0) {
      res.status(400).json({
        img: "Image not found",
      });
    } else {
      const img_files = [req.files.img];
      const path_img = "./../img/shop_feed/";
      const path_img_resize = false;
      const img = await upload_product_image(
        img_files,
        path_img,
        path_img_resize
      );
      if (img.length > 0) {
        const newData = new Shop_feed({
          seller_id: req.body.seller_id,
          cat_id: req.body.cat_id,
          desc: req.body.desc,
          img: img[0],
        });
        newData
          .save()
          .then((success) => {
            res.status(201).json("add Feed successfully");
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json();
          });
      } else {
        res.status(400).json();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

// Get All feed by seller Id
const get_all_feed_by_seller_id = (req, res) => {
  try {
    Shop_feed.find({
      $and: [{ seller_id: req.params.seller_id }, { is_active: "active" }],
    })
      .populate({
        path: "seller_id cat_id",
        select: "name img",
      })
      .then(async (success) => {
        if (success.length > 0) {
          const result = []
          await Promise.all(success.map(async feed => {
            // console.log(feed)
            const comment = await Comment_feed.find({ shop_feed_id: feed._id }).count()
            const like = await Like_feed.find({ shop_feed_id: feed._id }).count()
            result.push({
              _id: feed._id,
              is_active: feed.is_active,
              created_date: feed.created_date,
              seller_id: feed.seller_id,
              cat_id: feed.cat_id,
              desc: feed.desc,
              img: feed.img,
              comment: comment,
              like: like
            })

          }))

          res.status(200).json(result);
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
//  Delete Feed
const delete_feed_by_id = (req, res) => {
  try {
    Shop_feed.updateOne(
      { _id: req.params.id },
      { $set: { is_active: "inactive" } }
    )
      .then((success) => {
        if (success.n > 0) {
          res.status(200).json("Delete Data Successfully");
        } else {
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

// Edit Shop Feed
const edit_shop_feed = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(req.files)
    const shop_feed = await Shop_feed.findById(req.body.shop_feed_id);
    if (shop_feed) {
      if (!req.files || Object.keys(req.files.img).length === 0) {
        const data = {
          cat_id: req.body.cat_id,
          desc: req.body.desc,
          img: shop_feed.img,
        };
        const update = await updateData(shop_feed._id, data);
        if (update) {
          res.status(200).json("Update data successfully");
        } else {
          res.status(400).json("Update data Failure");
        }
      } else {
        const img_files = [req.files.img];
        const path_img = "./../img/shop_feed/";
        const path_img_resize = false;
        const img = await upload_product_image(
          img_files,
          path_img,
          path_img_resize
        );
        if (img.length > 0) {
          const data = {
            cat_id: req.body.cat_id,
            desc: req.body.desc,
            img: img[0],
          };
          const update = await updateData(shop_feed._id, data);
          if (update) {
            const img_name = [shop_feed.img];
            const path_img = "./../img/shop_feed/";
            const path_img_resize = false;
            res.status(200).json("Update data successfully");
            delete_img(img_name, path_img, path_img_resize);
          } else {
            res.status(400).json("Update data Failure");
          }
        } else {
          res.status(400).json();
        }
      }
    } else {
      res.status(400).json();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

// Update Data
async function updateData(id, data) {
  return Shop_feed.updateOne({ _id: id }, { $set: data })
    .then((success) => {
      if (success.n > 0) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export {
  add_shop_feed,
  get_all_feed_by_seller_id,
  delete_feed_by_id,
  edit_shop_feed,
};
