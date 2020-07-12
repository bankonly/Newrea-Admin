const socketIo = require("socket.io");

let io;
export const initSocket = (server, channel, msg = "connected") => {
  io = socketIo.listen(server);
  io.on(channel, () => console.log(msg));
  return io;
};

export const socket = () => {
  if (!io) throw new Error("socket failed");
  return io;
};
