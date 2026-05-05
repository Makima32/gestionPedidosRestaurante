import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./eliminar.css";
import { IMAGENES, SERVER } from "../../../utils/assets";
import { BlinkBlur } from "react-loading-indicators";
import Header_admin from "./headerAdmin.jsx";

import { useApi } from "../../../hook/useApi/useApi.jsx";
import { obtenerEntidades, eliminarEntidad } from "../../../service/api.js";

function Eliminar() {
  const { tipo } = useParams();

  const { datos, loading, ejecutarFetch } = useApi();

  const configDiccionario = {
    ingredientes: {
      idKey: "idIngrediente",
      folder: "Ingredientes",
      singular: "ingrediente",
    },
    platos: {
      idKey: "idPlato",
      folder: "Platos",
      singular: "plato",
    },
    usuarios: {
      idKey: "idUsuario",
      folder: "Usuarios",
      singular: "usuario",
    },
    clientes: {
      idKey: "idUsuario",
      folder: "Usuarios",
      singular: "cliente",
    },
    pedidos: {
      idKey: "idPedido",
      folder: "Pedidos",
      singular: "pedido",
    },
    mesas: {
      idKey: "idMesa",
      folder: "Mesas",
      singular: "mesa",
    },
    reservas: {
      idKey: "idReserva",
      folder: "Reservas",
      singular: "reserva",
    },
  };

  const config = configDiccionario[tipo];

  useEffect(() => {
    if (config) {
      ejecutarFetch(() => obtenerEntidades(tipo));
    }
  }, [tipo]);

  const borrarDato = async (id) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que quieres eliminar este ${config.singular}?`,
    );

    if (confirmar) {
      try {
        const mensaje = await eliminarEntidad(tipo, id);
        alert(mensaje);
        ejecutarFetch(() => obtenerEntidades(tipo));
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
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
            text={`Buscando ${tipo}...`}
            textColor="#AC7E2F"
          />
        </div>
      </>
    );
  }

  if (!config) return <p>Recurso no válido.</p>;

  return (
    <>
      <div className="eliminar-page-container">
        <div className="div_title">
          <h1>Eliminar {tipo}</h1>
        </div>

        <div className="cards-container">
          {datos &&
            datos.map((dato) => {
              const id = dato[config.idKey];
              const imagen = dato.imagen ? dato.imagen : "default";

              return (
                <div className="card_delete" key={id}>
                  <div className="card_image">
                    <img
                      src={`/CrudImg/${config.folder}/${imagen}.png`}
                      alt={dato.nombre}
                    />
                  </div>

                  <div className="card_info_delete">
                    <h2>{dato.nombre}</h2>
                  </div>

                  <div className="buttomDeleteDiv">
                    <button
                      id="DeleteButtom"
                      type="button"
                      onClick={() => borrarDato(id)}
                    >
                      <img src={IMAGENES.DeleteButton} alt="Borrar" />
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

export default Eliminar;
