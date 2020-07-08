const axios = require("axios");
const mongoose = require("mongoose");
const tokenModel = require("./../models/TokenModel");
// import SSM_token from "./../models/SSM_token"

exports.send_notification = async (notiData, condition) => {
  console.log("noti working...");
  try {
    // var result = await SSM_token.find(condition);
    let result = await tokenModel.find(condition);
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
