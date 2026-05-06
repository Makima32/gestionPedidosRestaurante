import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Visualizar.css";
import { BlinkBlur } from "react-loading-indicators";
import Header_admin from "./headerAdmin.jsx";

import { useApi } from "../../../hook/useApi/useApi.jsx";
import { obtenerEntidades } from "../../../service/api.js";

import ListarPedidos from "../Pedidos/ListaPedidos.jsx"; 

function Visualizar() {
  const { tipo } = useParams();

  const { datos, loading, ejecutarFetch } = useApi();

  const configDiccionario = {
    ingredientes: {
      idKey: "idIngrediente",
      folder: "Ingredientes",
      titulo: "Ingredientes en Inventario",
    },
    platos: {
      idKey: "idPlato",
      folder: "Platos",
      titulo: "Platos en Menú",
    },
    usuarios: {
      idKey: "idUsuario",
      folder: "Usuarios",
      titulo: "Usuarios Registrados",
    },
    clientes: {
      idKey: "idUsuario",
      folder: "Usuarios",
      titulo: "Listado de Clientes",
    },
  };

  const config = configDiccionario[tipo];

  useEffect(() => {

    if (config) {
      ejecutarFetch(() => obtenerEntidades(tipo));
    }
  }, [tipo]);


  if (tipo === "pedidos") {
    return (
      <div>
        <ListarPedidos />
      </div>
    );
  }

 
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
            text={`Cargando ${tipo}...`}
            textColor="#AC7E2F"
          />
        </div>
      </>
    );
  }

  if (!config) return <p>Tipo de recurso no válido.</p>;

  return (
    <>
      <div>
        <div className="div_title">
          <h1>{config.titulo}</h1>
        </div>
        <div className="cards-container">
          {datos &&
            datos.map((dato) => {
              const imagen = dato.imagen ? dato.imagen : "default";

              return (
                <div className="card" key={dato[config.idKey]}>
                  <div className="card_image">
                    <img
                      src={`/CrudImg/${config.folder}/${imagen}.png`}
                      alt={`Imagen de ${tipo}`}
                    />
                  </div>

                  <div className="card_content_div">
                    <h2>{dato.nombre}</h2>
                    
                    {tipo !== "usuarios" && tipo !== "clientes" && (
                      <p>
                        <strong>Descripción:</strong> {dato.descripcion}
                      </p>
                    )}

                    {(tipo === "usuarios" || tipo === "clientes") && (
                      <>
                        <p>
                          <strong>Correo:</strong> {dato.correo}
                        </p>
                        <p>
                          <strong>Rol:</strong> {dato.rol}
                        </p>
                        <p>
                          <strong>Dirección:</strong> {dato.direccion || "No especificada"}
                        </p>
                      </>
                    )}

                    {tipo === "ingredientes" && (
                      <>
                        <p>
                          <strong>Alérgenos:</strong> {dato.alergenos}
                        </p>
                        <p>
                          <strong>Stock:</strong> {dato.stock} unidades
                        </p>
                        <p>
                          <strong>Vegano:</strong> {dato.esVegano ? "Sí" : "No"}
                        </p>
                      </>
                    )}

                    {tipo === "platos" && (
                      <>
                        <p>
                          <strong>Precio:</strong> {dato.precio} €
                        </p>
                        <p>
                          <strong>Ingredientes:</strong>
                        </p>
                        <p style={{ fontSize: "0.9rem", color: "#555" }}>
                          {dato.ingredientes?.length > 0
                            ? dato.ingredientes
                                .map(
                                  (rel) =>
                                    `${rel.cantidad}x ${rel.ingrediente.nombre}`,
                                )
                                .join(", ")
                            : "Sin ingredientes asignados"}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Visualizar;