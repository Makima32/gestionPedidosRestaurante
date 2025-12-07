import { useEffect, useState } from "react";
import "./carta_menu.css";

function Carta_menu() {
  const [datos, setDatos] = useState([]);

  function fetchDatos() {
    fetch("http://localhost:8080/platos/listar")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener datos");
        return response.json();
      })
      .then((data) => {
        console.log("Platos recibidos:", data);
        setDatos(data);
      })
      .catch((error) => console.error("Error al obtener los platos:", error));
  }

  useEffect(() => {
    fetchDatos();
  }, []);

  const renderAlergenosYVegano = (plato) => {
    const alergenosEncontrados = new Set();
    let esPlatoVegano = true;
    const carpetaBase = "/AlergenosIco";

   
    if (!plato.ingredientes || plato.ingredientes.length === 0) {
      esPlatoVegano = false;
    }

    plato.ingredientes?.forEach((relacion) => {
      const ingrediente = relacion.ingrediente;

      if (!ingrediente.esVegano) {
        esPlatoVegano = false; 
      }

      const alergenosString = ingrediente.alergenos
        ? ingrediente.alergenos.toLowerCase()
        : "";

      if (
        alergenosString.includes("leche") ||
        alergenosString.includes("lacteos")
      ) {
        alergenosEncontrados.add("leche");
      }
      if (alergenosString.includes("huevos")) {
        alergenosEncontrados.add("huevos");
      }
    });

    const iconos = [];

    if (alergenosEncontrados.has("leche")) {
      iconos.push(
        <img
          key="leche"
          src={`${carpetaBase}/Lacteos.ico`}
          alt="Contiene Lácteos"
          title="Contiene Lácteos"
        />
      );
    }

    if (alergenosEncontrados.has("huevos")) {
      iconos.push(
        <img
          key="huevos"
          src={`${carpetaBase}/Huevos.ico`}
          alt="Contiene Huevos"
          title="Contiene Huevos"
        />
      );
    }

    if (esPlatoVegano) {
      iconos.push(
        <img
          id="veganoImg"
          key="vegano"
          src={`${carpetaBase}/Vegano.ico`}
          alt="Vegano"
          title="Apto para Veganos"
        />
      );
    }

    return iconos;
  };

  return (
    <>
      <div className="Menu_content_div_father">
        <div className="Menu_content_div">
          {datos.length === 0 && (
            <h1 style={{ color: "red", width: "100%", textAlign: "center" }}>
              No hay platos cargados o el servidor no responde.
            </h1>
          )}

          {datos.map((plato) => {
            const nombrePlato = plato.nombre || "Sin Nombre";
            const descripcionPlato =
              plato.descripcion || "Descripción no disponible.";
            const imagen = plato.imagen ? `/CrudImg/Platos/${plato.imagen}.png` : "/logo.png";

            return (
              <div className="menu_card" key={plato.idPlato}>
                <div className="menu_card_img">
                  <img src={imagen} alt={`Imagen de ${nombrePlato}`} />
                </div>

                <div className="menu_card_content">
                  <h2>{nombrePlato}</h2>
                  <p>
                    <strong>Descripcion:</strong> {descripcionPlato}
                  </p>
                  <p>
                    <strong>Precio:</strong>{" "}
                    {plato.precio !== null ? `${plato.precio} €` : "N/A"}
                  </p>

                  <div className="menu_card_alergias">
                    {renderAlergenosYVegano(plato)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Carta_menu;
