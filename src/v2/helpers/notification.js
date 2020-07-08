const axios = require("axios");
const mongoose = require("mongoose");
const tokenModel = require("./../models/TokenModel");
// import SSM_token from "./../models/SSM_token"

exports.send_notification = async (notiData, condition) => {
  console.log("noti working...");

  // if (notiData) {
  // console.log(collection)
  // console.log(condition)
  try {
    // var result = await SSM_token.find(condition);
    var result = await tokenModel.find(condition);
    console.log(result);
    return res.json(result);
    // let result = [
    //   {
    //     token:
    //       "eeVTmjcdRxu-v-Oof7R2MY:APA91bHNaW_PXuP_Z21yP2ZIUeLVLcZhW_cd7pZ4cLX1wEdLpcIuo-c-FcmxEIDB0Ldmyk1GPwsNZI6K3DWWleKyTdWarD7DPEcBT9RXSFmc33Gfcs8-y68l_wHTRS6jETJg-VBf11qV",
    //     user_id: ObjectId("5ec600f75d284a3d075f4f9e"),
    //   },
    // ];

    console.log(result);
    if (result.length > 0) {
      return {
        errorMessage: "No record found",
      };
    } else {
      await Promise.all(
        result.map(async (tokenData) => {
          var message = {
            notification: {
              title: notiData.title,
              body: notiData.body,
              sound: "default",
            },
            data: {
              channelId: notiData.channelId,
              channelName: notiData.channelName,
              target: notiData.target,
            },
            to: tokenData.token,
            priority: "high",
          };
          const config = {
            method: "post",
            url: "https://fcm.googleapis.com/fcm/send",
            headers: {
              Authorization:
                "key=AAAAAZxYNMM:APA91bGX6nufHybTkM76oL37F-6yTmxs4cMXq9H8fftx4Krk-2fWs6YFiNj90rL5GWxwxid29qmSaQNrOq4saIecpUtJMUX3BfaLQK-o7cZ_7M5UQdgDeTqR5j9dn2wRiZsJk6XvjU2Y",
            },
            data: message,
          };
          await axios(config)
            .then((dataAxios) => {
              console.log(dataAxios);
            })
            .catch((err) => {
              console.log(err);
            });
        })
      );
    }
  } catch (error) {
    console.log(error);
    return {
      errorMessage: error,
    };
  }
  // } else {
  //   res.status(400).json();
  // }
};
// global.send_notification = send_notification
