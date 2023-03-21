import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  /**
   * {details, location}
   * details from DB
   */
  const [user, setuser] = useState({ details: {}, location: {} });
  return (
    <UserContext.Provider value={[user, setuser]}>
      {props.children}
    </UserContext.Provider>
  );
};
