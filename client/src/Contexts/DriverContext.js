import React, { createContext, useState } from "react";

export const DriverContext = createContext();

export const DriverProvider = (props) => {
  /**
   * {details, location}
   * details from DB
   */
  const [driver, setdriver] = useState({});
  return (
    <DriverContext.Provider value={[driver, setdriver]}>
      {props.children}
    </DriverContext.Provider>
  );
};
