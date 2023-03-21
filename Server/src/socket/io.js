var {
  addAmbulance,
  removeAmbulance,
  getAmbulance,
  updateLocation,
  connectedAmbulances,
} = require("./ambulance");

var {
  addUser,
  removeUser, 
  updateUserLocation, 
} = require("./users");

const {
  getDuration,
  getShortestPathAmbulance
} = require("./apiCalls");

exports.socketServer = (io) => {
  console.log("Socket server has started running...");

  /*For Ambulances*/

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

      console.log(connectedAmbulances);

      socket.broadcast.emit("driversLocation", {
        ambulances: connectedAmbulances,
      });
    });

    /*For Users*/

    socket.on("addUser", (details) => {
      const {error, user} = addUser(socket.id, details); 

      if (error) {
        socket.emit("errorMessage", { error: error, success: false });
      } else {
        socket.emit("successMessage", {
          msg: "User added!!",
          ambulance: user,
          success: true,
        });
      }
    })

    socket.on("sendUserLocation", (location, cb) => {
      updateUserLocation(socket.id, location);
      const {latitude, longitude} = location;
      const nearByAmbulances = [];

      connectedAmbulances.forEach((ambulance) => {
        const {data} = getDuration([longitude, latitude], [ambulance.location.longitude, ambulance.location.latitude])
        if(data){
          nearByAmbulances.push(data);
        }
      })

      const {error, ambulance} = getShortestPathAmbulance(nearByAmbulances);

      //Review it

      if (error) {
        socket.emit("errorMessage", { error: error, success: false });
      } else {
        socket.emit("successMessage", {
          msg: "Shortest duration ambulance",
          ambulance,
          success: true,
        });
      }
    })

    socket.on("disconnect", () => {
      const removedUser = removeUser(socket.id);
      if(removedUser !== undefined){
        console.log("Removed user!");
      }

      const removedAmbulance = removeAmbulance(socket.id);
      if (removedAmbulance !== undefined)
        console.log("removed  ambulance." + removedAmbulance.plateNo);
    });
  });
};
