// socket
module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"],
      //   allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected...!");
    });

    socket.emit("got_data", {
      name: "sayyad",
      origin: "udupi",
      destination: "mumbai",
    });

    // socket.on("join_room", function (data) {
    //   console.log("joining request received..", data);

    //   socket.join(data.chatroom);

    //   io.in(data.chatroom).emit("user_joined", data);
    // });

    // socket.on("send_message", function (data) {
    //   io.in(data.chatroom).emit("receive_message", data);
    // });
  });
};
