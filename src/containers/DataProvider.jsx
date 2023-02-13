import React, { createContext, useContext, useState } from "react";

const data = {};

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [state, setState] = useState(data);

  return (
    <DataContext.Provider value={{ state, setState }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export default DataProvider;
