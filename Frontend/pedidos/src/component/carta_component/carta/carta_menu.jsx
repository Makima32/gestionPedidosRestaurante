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

  // Función para determinar y renderizar los iconos de alérgenos/veganismo
  const renderAlergenosYVegano = (plato) => {
    const alergenosEncontrados = new Set();
    let esPlatoVegano = true;
    const carpetaBase = "/AlergenosIco";

    // Si el plato no tiene ingredientes, no puede ser vegano (salvo si es un plato base)
    // y no tiene alergenos. Asumimos que un plato con lista de ingredientes vacía no es apto.
    if (!plato.ingredientes || plato.ingredientes.length === 0) {
      esPlatoVegano = false;
    }

    // 1. Recorrer los ingredientes del plato
    plato.ingredientes?.forEach((relacion) => {
      const ingrediente = relacion.ingrediente;

      // a) Chequear Veganismo
      if (!ingrediente.esVegano) {
        esPlatoVegano = false; // Si un solo ingrediente NO es vegano, el plato NO lo es.
      }

      // b) Chequear Alérgenos (usando la string del ingrediente)
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
      // Puedes añadir más alérgenos aquí (gluten, soja, pescado, etc.)
    });

    // 2. Generar los elementos <img> a mostrar
    const iconos = [];

    // Mostrar icono de leche/lácteos
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

    // Mostrar icono de huevos
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

    // Mostrar icono Vegano
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
            // **CORRECCIÓN DE NULLS:** Si nombre o descripción son null, usa un valor por defecto para que se vea algo.
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
