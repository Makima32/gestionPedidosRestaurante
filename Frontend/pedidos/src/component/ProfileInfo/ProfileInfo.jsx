import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/auth/authContext";
import { actualizarUsuarioAPI } from "../../service/api.js";
import { IMAGENES } from "../../utils/assets.js";
import "./ProfileInfo.css";

function ProfileInfo() {
  const { user, actualizarSesion, logout } = useAuth();
  const navigate = useNavigate();

  const [datosEdit, setDatosEdit] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    password: "",
    confirmar: "",
  });

  const [archivoImagen, setArchivoImagen] = useState(null);
  const [imagenPrevia, setImagenPrevia] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    if (user) {
      setDatosEdit({
        nombre: user.name || user.nombre || "",
        correo: user.correo || "",
        direccion: user.direccion || "",
        password: "",
        confirmar: "",
      });
    }
  }, [user]);

  if (!user) return <div className="profile_loading">Cargando perfil...</div>;

const rutaImagenActual = user.imagen
  ? `/CrudImg/Usuarios/${user.imagen}.png?t=${new Date().getTime()}`
  : IMAGENES.IconUser;


  const handleInputChange = (e) => {
    setDatosEdit({
      ...datosEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/png") {
        alert(" Solo se permiten imágenes en formato .PNG");
        e.target.value = "";
        return;
      }
      setArchivoImagen(file);
      setImagenPrevia(URL.createObjectURL(file));
    }
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    setMensaje({ texto: "", tipo: "" });

    const quiereCambiarPassword = datosEdit.password.length > 0;
    
    if (quiereCambiarPassword) {
      if (datosEdit.password !== datosEdit.confirmar) {
        setMensaje({ texto: "Las contraseñas no coinciden.", tipo: "error" });
        return;
      }
      if (datosEdit.password.length < 4) {
        setMensaje({ texto: "La contraseña debe tener al menos 4 caracteres.", tipo: "error" });
        return;
      }
    }

    setCargando(true);

    try {
      const usuarioFinal = {
        correo: datosEdit.correo,
        direccion: datosEdit.direccion,
        rol: user.rol, 
      };

      if (quiereCambiarPassword) {
        usuarioFinal.password = datosEdit.password;
      }

      const formData = new FormData();
      formData.append("cambios", JSON.stringify(usuarioFinal));
      if (archivoImagen) formData.append("imagen", archivoImagen);

      const idUsuario = user.idUsuario || user.id || user.id_usuario; 
      
      if (!idUsuario) throw new Error("No se encontró el ID del usuario.");

      await actualizarUsuarioAPI(idUsuario, formData);
      
      if (quiereCambiarPassword) {
        alert("Seguridad: Contraseña cambiada. Inicia sesión de nuevo.");
        logout();
        navigate("/login");
        return;
      }

      actualizarSesion({
        correo: datosEdit.correo,
        direccion: datosEdit.direccion,
        imagen: archivoImagen ? (user.name || user.nombre) : user.imagen
      });

      setMensaje({ texto: " Datos actualizados correctamente.", tipo: "exito" });
      setDatosEdit(prev => ({ ...prev, password: "", confirmar: "" }));
      setArchivoImagen(null);

    } catch (error) {
      console.error("Error al actualizar:", error);
      setMensaje({ texto: ` Error: ${error.message}`, tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="profile_page">
      <div className="profile_header_nav">
        <h2>Mi Cuenta</h2>
      </div>

      <div className="profile_dashboard">
        <div className="profile_view_card">
          <div className="profile_view_header">
            <img
              src={imagenPrevia || rutaImagenActual}
              alt="Foto perfil"
              className="profile_view_image"
              onError={(e) => (e.target.src = IMAGENES.IconUser)}
            />
            <h3>{user.name || user.nombre}</h3>
            <span className="profile_badge">{user.rol === "admin" ? "Administrador" : "Cliente"}</span>
          </div>
          
          <div className="profile_view_data">
            <div className="data_item">
              <strong>✉️ Correo:</strong>
              <p>{user.correo}</p>
            </div>
            <div className="data_item">
              <strong>📍 Dirección:</strong>
              <p>{user.direccion || "Sin dirección guardada"}</p>
            </div>
          </div>
        </div>

        <div className="profile_edit_card">
          <h3>Modificar mis datos</h3>
          <p className="edit_subtitle">Puedes actualizar tu información.</p>

          <form onSubmit={handleActualizar} className="profile_form">
            <div className="form_row">
              <div className="input_group">
                <label>Nombre de Usuario (No editable)</label>
                <input 
                  type="text" 
                  value={user.name || user.nombre} 
                  disabled 
                  className="input_disabled"
                />
              </div>
              <div className="input_group">
                <label>Correo Electrónico</label>
                <input 
                  type="email" 
                  name="correo" 
                  value={datosEdit.correo} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="input_group full_width">
              <label>Dirección de entrega</label>
              <input 
                type="text" 
                name="direccion" 
                value={datosEdit.direccion} 
                onChange={handleInputChange} 
                placeholder="Calle, Número, Ciudad..." 
              />
            </div>

            <div className="input_group full_width">
              <label>Actualizar Foto de Perfil (.png)</label>
              <input type="file" accept="image/png" onChange={handleImagenChange} className="file_input"/>
            </div>

            <hr className="form_divider" />
            <h4>Seguridad</h4>

            <div className="form_row">
              <div className="input_group">
                <label>Nueva Contraseña</label>
                <input 
                  type="password" 
                  name="password" 
                  value={datosEdit.password} 
                  onChange={handleInputChange} 
                  placeholder="Vacío para no cambiar" 
                />
              </div>
              <div className="input_group">
                <label>Confirmar Contraseña</label>
                <input 
                  type="password" 
                  name="confirmar" 
                  value={datosEdit.confirmar} 
                  onChange={handleInputChange} 
                  placeholder="Repetir contraseña" 
                />
              </div>
            </div>

            {mensaje.texto && (
              <div className={`profile_mensaje ${mensaje.tipo}`}>
                {mensaje.texto}
              </div>
            )}

            <button type="submit" className="btn_update" disabled={cargando}>
              {cargando ? "Guardando cambios..." : "Guardar Cambios"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;