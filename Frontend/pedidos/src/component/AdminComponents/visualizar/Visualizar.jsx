import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Visualizar.css";

function Visualizar() {
  const { tipo } = useParams();
  const [datos, setDatos] = useState([]);

  function fetchDatos() {
    fetch("http://localhost:8080/ingredientes/listar")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener datos");
        return response.json(); 
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setDatos(data); 
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }

  useEffect(() => {
    fetchDatos();
  }, []);

  
  return (
    <div>
      <div className="div_title">
      <h1>{tipo}</h1>
      </div>
      <div className="cards-container">
        
        {datos.map((dato) => {
const imagen = dato.imagen ? dato.imagen : "default";

  return (
    <div className="card" key={dato.idIngrediente}>
      <div className="card_image">
      <img src={`/CrudImg/Ingredientes/${imagen}.png`} alt="imagenIngrediente" />
      </div>

      <div>
        <h2>{dato.nombre}</h2>
        <p><strong>Descripción:</strong> {dato.descripcion}</p>
        <p><strong>Alergenos:</strong> {dato.alergenos}</p>
        <p><strong>Stock:</strong> {dato.stock}</p>
        <p><strong>Vegano:</strong> {dato.esVegano ? "Sí" : "No"}</p>
      </div>
    </div>
  );
})}

      </div>
    </div>
  );
}

export default Visualizar;
