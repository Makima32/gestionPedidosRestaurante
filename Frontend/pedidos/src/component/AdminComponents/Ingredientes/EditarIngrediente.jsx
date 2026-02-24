import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "../common/Formularios.css"; 
import Header_admin from "../common/headerAdmin";
import { BlinkBlur } from "react-loading-indicators";

import { obtenerEntidadPorId, actualizarIngredienteAPI } from "../../../service/api.js";

function EditarIngrediente() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [Ingrediente, setIngrediente] = useState({
    nombre: "",
    descripcion: "",
    alergenos: "",
    stock: 0,
    esVegano: false, 
    imagenVieja: "", 
  });

  const [archivoImagen, setArchivoImagen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorBackend, setErrorBackend] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const fetchIngrediente = async () => {
      try {
        setLoading(true);
        const data = await obtenerEntidadPorId("ingredientes", id);
        
        setIngrediente({
          nombre: data.nombre,
          descripcion: data.descripcion,
          alergenos: data.alergenos,
          stock: data.stock,
          esVegano: data.esVegano, 
          imagenVieja: data.imagen || "",
        });
        setErrorBackend(false);
      } catch (error) {
        console.error("Error al cargar el ingrediente:", error);
        setErrorBackend(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchIngrediente();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    let newValue = value;
    if (type === 'number') {
        newValue = value === "" ? 0 : parseInt(value, 10);
    } else if (name === 'esVegano') {
        newValue = value === 'true'; 
    }

    setIngrediente({
      ...Ingrediente,
      [name]: newValue,
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

  const ActualizarIngrediente = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const ingredienteFinal = {
      nombre: Ingrediente.nombre,
      descripcion: Ingrediente.descripcion,
      alergenos: Ingrediente.alergenos,
      stock: Number(Ingrediente.stock),
      esVegano: Ingrediente.esVegano,
      imagen: archivoImagen ? null : Ingrediente.imagenVieja
    };

    const formData = new FormData();
    formData.append("cambios", JSON.stringify(ingredienteFinal));

    if (archivoImagen) {
      formData.append("imagen", archivoImagen);
    }

    try {
        await actualizarIngredienteAPI(id, formData);
        alert(" " + Ingrediente.nombre + " actualizado correctamente.");
        navigate('/adminIngredientes'); 
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
        <BlinkBlur color="#AC7E2F" size="large" text="Cargando ingrediente..." textColor="#AC7E2F" />
      </div>
    );
  }

 

  return (
    <>
      <Header_admin/>
      <div className="div_father">
        <h2>Modificar Ingrediente: {Ingrediente.nombre}</h2>

        <div className="div_form">
          <form onSubmit={ActualizarIngrediente}>
            
            <label htmlFor="nombre">Nombre alimento</label>
            <input
              type="text"
              name="nombre"
              value={Ingrediente.nombre}
              onChange={handleInputChange}
            />

            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={Ingrediente.descripcion}
              onChange={handleInputChange}
            />

            <label htmlFor="alergenos">Alérgenos</label>
            <select
              name="alergenos"
              value={Ingrediente.alergenos}
              onChange={handleInputChange}
            >
              <option value="">Selecciona</option>
              <option value="Ninguno">Ninguno</option>
              <option value="Gluten">Gluten</option>
              <option value="Crustaceos">Crustáceos</option>
              <option value="Huevos">Huevos</option>
              <option value="Pescado">Pescado</option>
              <option value="Cacahuetes">Cacahuetes</option>
              <option value="Soja">Soja</option>
              <option value="Lacteos">Lácteos</option>
              <option value="Frutos de cascara">Frutos de cáscara</option>
              <option value="Apio">Apio</option>
              <option value="Mostaza">Mostaza</option>
              <option value="Sesamo">Sésamo</option>
              <option value="Sulfito">Dióxido de azufre y sulfitos</option>
              <option value="Moluscos">Moluscos</option>
              <option value="Altramuces">Altramuces</option>
            </select>
            
            <label htmlFor="stock">Stock</label>
            <input
              type="number" 
              name="stock"
              min="0"
              value={Ingrediente.stock}
              onChange={handleInputChange}
            />

            <label htmlFor="esVegano">¿Es vegano?</label>
            <select
              name="esVegano"
              value={Ingrediente.esVegano} 
              onChange={handleInputChange}
            >
              <option value={false}>No</option> 
              <option value={true}>Sí</option>
            </select>

            <label>Subir Nueva Imagen (.png)</label>
            {Ingrediente.imagenVieja && (
                <p style={{fontSize: '0.8rem', color: '#666'}}>
                    Imagen actual: <strong>{Ingrediente.imagenVieja}.png</strong>
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

export default EditarIngrediente;