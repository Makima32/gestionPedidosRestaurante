import { useState, useEffect } from "react";
import "../common/Formularios.css";
import { BlinkBlur } from "react-loading-indicators";
import Header_admin from "../common/headerAdmin";

import { useApi } from "../../../hook/useApi/useApi.jsx";
import { crearPlatoAPI, obtenerEntidades } from "../../../service/api.js";

function AgregarPlato() {
  const { loading, ejecutarFetch } = useApi();
  const [errorBackend, setErrorBackend] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [plato, setPlato] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    ingredientes: [],
  });

  const [archivoImagen, setArchivoImagen] = useState(null);
  const [ingredientesApi, setIngredientesApi] = useState([]);
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState("");
  const [cantidadIngrediente, setCantidadIngrediente] = useState("");

  const [errores, setErrores] = useState({});
  const [erroresIngrediente, setErroresIngrediente] = useState({});

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const data = await ejecutarFetch(() => obtenerEntidades("ingredientes"));
        setIngredientesApi(data);
        setErrorBackend(false);
      } catch (err) {
        console.error("Error de conexión inicial:", err);
        setErrorBackend(true);
      }
    };
    cargarDatosIniciales();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlato({ ...plato, [name]: value });
    if (errores[name]) setErrores({ ...errores, [name]: undefined });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "image/png") {
        alert(" Solo se permiten imágenes en formato .PNG");
        e.target.value = "";
        setArchivoImagen(null);
        return;
      }
      setArchivoImagen(file);
    }
  };

  const handleIngredienteSelect = (e) => {
    setIngredienteSeleccionado(e.target.value);
    setErroresIngrediente({ ...erroresIngrediente, idIngrediente: undefined });
  };

  const handleCantidadChange = (e) => {
    setCantidadIngrediente(e.target.value);
    setErroresIngrediente({ ...erroresIngrediente, cantidad: undefined });
  };

  const validarFormulario = () => {
    let erroresTemp = {};
    let esValido = true;

    if (!plato.nombre.trim()) {
      erroresTemp.nombre = "El nombre del plato es obligatorio.";
      esValido = false;
    }
    if (!plato.descripcion.trim()) {
      erroresTemp.descripcion = "La descripción es obligatoria.";
      esValido = false;
    }
    const precioNum = Number(plato.precio);
    if (!plato.precio.toString().trim() || isNaN(precioNum) || precioNum <= 0) {
      erroresTemp.precio = "El precio debe ser un número mayor que 0.";
      esValido = false;
    }
    if (plato.ingredientes.length === 0) {
      erroresTemp.ingredientes = "Debes añadir al menos un ingrediente.";
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  const agregarIngredienteAlPlato = () => {
    let erroresIngTemp = {};
    let esIngredienteValido = true;
    const cantidadNum = Number(cantidadIngrediente);

    if (!ingredienteSeleccionado) {
      erroresIngTemp.idIngrediente = "Selecciona un ingrediente.";
      esIngredienteValido = false;
    }
    if (!cantidadIngrediente.toString().trim() || cantidadNum <= 0) {
      erroresIngTemp.cantidad = "Cantidad inválida.";
      esIngredienteValido = false;
    }

    setErroresIngrediente(erroresIngTemp);
    if (!esIngredienteValido) return;

    if (plato.ingredientes.some(ing => ing.idIngrediente === Number(ingredienteSeleccionado))) {
      alert("Este ingrediente ya está en la lista.");
      return;
    }

    const ingObj = ingredientesApi.find(i => i.idIngrediente === Number(ingredienteSeleccionado));

    setPlato(prev => ({
      ...prev,
      ingredientes: [
        ...prev.ingredientes,
        {
          idIngrediente: Number(ingredienteSeleccionado),
          nombre: ingObj?.nombre,
          cantidad: cantidadNum,
        },
      ],
    }));

    setIngredienteSeleccionado("");
    setCantidadIngrediente("");
  };

  const eliminarIngredienteDePlato = (id) => {
    setPlato(prev => ({
      ...prev,
      ingredientes: prev.ingredientes.filter(ing => ing.idIngrediente !== id),
    }));
  };

  const AñadirPlato = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setEnviando(true);

    const ingredientesMapeados = plato.ingredientes.map(ing => ({
      cantidad: ing.cantidad,
      ingrediente: { idIngrediente: ing.idIngrediente },
    }));

    const platoAEnviar = {
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      precio: Number(plato.precio),
      ingredientes: ingredientesMapeados,
    };

    const formData = new FormData();
    formData.append("plato", JSON.stringify(platoAEnviar));
    if (archivoImagen) formData.append("imagen", archivoImagen);

    try {
      await crearPlatoAPI(formData);
      alert(` Plato "${platoAEnviar.nombre}" añadido correctamente`);

      setPlato({ nombre: "", descripcion: "", precio: 0, ingredientes: [] });
      setArchivoImagen(null);
      const inputImg = document.getElementById("input-imagen");
      if (inputImg) inputImg.value = "";
      setErrores({});
    } catch (err) {
      alert(" Error al guardar: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <>
        <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BlinkBlur color="#AC7E2F" size="large" text="Verificando conexión..." textColor="#AC7E2F" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header_admin />
      <div className="div_father">
        <h2>Nuevo Plato</h2>
        <div className="div_form">
          <form onSubmit={AñadirPlato}>
            <label>Nombre</label>
            <input type="text" name="nombre" value={plato.nombre} onChange={handleChange} />
            {errores.nombre && <p className="error">{errores.nombre}</p>}

            <label>Descripción</label>
            <input type="text" name="descripcion" value={plato.descripcion} onChange={handleChange} />
            {errores.descripcion && <p className="error">{errores.descripcion}</p>}

            <label>Precio (€)</label>
            <input type="number" name="precio" step="0.01" value={plato.precio} onChange={handleChange} />
            {errores.precio && <p className="error">{errores.precio}</p>}

            <label>Imagen (.png)</label>
            <input id="input-imagen" type="file" accept="image/png" onChange={handleImagenChange} />

            <label>Ingredientes</label>
            <div className="ingrediente-row">
              <select value={ingredienteSeleccionado} onChange={handleIngredienteSelect}>
                <option value="">-- Selecciona --</option>
                {ingredientesApi.map(ing => (
                  <option key={ing.idIngrediente} value={ing.idIngrediente}>{ing.nombre}</option>
                ))}
              </select>
              <input type="number" placeholder="Cant." value={cantidadIngrediente} onChange={handleCantidadChange} />
              <button type="button" className="btn-add-ingrediente" onClick={agregarIngredienteAlPlato}>+</button>
            </div>
            {erroresIngrediente.idIngrediente && <p className="error">{erroresIngrediente.idIngrediente}</p>}
            {erroresIngrediente.cantidad && <p className="error">{erroresIngrediente.cantidad}</p>}

            <ul className="ingrediente-list">
              {plato.ingredientes.map(ing => (
                <li key={ing.idIngrediente}>
                  {ing.nombre} (x{ing.cantidad})
                  <button type="button" onClick={() => eliminarIngredienteDePlato(ing.idIngrediente)} className="btn-delete-small">X</button>
                </li>
              ))}
            </ul>
            {errores.ingredientes && <p className="error">{errores.ingredientes}</p>}

            <button type="submit" className="btn-submit" disabled={enviando}>
              {enviando ? "Guardando..." : "Guardar Plato"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AgregarPlato;