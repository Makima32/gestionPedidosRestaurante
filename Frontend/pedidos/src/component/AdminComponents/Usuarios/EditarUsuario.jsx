import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "../common/Formularios.css"; 
import Header_admin from "../common/headerAdmin";
import { BlinkBlur } from "react-loading-indicators";

import { obtenerEntidadPorId, actualizarUsuarioAPI } from "../../../service/api.js";

function EditarUsuario() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    rol: "user",
    password: "", // Normalmente no se mostraría o se trataría aparte
    imagenVieja: "", 
  });

  const [archivoImagen, setArchivoImagen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        setLoading(true);
        const data = await obtenerEntidadPorId("usuarios", id);
        
        setUsuario({
          nombre: data.nombre,
          correo: data.correo,
          rol: data.rol,
          password: "", // No queremos mostrar la password actual por seguridad
          imagenVieja: data.imagen || "",
        });
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
        alert("Error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUsuario();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/png") {
        alert("⛔ Solo se permiten imágenes en formato .PNG");
        e.target.value = "";
        setArchivoImagen(null);
        return;
      }
      setArchivoImagen(file);
    }
  };

  const ActualizarUsuario = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const usuarioFinal = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      imagen: archivoImagen ? null : usuario.imagenVieja
    };
    
    // Solo enviamos la password si se ha escrito algo nuevo
    if (usuario.password) {
      usuarioFinal.password = usuario.password;
    }

    const formData = new FormData();
    formData.append("cambios", JSON.stringify(usuarioFinal));

    if (archivoImagen) {
      formData.append("imagen", archivoImagen);
    }

    try {
        await actualizarUsuarioAPI(id, formData);
        alert("Usuario " + usuario.nombre + " actualizado correctamente.");
        navigate('/adminClientes'); 
    } catch (error) {
        console.error("Error al actualizar:", error);
        alert(` Error al actualizar: ${error.message}`);
    } finally {
        setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BlinkBlur color="#AC7E2F" size="large" text="Cargando usuario..." textColor="#AC7E2F" />
      </div>
    );
  }

  return (
    <>
      <Header_admin/>
      <div className="div_father">
        <h2>Modificar Usuario: {usuario.nombre}</h2>

        <div className="div_form">
          <form onSubmit={ActualizarUsuario}>
            
            <label htmlFor="nombre">Nombre de usuario</label>
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={usuario.correo}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="rol">Rol del usuario</label>
            <select
              name="rol"
              value={usuario.rol}
              onChange={handleInputChange}
            >
              <option value="user">Usuario (user)</option>
              <option value="admin">Administrador (admin)</option>
            </select>
            
            <label htmlFor="password">Contraseña (dejar en blanco para no cambiar)</label>
            <input
              type="password"
              name="password"
              placeholder="Nueva contraseña"
              value={usuario.password}
              onChange={handleInputChange}
            />

            <label>Subir Nueva Foto de Perfil (.png)</label>
            {usuario.imagenVieja && (
                <p style={{fontSize: '0.8rem', color: '#666'}}>
                    Imagen actual: <strong>{usuario.imagenVieja}.png</strong>
                </p>
            )}
            <input
              id="input-imagen"
              type="file"
              accept="image/png"
              onChange={handleImagenChange}
            />

            <button type="submit" className="btn-submit" disabled={enviando}>
                {enviando ? "Actualizando..." : "Guardar Cambios"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarUsuario;
