import { useState, useEffect } from "react";
import "../common/Formularios.css";
import { BlinkBlur } from "react-loading-indicators";

import { useApi } from "../../../hook/useApi/useApi.jsx";
import { crearPlatoAPI, obtenerEntidades } from "../../../service/api.js";
import Header_admin from "../common/headerAdmin.jsx";

function AgregarPlato() {
  const { datos: ingredientesApi, loading, ejecutarFetch } = useApi();
  
  const [enviando, setEnviando] = useState(false);
  const [plato, setPlato] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    ingredientes: [],
  });

  const [archivoImagen, setArchivoImagen] = useState(null);
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState("");
  const [cantidadIngrediente, setCantidadIngrediente] = useState("");

  const [errores, setErrores] = useState({});
  const [erroresIngrediente, setErroresIngrediente] = useState({});

  useEffect(() => {
    ejecutarFetch(() => obtenerEntidades("ingredientes"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlato({ ...plato, [name]: value });
    if (errores[name]) setErrores({ ...errores, [name]: undefined });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      setArchivoImagen(file);
    } else {
      alert("Solo se permiten imágenes en formato .PNG");
      e.target.value = "";
    }
  };

  const agregarIngredienteAlPlato = () => {
    if (!ingredienteSeleccionado || !cantidadIngrediente || cantidadIngrediente <= 0) {
      setErroresIngrediente({
        idIngrediente: !ingredienteSeleccionado ? "Selecciona uno" : "",
        cantidad: cantidadIngrediente <= 0 ? "Cantidad inválida" : ""
      });
      return;
    }

    if (plato.ingredientes.some(ing => ing.idIngrediente === Number(ingredienteSeleccionado))) {
      alert("Este ingrediente ya está en la lista.");
      return;
    }

    const ingObj = ingredientesApi?.find(i => i.idIngrediente === Number(ingredienteSeleccionado));

    setPlato(prev => ({
      ...prev,
      ingredientes: [
        ...prev.ingredientes,
        {
          idIngrediente: Number(ingredienteSeleccionado),
          nombre: ingObj?.nombre,
          cantidad: Number(cantidadIngrediente),
        },
      ],
    }));

    setIngredienteSeleccionado("");
    setCantidadIngrediente("");
    setErroresIngrediente({});
  };

  const AñadirPlato = async (e) => {
    e.preventDefault();
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
      alert(`Plato "${platoAEnviar.nombre}" añadido correctamente`);
      setPlato({ nombre: "", descripcion: "", precio: "", ingredientes: [] });
      setArchivoImagen(null);
      document.getElementById("input-imagen").value = "";
    } catch (err) {
      alert("Error al guardar: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header_admin />
        <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BlinkBlur color="#AC7E2F" size="large" text="Cargando almacén..." textColor="#AC7E2F" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="div_father">
        <h2>Nuevo Plato</h2>
        <div className="div_form">
          <form onSubmit={AñadirPlato}>
            <label>Nombre</label>
            <input type="text" name="nombre" value={plato.nombre} onChange={handleChange} required />

            <label>Descripción</label>
            <input type="text" name="descripcion" value={plato.descripcion} onChange={handleChange} required />

            <label>Precio (€)</label>
            <input type="number" name="precio" step="0.01" value={plato.precio} onChange={handleChange} required />

            <label>Imagen (.png)</label>
            <input id="input-imagen" type="file" accept="image/png" onChange={handleImagenChange} />

            <label>Ingredientes</label>
            <div className="ingrediente-row">
              <select 
                value={ingredienteSeleccionado} 
                onChange={(e) => setIngredienteSeleccionado(e.target.value)}
              >
                <option value="">-- Selecciona --</option>
                {ingredientesApi?.map(ing => (
                  <option key={ing.idIngrediente} value={ing.idIngrediente}>
                    {ing.nombre}
                  </option>
                ))}
              </select>
              <input 
                type="number" 
                placeholder="Cant." 
                value={cantidadIngrediente} 
                onChange={(e) => setCantidadIngrediente(e.target.value)} 
              />
              <button type="button" className="btn-add-ingrediente" onClick={agregarIngredienteAlPlato}>+</button>
            </div>

            <ul className="ingrediente-list">
              {plato.ingredientes.map(ing => (
                <li key={ing.idIngrediente}>
                  {ing.nombre} (x{ing.cantidad})
                  <button 
                    type="button" 
                    className="btn-delete-small"
                    onClick={() => setPlato(prev => ({
                        ...prev, 
                        ingredientes: prev.ingredientes.filter(i => i.idIngrediente !== ing.idIngrediente)
                    }))}
                  >X</button>
                </li>
              ))}
            </ul>

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