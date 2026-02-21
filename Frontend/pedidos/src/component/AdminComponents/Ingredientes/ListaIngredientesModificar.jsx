import { useParams, useNavigate } from "react-router-dom";
import "../common/Formularios.css";
import { useEffect, useState } from "react";
import { IMAGENES, SERVER } from "../../../utils/assets";

function ModificarIngrediente() {
  const { tipo } = useParams();
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();
  const [errorBackend, setErrorBackend] = useState(false);

  function fetchDatos() {
    setErrorBackend(false);

    fetch(`${SERVER}/ingredientes`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener datos (HTTP code)");
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setDatos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setErrorBackend(true);
      });
  }

  useEffect(() => {
    fetchDatos();
  }, []);

  const handleEdit = (idIngrediente) => {
    navigate(`/editar-ingrediente/${idIngrediente}`);
  };

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

              <div className="div_content">
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

              <div className="buttonEditDiv">
                <button
                  id="editbutton"
                  onClick={() => handleEdit(dato.idIngrediente)}
                >
                  <img src={IMAGENES.EditButton} alt="Modificar" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ModificarIngrediente;
