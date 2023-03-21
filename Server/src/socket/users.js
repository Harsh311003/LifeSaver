const users = [];

const addUser = ({ id, gps, phone }) => {
  if (!id || !gps || !phone)
    return { error: "All Details Should Be Specified!!" };

  const existingUser = users.find(
    (user) => user.id === id || user.gps === user.gps || user.phone === phone
  );

  if (existingUser) return { error: "Detail Already Taken!!" };

  const user = { id, gps, phone };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex(
    (user) => user.id == id
  );
  if (index !== -1) return users.splice(index, 1)[0];
};

const updateUserLocation = (id, gps) => {
  const index = users.findIndex((user) => user.id === id);
  if(users[index]){
    user[index].gps = gps;
  }
}

module.exports = {
  addUser,
  removeUser, 
  updateUserLocation, 
  users
};
