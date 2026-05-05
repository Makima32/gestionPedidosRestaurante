import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../common/Formularios.css"; 
import { IMAGENES } from "../../../utils/assets";
import { BlinkBlur } from "react-loading-indicators";

import { useApi } from "../../../hook/useApi/useApi.jsx";
import { obtenerEntidades } from "../../../service/api.js";

function ModificarIngrediente() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  
  const { datos: ingredientes, loading, ejecutarFetch } = useApi();
  const [errorBackend, setErrorBackend] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setErrorBackend(false);
        await ejecutarFetch(() => obtenerEntidades("ingredientes"));
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setErrorBackend(true);
      }
    };
    cargarDatos();
  }, []);

  const handleEdit = (idIngrediente) => {
    navigate(`/editar-ingrediente/${idIngrediente}`);
  };


  if (loading) {
    return (
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <BlinkBlur color="#AC7E2F" size="large" text="Cargando inventario..." textColor="#AC7E2F" />
      </div>
    );
  }

  return (
    <div>
      <div className="div_title">
        <h1>{tipo || "Ingredientes"}</h1>
      </div>
      <div className="cards-container">
        {ingredientes.map((ing) => {
          const imagenRuta = ing.imagen 
            ? `/CrudImg/Ingredientes/${ing.imagen}.png` 
            : "/CrudImg/Ingredientes/default.png";

          return (
            <div className="card" key={ing.idIngrediente}>
              <div className="card_image">
                <img
                  src={imagenRuta}
                  alt={ing.nombre}
                  onError={(e) => { e.target.src = "/logo.png"; }} 
                />
              </div>

              <div className="div_content">
                <h2>{ing.nombre}</h2>
                <p>
                  <strong>Descripción:</strong> {ing.descripcion}
                </p>
                <p>
                  <strong>Alérgenos:</strong> {ing.alergenos || "Ninguno"}
                </p>
                <p>
                  <strong>Stock:</strong> {ing.stock} unidades
                </p>
                <p>
                  <strong>Vegano:</strong> {ing.esVegano ? "✅ Sí" : "❌ No"}
                </p>
              </div>

              <div className="buttonEditDiv">
                <button
                  id="editbutton"
                  onClick={() => handleEdit(ing.idIngrediente)}
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