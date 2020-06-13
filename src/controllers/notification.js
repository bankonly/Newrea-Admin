import Notification from "./../models/Notification";
import Notification_history from "./../models/Notification_history";
import axios from "axios";
import ip from "ip";

const send_notification = async (req, res) => {
  const notiData = await Notification.findById(req.body.noti_id);
  if (notiData) {
    var message = {
      to:
        "cP8eqHILrtA:APA91bHtSPb7g9ye0kVqPpSXK8q1EI4h3HkfEcE6LLmT4eOeUhqSEaV6HshpVTYI8qWkgg3CDWWD_cApF_IFN-_cW03E1mJYrfOQw04A1eCyweNcG4Dz_82Vy6qFNxI2flgWGBLD8ijO",
      notification: {
        title: notiData.title,
        body: notiData.desc,
        sound: "default",
      },
      data: {
        noti_id: notiData._id,
        type: notiData.type,
        channelId: "DRI_001",
        target: "test",
      },
    };
    const config = {
      method: "post",
      url: "https://fcm.googleapis.com/fcm/send",
      headers: {
        Authorization:
          "key=AAAAlaBHGNA:APA91bHU3M4fprjGCE_6Wa4I_NHQQjN_MsH-igBdM-oa_C0_C4bQMlH9pNhIbQbp7Isp0aNERYZ7tyHQemt9r2gQXceS0sA-fqu0-2frcDX17xNaZf0fmnVGzzayoGypBrSYHL_Z9GUa",
      },
      data: message,
    };
    await axios(config)
      .then((result) => {
        return res.status(200).json(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(400).json();
  }
};

const get_noti_by_array_id = (req, res) => {
  Notification.find({ _id: { $in: req.body.noti_id } })
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
};

async function get_noti() {
  try {
    return Notification.find({
      $and: [
        { is_active: "active" },
        { receivers: "seller" }
      ]
    })
      .then((success) => {
        if (success.length > 0) {
          return success;
        } else {
          return []
        }
      })
      .catch((err) => {
        console.log(err);
        return []
      })
  } catch (e) {
    return []
  }
}

const get_all_noti = async (req, res) => {
  try {
    const result = await get_noti()
    const deleted_noti = await Notification_history.find({ $and: [{ user_id: req.params.user_id }, { deleted: true }] })
    const read_noti = await Notification_history.find({ $and: [{ user_id: req.params.user_id }, { read: true }] })
    if (deleted_noti.length > 0) {
      if (result.length > 0) {
        let result_noti = []
        result.map(data => {
          const data_found = deleted_noti.find(deleted_data =>
            data._id.toString() === deleted_data.noti_id.toString()
          )
          if (data_found !== undefined) {
          } else {
            result_noti.push({
              _id: data._id,
              title: data.title,
              desc: data.desc,
              sender_id: data.sender_id,
              receivers: data.receivers,
              img: data.img,
              created_date: data.created_date,
            })
          }
        })

        // // Read Noti Func
        let result_data = []
        result_noti.map(data => {
          const data_found = read_noti.find(read_data =>
            data._id.toString() === read_data.noti_id.toString()
          )
          if (data_found !== undefined) {
            result_data.push({
              _id: data._id,
              title: data.title,
              desc: data.desc,
              sender_id: data.sender_id,
              receivers: data.receivers,
              img: data.img,
              created_date: data.created_date,
              read: true
            })
          } else {
            result_data.push({
              _id: data._id,
              title: data.title,
              desc: data.desc,
              sender_id: data.sender_id,
              receivers: data.receivers,
              img: data.img,
              created_date: data.created_date,
              read: false
            })
          }
        })
        // console.log(read_noti)
        res.status(200).json(result_data)
      } else {
        res.status(204).json()
      }
    } else {
      if (read_noti.length > 0) {
        if (result.length > 0) {
          let result_noti = []
          result.map(data => {
            const data_found = read_noti.find(read_data =>
              data._id.toString() === read_data.noti_id.toString()
            )
            if (data_found !== undefined) {
              result_noti.push({
                _id: data._id,
                title: data.title,
                desc: data.desc,
                sender_id: data.sender_id,
                receivers: data.receivers,
                img: data.img,
                created_date: data.created_date,
                read: true
              })
            } else {
              result_noti.push({
                _id: data._id,
                title: data.title,
                desc: data.desc,
                sender_id: data.sender_id,
                receivers: data.receivers,
                img: data.img,
                created_date: data.created_date,
                read: false
              })
            }
          })

          res.status(200).json(result_noti)
        } else {
          res.status(204).json()
        }
      } else {
        if (result.length > 0) {
          const data_result = result.map(data => {
            return ({
              _id: data._id,
              title: data.title,
              desc: data.desc,
              sender_id: data.sender_id,
              receivers: data.receivers,
              img: data.img,
              created_date: data.created_date,
              read: false
            })
          })
          res.status(200).json(data_result)
        } else {
          res.status(204).json()
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

const delete_noti = async (req, res) => {
  try {
    const read_noti = await Notification_history.findOne({ $and: [{ noti_id: req.body.noti_id }, { user_id: req.body.user_id }] })
    if (read_noti) {
      Notification_history.updateOne({ $and: [{ noti_id: req.body.noti_id }, { user_id: req.body.user_id }] }, { $set: { deleted: true } })
        .then(success => {
          if (success.n > 0) {
            res.status(200).json("Deleted");
          } else {
            res.status(400).json();
          }
        })
        .catch(e => {
          res.status(400).json();
        })

    } else {
      const newData = new Notification_history({
        noti_id: req.body.noti_id,
        user_id: req.body.user_id,
        deleted: true
      })
      newData.save()
        .then((success) => {
          res.status(200).json("Deleted");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json();
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

// Read Noti
const read_noti = async (req, res) => {
  try {
    const read_noti = await Notification_history.findOne({ $and: [{ noti_id: req.body.noti_id }, { user_id: req.body.user_id }] })
    if (read_noti) {
      res.status(200).json("Readed");
    } else {
      const newData = new Notification_history({
        noti_id: req.body.noti_id,
        user_id: req.body.user_id,
        read: true
      })
      newData.save()
        .then((success) => {
          res.status(200).json("Readed");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json();
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
};

const ip_address = (req, res) => {
  try {
    const clientIp = ip.isV6Format()
    // const clientIp = requestIp.getClientIp(req);
    // console.log(clientIp)
    res.status(200).json(clientIp)
  } catch (err) {
    console.log(err);
    res.status(400).json();
  }
}

export {
  send_notification,
  get_noti_by_array_id,
  get_all_noti,
  delete_noti,
  read_noti,
  ip_address
};
