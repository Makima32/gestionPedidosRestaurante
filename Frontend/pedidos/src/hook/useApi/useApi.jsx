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
      
      //Si todo va bien, guarda los datos y quita el loading
      setDatos(resultado);
      setLoading(false);

    } catch (error) {
      console.error("Error capturado por useApi:", error);
      
      // Si falla esperamos 3 s y mandamos pantalla de error
      setTimeout(() => {
        setLoading(false);
        setConnectionError(); 
      }, 3000);
    }
  };

  // Devolvemos las 3 herramientas para que las use el componente
  return { datos, loading, ejecutarFetch };
};