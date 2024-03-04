/* eslint-disable react/prop-types */
// AppContext.js
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const setSelectedValueHandler = (value) => {
    setSelectedValue(value);
  };

  return (
    <AppContext.Provider value={{ selectedValue, setSelectedValue: setSelectedValueHandler }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
