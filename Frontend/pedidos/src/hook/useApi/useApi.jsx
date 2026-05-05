import { useState } from "react";
import { useConnectivity } from "../Conectividad/ConnectivityContext"; 

export const useApi = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { setConnectionError } = useConnectivity(); 

  const ejecutarFetch = async (funcionApi) => {
    setLoading(true);
    
    try {
      const resultado = await funcionApi(); 
      
      setDatos(resultado);
      setLoading(false);

    } catch (error) {
      console.error("Error capturado por useApi:", error);
      
      setTimeout(() => {
        setLoading(false);
        setConnectionError(); 
      }, 3000);
    }
  };

  return { datos, loading, ejecutarFetch };
};