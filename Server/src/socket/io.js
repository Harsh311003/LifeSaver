var {
  addAmbulance,
  removeAmbulance,
  getAmbulance,
  updateLocation,
  connectedAmbulances,
} = require("./ambulance");

exports.socketServer = (io) => {
  console.log("Socket server has started running...");

  io.on("connection", (socket) => {
    console.log(`New Socket Connected : ${socket.id}`);

    socket.on("addAmbulance", (newAmbulance) => {
      const { error, addedAmbulance } = addAmbulance(newAmbulance, socket.id);

      if (error) {
        socket.emit("errorMessage", { error: error, success: false });
      } else {
        socket.emit("successMessage", {
          msg: "Ambulance added!!",
          ambulance: addedAmbulance,
          success: true,
        });
      }
    });

    socket.on("sendLocation", (location, cb) => {
      updateLocation(socket.id, location);
      socket.broadcast.emit("driversLocation", {
        ambulances: connectedAmbulances,
      });
    });

    socket.on("disconnect", () => {
      const removedAmbulance = removeAmbulance(socket.id);
      if (removedAmbulance !== undefined)
        console.log("removed  ambulance." + removedAmbulance.plateNo);
    });
  });
};
