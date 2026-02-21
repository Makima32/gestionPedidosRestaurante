import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Visualizar.css";
import { SERVER } from "../../../utils/assets";

function Visualizar() {
  const { tipo } = useParams();
  const [datos, setDatos] = useState([]);
  const [errorBackend, setErrorBackend] = useState(false);

 async function fetchDatos() { // 1. Añadimos async
    setErrorBackend(false);
    
    try {
      // 2. Usamos await para esperar la respuesta
      const response = await fetch(`${SERVER}/${tipo}`);
      
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      // 3. Esperamos a que el JSON se procese
      const data = await response.json();
      
      console.log("Datos recibidos:", data);
      setDatos(data);

    } catch (error) {
      // 4. Si el back no conecta (ERR_CONNECTION_REFUSED), caerá aquí directo
      console.error("Error al obtener los datos:", error);
      setErrorBackend(true);
    }
  }
  useEffect(() => {
    fetchDatos();
  }, [tipo]);

  if (errorBackend) {
    return (
      <div className="error-screen-center">
        <div className="error-message-box">
          <span className="error-code">❌</span>
          <h1>¡Conexión Fallida!</h1>
          <p>No se pudo establecer conexión con el backend.</p>
         
          <button
            className="reload-button-inline"
            onClick={() => window.location.reload()}
          >
            Intentar Recargar
          </button>
        </div>
      </div>
    );
  }

  if (tipo === "ingredientes") {
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
                  <img
                    src={`/CrudImg/Ingredientes/${imagen}.png`}
                    alt="imagenIngrediente"
                  />
                </div>

                <div>
                  <h2>{dato.nombre}</h2>

                  <p>
                    <strong>Descripción:</strong> {dato.descripcion}
                  </p>
                  <p>
                    <strong>Alergenos:</strong> {dato.alergenos}
                  </p>
                  <p>
                    <strong>Stock:</strong> {dato.stock}
                  </p>
                  <p>
                    <strong>Vegano:</strong> {dato.esVegano ? "Sí" : "No"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (tipo === "platos") {
    return (
      <div>
        <div className="div_title">
          <h1>{tipo}</h1>
        </div>
        <div className="cards-container">
          {datos.map((dato) => {
            const imagen = dato.imagen ? dato.imagen : "default";
            return (
              <div className="card" key={dato.idPlato}>
                <div className="card_image">
                  <img
                    src={`/CrudImg/Platos/${imagen}.png`}
                    alt="imagenPlato"
                  />
                </div>
                <div className="card_content_div">
                  <h2>{dato.nombre}</h2>
                  <p>
                    <strong>Descripción:</strong> {dato.descripcion}
                  </p>
                  <p>
                    <strong>Precio:</strong> {dato.precio} €
                  </p>
                  <p>
                    <strong>Ingredientes:</strong>{" "}
                  </p>
                  <p>
                    {dato.ingredientes
                      ?.map(
                        (rel) => `${rel.cantidad}x ${rel.ingrediente.nombre}`
                      )
                      .join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  // Retorno por defecto si no hay error y el tipo no coincide
  return null;
}

export default Visualizar;
