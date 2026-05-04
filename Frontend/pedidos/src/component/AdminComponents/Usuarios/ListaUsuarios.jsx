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

  const handleEdit = (idUsuario) => {
    navigate(`/editar-usuario/${idUsuario}`);
  };

  const handleDelete = async (idUsuario, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`)) {
      setEliminando(true);
      try {
        await eliminarEntidad("usuarios", idUsuario);
        alert("Usuario eliminado correctamente.");
        cargarDatos();
      } catch (error) {
        alert("Error al eliminar el usuario: " + error.message);
      } finally {
        setEliminando(false);
      }
    }
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

  if (loading || eliminando) {
    return (
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <BlinkBlur color="#AC7E2F" size="large" text={eliminando ? "Eliminando..." : "Cargando usuarios..."} textColor="#AC7E2F" />
      </div>
    );
  }

  return (
    <div>
      <div className="div_title">
        <h1>Gestión de Usuarios - {modo}</h1>
      </div>
      <div className="cards-container">
        {usuarios && usuarios.length > 0 ? (
          usuarios.map((user) => {
            const imagenRuta = user.imagen 
              ? `/CrudImg/Usuarios/${user.imagen}.png` 
              : "/CrudImg/Usuarios/default.png";

            return (
              <div className="card" key={user.idUsuario}>
                <div className="card_image">
                  <img
                    src={imagenRuta}
                    alt={user.nombre}
                    onError={(e) => { e.target.src = "/logo_Mobile.webp"; }} 
                  />
                </div>

                <div className="div_content">
                  <h2>{user.nombre}</h2>
                  <p>
                    <strong>Correo:</strong> {user.correo}
                  </p>
                  <p>
                    <strong>Rol:</strong> {user.rol}
                  </p>
                </div>

                <div className="buttonEditDiv">
                  {modo === "modificar" && (
                    <button
                      id="editbutton"
                      onClick={() => handleEdit(user.idUsuario)}
                    >
                      <img src={IMAGENES.EditButton} alt="Modificar" />
                    </button>
                  )}
                  {modo === "eliminar" && (
                    <button
                      id="deletebutton"
                      onClick={() => handleDelete(user.idUsuario, user.nombre)}
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
