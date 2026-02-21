import { SERVER } from '../utils/assets.js'; 

export const obtenerPlatos = async () => {
  const response = await fetch(`${SERVER}/platos`);
  
  if (!response.ok) throw new Error("Error al obtener datos");
  return response.json();
};


//Posteriormente agregaremos el resto de peticiones api y lo integraremos en los modulos