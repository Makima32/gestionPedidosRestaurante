import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../common/Formularios.css"; 
import { IMAGENES } from "../../../utils/assets";
import { BlinkBlur } from "react-loading-indicators";

import { useApi } from "../../../hook/useApi/useApi.jsx";
import { obtenerEntidades, eliminarEntidad } from "../../../service/api.js";

function ListaUsuarios({ modo }) {
  const { tipo } = useParams();
  const navigate = useNavigate();
  
  const { datos: usuarios, loading, ejecutarFetch } = useApi();
  const [errorBackend, setErrorBackend] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const cargarDatos = async () => {
    try {
      setErrorBackend(false);
      await ejecutarFetch(() => obtenerEntidades("usuarios"));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setErrorBackend(true);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleEdit = (idTarget) => {
    if (!idTarget) {
      alert("Error: No se ha detectado el ID del usuario.");
      return;
    }
    navigate(`/editar-usuario/${idTarget}`);
  };

  const handleDelete = async (idTarget, nombre) => {
    if (!idTarget) {
      alert("Error: No se ha detectado el ID del usuario.");
      return;
    }

    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`)) {
      setEliminando(true);
      try {
        await eliminarEntidad("usuarios", idTarget);
        alert("Usuario eliminado correctamente.");
        cargarDatos();
      } catch (error) {
        alert("Error al eliminar el usuario: " + error.message);
      } finally {
        setEliminando(false);
      }
    }
  };


  if (loading || eliminando) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BlinkBlur color="#AC7E2F" size="large" text={eliminando ? "Eliminando..." : "Cargando usuarios..."} textColor="#AC7E2F" />
      </div>
    );
  }

  return (
    <div>
      <div className="div_title">
        <h1>Usuarios</h1>
      </div>
      <div className="cards-container">
        {usuarios && usuarios.length > 0 ? (
          usuarios.map((user) => {
            const idReal = user.id || user.idUsuario || user.id_usuario;

            const imagenRuta = user.imagen 
              ? `/CrudImg/Usuarios/${user.imagen}.png` 
              : "/CrudImg/Usuarios/default.png";

            return (
              <div className="card" key={idReal}>
                <div className="card_image">
                  <img
                    src={imagenRuta}
                    alt={user.nombre}
                    onError={(e) => { e.target.src = "/logo_Mobile.webp"; }} 
                  />
                </div>

                <div className="div_content">
                  <h2>{user.nombre}</h2>
                  <p><strong>Correo:</strong> {user.correo}</p>
                  <p><strong>Rol:</strong> {user.rol}</p>
                </div>

                <div className="buttonEditDiv">
                  {modo === "modificar" && (
                    <button
                      id="editbutton"
                      onClick={() => handleEdit(idReal)} 
                    >
                      <img src={IMAGENES.EditButton} alt="Modificar" />
                    </button>
                  )}
                  {modo === "eliminar" && (
                    <button
                      id="deletebutton"
                      onClick={() => handleDelete(idReal, user.nombre)} 
                    >
                      <img src={IMAGENES.DeleteButton} alt="Eliminar" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
}

export default ListaUsuarios;