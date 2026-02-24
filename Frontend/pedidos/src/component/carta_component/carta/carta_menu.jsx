import { useEffect } from "react";
import "./carta_menu.css";
import { BlinkBlur } from "react-loading-indicators";

import { IMAGENES } from "../../../utils/assets.js";
import { useApi } from "../../../hook/useApi/useApi.jsx";
import { obtenerEntidades } from "../../../service/api.js";
function Carta_menu() {
  const { datos: platos, loading, ejecutarFetch } = useApi();

  useEffect(() => {
    ejecutarFetch(() => obtenerEntidades("platos"));
  }, []);

  const renderAlergenosYVegano = (plato) => {
    let esPlatoVegano = true;

    const alergenosAImprimir = new Map();

    if (!plato.ingredientes || plato.ingredientes.length === 0) {
      esPlatoVegano = false;
    }

    const diccionarioAlergenos = {
      altramuz: { img: IMAGENES.AlergenosIco.Altramuces, titulo: "Altramuces" },
      altramuces: {
        img: IMAGENES.AlergenosIco.Altramuces,
        titulo: "Altramuces",
      },
      apio: { img: IMAGENES.AlergenosIco.Apio, titulo: "Apio" },
      cacahuete: { img: IMAGENES.AlergenosIco.Cacahuete, titulo: "Cacahuetes" },
      crustaceo: {
        img: IMAGENES.AlergenosIco.Crustaceos,
        titulo: "Crustáceos",
      },
      cascara: {
        img: IMAGENES.AlergenosIco.FrutosCascara,
        titulo: "Frutos de Cáscara",
      },
      seco: {
        img: IMAGENES.AlergenosIco.FrutosCascara,
        titulo: "Frutos de Cáscara",
      },
      gluten: { img: IMAGENES.AlergenosIco.Gluten, titulo: "Gluten" },
      trigo: { img: IMAGENES.AlergenosIco.Gluten, titulo: "Gluten" },
      huevo: { img: IMAGENES.AlergenosIco.Huevos, titulo: "Huevos" },
      leche: { img: IMAGENES.AlergenosIco.Lacteos, titulo: "Lácteos" },
      lacteo: { img: IMAGENES.AlergenosIco.Lacteos, titulo: "Lácteos" },
      queso: { img: IMAGENES.AlergenosIco.Lacteos, titulo: "Lácteos" },
      molusco: { img: IMAGENES.AlergenosIco.Molusco, titulo: "Moluscos" },
      mostaza: { img: IMAGENES.AlergenosIco.Mostaza, titulo: "Mostaza" },
      pescado: { img: IMAGENES.AlergenosIco.Pescado, titulo: "Pescado" },
      sesamo: { img: IMAGENES.AlergenosIco.Sesamo, titulo: "Sésamo" },
      soja: { img: IMAGENES.AlergenosIco.Soja, titulo: "Soja" },
      sulfito: { img: IMAGENES.AlergenosIco.Sulfitos, titulo: "Sulfitos" },
    };

    plato.ingredientes?.forEach((relacion) => {
      const ingrediente = relacion.ingrediente;
      if (!ingrediente.esVegano) {
        esPlatoVegano = false;
      }

      // Normalizamos a minúsculas y quitamos acentos
      const alergenosString = ingrediente.alergenos
        ? ingrediente.alergenos
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";

      // Buscamos las palabras del diccionario dentro del string del ingrediente
      Object.keys(diccionarioAlergenos).forEach((palabraClave) => {
        if (alergenosString.includes(palabraClave)) {
          const datoAlergeno = diccionarioAlergenos[palabraClave];
          // Lo guardamos en el Map.
          alergenosAImprimir.set(datoAlergeno.img, datoAlergeno.titulo);
        }
      });
    });

    const iconos = [];

    alergenosAImprimir.forEach((titulo, rutaImg) => {
      iconos.push(
        <img
          key={rutaImg}
          src={rutaImg}
          alt={`Contiene ${titulo}`}
          title={`Contiene ${titulo}`}
        />,
      );
    });

    if (esPlatoVegano) {
      iconos.push(
        <img
          id="veganoImg"
          key="vegano"
          src={IMAGENES.AlergenosIco.Vegano}
          alt="Vegano"
          title="Apto para Veganos"
        />,
      );
    }

    return iconos;
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <BlinkBlur
          color="#AC7E2F"
          size="large"
          text="Cargando nuestra carta..."
          textColor="#AC7E2F"
        />
      </div>
    );
  }

  return (
    <div className="Menu_content_div_father">
      <div className="Menu_content_div">
        {platos.map((plato) => {
          const nombrePlato = plato.nombre || "Sin Nombre";
          const descripcionPlato =
            plato.descripcion || "Descripción no disponible.";

          const imagen = plato.imagen
            ? `/CrudImg/Platos/${plato.imagen}.png`
            : "/logo.png";

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
  );
}

export default Carta_menu;
