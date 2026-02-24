import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../common/Formularios.css";
import { BlinkBlur } from "react-loading-indicators";
import Header_admin from "../common/headerAdmin";

import {
  actualizarPlatoAPI,
  obtenerEntidadPorId,
} from "../../../service/api.js";

function ModificarPlato() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plato, setPlato] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    ingredientes: [],
    imagenVieja: "",
  });

  const [archivoImagen, setArchivoImagen] = useState(null);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlato({ ...plato, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: undefined });
    }
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

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) {
        setCargando(false);
        return;
      }
      try {
        const dataPlato = await obtenerEntidadPorId("platos", id);

        setPlato({
          nombre: dataPlato.nombre || "",
          descripcion: dataPlato.descripcion || "",
          precio: dataPlato.precio != null ? String(dataPlato.precio) : "",
          ingredientes: dataPlato.ingredientes || [],
          imagenVieja: dataPlato.imagen || "",
        });
      } catch (error) {
        console.error(error);
        alert("No se pudo cargar los datos del plato: " + error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id]);

  const validarFormulario = () => {
    let erroresTemp = {};
    let esValido = true;

    if (!plato.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio.";
      esValido = false;
    }
    if (!plato.descripcion.trim()) {
      erroresTemp.descripcion = "La descripción es obligatoria.";
      esValido = false;
    }

    const precioNum = Number(plato.precio);
    if (!plato.precio.toString().trim()) {
      erroresTemp.precio = "El precio es obligatorio.";
      esValido = false;
    } else if (isNaN(precioNum) || precioNum <= 0) {
      erroresTemp.precio = "El precio debe ser un número mayor que 0.";
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setEnviando(true);

    const platoAEnviar = {
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      precio: Number(plato.precio),
      ingredientes: plato.ingredientes,
      imagen: archivoImagen ? null : plato.imagenVieja,
    };

    const formData = new FormData();
    formData.append("cambios", JSON.stringify(platoAEnviar));

    if (archivoImagen) {
      formData.append("imagen", archivoImagen);
    }

    try {
      await actualizarPlatoAPI(id, formData);
      alert(" Plato actualizado con éxito");
      navigate("/adminPlatos");
    } catch (error) {
      console.error("Error en PUT:", error);
      alert("Error al actualizar: " + error.message);
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <>
        <Header_admin />
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
            text="Cargando datos del plato..."
            textColor="#AC7E2F"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Header_admin />
      <div className="div_father">
        <h2>Modificar Plato</h2>
        <div className="div_form">
          <form onSubmit={manejarSubmit}>
            <label>Nombre</label>
            <input
              name="nombre"
              type="text"
              value={plato.nombre}
              onChange={handleChange}
            />
            {errores.nombre && <p className="error">{errores.nombre}</p>}

            <label>Descripción</label>
            <input
              name="descripcion"
              type="text"
              value={plato.descripcion}
              onChange={handleChange}
            />
            {errores.descripcion && (
              <p className="error">{errores.descripcion}</p>
            )}

            <label>Precio (€)</label>
            <input
              name="precio"
              type="number"
              step="0.01"
              value={plato.precio}
              onChange={handleChange}
            />
            {errores.precio && <p className="error">{errores.precio}</p>}

            <label>Imagen (.png)</label>
            {plato.imagenVieja && (
              <p className="help-text">
                Imagen actual: <strong>{plato.imagenVieja}.png</strong>
              </p>
            )}
            <input
              id="input-imagen"
              type="file"
              accept="image/png"
              onChange={handleImagenChange}
            />

            <button type="submit" className="btn-submit" disabled={enviando}>
              {enviando ? "Guardando..." : "Guardar Cambios"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModificarPlato;
