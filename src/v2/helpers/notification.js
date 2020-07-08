const axios = require("axios");
const mongoose = require("mongoose");
// import SSM_token from "./../models/SSM_token"

exports.send_notification = async (notiData, collection, condition) => {
  // if (notiData) {
  // console.log(collection)
  // console.log(condition)
  try {
    // var result = await SSM_token.find(condition);
    var result = await mongoose.model(collection).find(condition);
    // let result = [
    //   {
    //     token:
    //       "eKsqw7wnTKKimc3HCkasYz:APA91bEQNhydG4rH2GM_0NzVoqEqA8bVPeNTak4utaZLw1uxD1j54FTlEJD_wYBMU5YWKyHPcg613067IghG9zJLqT53l1qJ6na6Vvo9AWT3rzQQgIjJwSZkZbJPTbZGKnA0it24hh5a",
    //     user_id: "5ec600f75d284a3d075f4f9d",
    //   },
    // ];

    console.log(result)
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
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        })
      );
    }
  } catch (error) {
    return {
      errorMessage: error,
    };
  }
  // } else {
  //   res.status(400).json();
  // }
};
// global.send_notification = send_notification
