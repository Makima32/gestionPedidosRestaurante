import React, { createContext, useState, useContext } from 'react';

const ConnectivityContext = createContext();

export const ConnectivityProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  const setConnectionError = () => {
    console.log("Cambiando estado a offline...");
    setIsOnline(false);
  };
  
  const retry = () => {
    setIsOnline(true);
  };

  return (
    <ConnectivityContext.Provider value={{ isOnline, setConnectionError, retry }}>
      {children}
    </ConnectivityContext.Provider>
  );
};

export const useConnectivity = () => useContext(ConnectivityContext);