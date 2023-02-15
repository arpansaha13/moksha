import React, { createContext, useContext, useState } from "react";

const data = {
  authUser: {
    name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    institution_name: '',
    phone_no: '',
  }
};

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [appContext, setAppContext] = useState(data);

  return (
    <DataContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </DataContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(DataContext);
};

export default DataProvider;
