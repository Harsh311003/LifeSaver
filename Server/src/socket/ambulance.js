const connectedAmbulances = [];
/**
 *
 * @param {*} newAmbulance
 * @returns
 */
/**
 * const ambulance = {
 *  location: {},
 *  socketId: "",
 *  details: {_id ,driverPhone, plateNo, driverName}
 * };
 */

const addAmbulance = (newAmbulance, socketId) => {
  const doesExist = connectedAmbulances.find(
    (connectedA) => connectedA.details._id == newAmbulance.details._id
  );
  if (doesExist) {
    return { error: "Ambulance already connected!" };
  }
  const addedAmbulance = {
    location: {},
    socketId: socketId,
    details: newAmbulance,
  };
  connectedAmbulances.push(addedAmbulance);
  return { addedAmbulance };
};

const removeAmbulance = (socketId) => {
  const index = connectedAmbulances.findIndex(
    (connectedAmbulance) => connectedAmbulance.socketId == socketId
  );
  if (index !== -1) return connectedAmbulances.splice(index, 1)[0];
};

const getAmbulance = (_id) =>
  connectedAmbulances.find(
    (connectedAmbulance) => connectedAmbulance.details.id == _id
  );

const updateLocation = (socketId, location) => {
  console.log(JSON.stringify(connectedAmbulances));
  const index = connectedAmbulances.findIndex(
    (connectedAmbulance) => connectedAmbulance.socketId == socketId
  );
  if (connectedAmbulances[index]) {
    connectedAmbulances[index].location = location;
  }
};
module.exports = {
  addAmbulance,
  removeAmbulance,
  getAmbulance,
  updateLocation,
  connectedAmbulances,
};
