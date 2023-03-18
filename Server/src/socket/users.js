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

module.exports = { addUser };
