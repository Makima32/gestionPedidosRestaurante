import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlinkBlur } from "react-loading-indicators";
import Header_admin from "../common/headerAdmin";

import { useApi } from "../../../hook/useApi/useApi.jsx";
import { obtenerEntidades } from "../../../service/api.js";

import "../common/Formularios.css";

function ModificarPlato() {
  const navigate = useNavigate();

  const { datos: platos, loading, ejecutarFetch } = useApi();

  useEffect(() => {
    ejecutarFetch(() => obtenerEntidades("platos"));
  }, []);

  const handleEdit = (idPlato) => {
    navigate(`/modificar/plato/${idPlato}`);
  };

  if (loading) {
    return (
      <>
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BlinkBlur
            color="#AC7E2F"
            size="large"
            text="Cargando inventario..."
            textColor="#AC7E2F"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Header_admin />
      <div>
        <div className="div_title">
          <h1>Editar Platos</h1>
        </div>

        <div className="cards-container">
          {platos &&
            platos.map((plato) => {
              const imagen = plato.imagen ? plato.imagen : "default";

              return (
                <div className="card" key={plato.idPlato}>
                  <div className="card_image">
                    <img
                      src={`/CrudImg/Platos/${imagen}.png`}
                      alt={`Imagen del plato ${plato.nombre}`}
                      onError={(e) => {
                        e.target.src = "/CrudImg/Platos/default.png";
                      }}
                    />
                  </div>

                  <div className="div_content">
                    <h2>{plato.nombre}</h2>
                    <p>
                      <strong>Descripción:</strong> {plato.descripcion}
                    </p>
                    <p>
                      <strong>Precio:</strong> {plato.precio} €
                    </p>

                    <p>
                      <strong>Ingredientes:</strong>
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#555" }}>
                      {plato.ingredientes?.length
                        ? plato.ingredientes
                            .map(
                              (rel) =>
                                `${rel.cantidad}x ${rel.ingrediente.nombre}`,
                            )
                            .join(", ")
                        : "Sin ingredientes asignados"}
                    </p>
                  </div>

                  <div className="buttonEditDiv">
                    <button
                      id="editbutton"
                      onClick={() => handleEdit(plato.idPlato)}
                    >
                      <img src="/editbutton.png" alt="Modificar" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ModificarPlato;
