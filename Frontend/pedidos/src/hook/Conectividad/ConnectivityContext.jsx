import React, { createContext, useState, useContext } from 'react';

const ConnectivityContext = createContext();

export const ConnectivityProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  // Función global para reportar que el servidor ha muerto
  const reportError = () => setIsOnline(false);
  
  // Función para resetear el estado y volver a intentar
  const retry = () => {
    setIsOnline(true);
    window.location.reload(); 
  };

  return (
    <ConnectivityContext.Provider value={{ isOnline, reportError, retry }}>
      {children}
    </ConnectivityContext.Provider>
  );
};

export const useConnectivity = () => useContext(ConnectivityContext);