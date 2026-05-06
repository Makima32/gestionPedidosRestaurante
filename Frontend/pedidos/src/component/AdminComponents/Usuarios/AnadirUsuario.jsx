import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../common/Formularios.css";
import Header_admin from "../common/headerAdmin";
import { crearUsuarioAPI } from "../../../service/api.js";

function AnadirUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    rol: "user",
    password: "",
    direccion: "",
  });

  const [archivoImagen, setArchivoImagen] = useState(null);
  const [enviando, setEnviando] = useState(false);

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

  const GuardarUsuario = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const formData = new FormData();
    formData.append("usuario", JSON.stringify(usuario));

    if (archivoImagen) {
      formData.append("imagen", archivoImagen);
    }

    try {
      await crearUsuarioAPI(formData);
      alert("Usuario " + usuario.nombre + " creado correctamente.");
      navigate("/adminClientes");
    } catch (error) {
      console.error("Error al crear:", error);
      alert(` Error al crear: ${error.message}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <div className="div_father">
        <h2>Añadir Nuevo Usuario</h2>

        <div className="div_form">
          <form onSubmit={GuardarUsuario}>
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
            <select name="rol" value={usuario.rol} onChange={handleInputChange}>
              <option value="user">Usuario (user)</option>
              <option value="chef">Cocinero (chef)</option>

              <option value="admin">Administrador (admin)</option>
            </select>

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={usuario.password}
              onChange={handleInputChange}
              required
            />

            <label>Foto de Perfil (.png)</label>
            <input
              id="input-imagen"
              type="file"
              accept="image/png"
              onChange={handleImagenChange}
            />
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={usuario.direccion}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn-submit" disabled={enviando}>
              {enviando ? "Guardando..." : "Crear Usuario"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AnadirUsuario;
