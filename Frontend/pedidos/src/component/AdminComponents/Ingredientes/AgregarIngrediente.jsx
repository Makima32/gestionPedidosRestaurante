import { useState, useEffect } from "react";
import "../common/Formularios.css";
import { BlinkBlur } from "react-loading-indicators";
import { useApi } from "../../../hook/useApi/useApi.jsx";
import { crearIngredienteAPI, obtenerEntidades } from "../../../service/api.js";

function AgregarIngrediente() {
  const { loading, ejecutarFetch } = useApi();
  const [errorBackend, setErrorBackend] = useState(false);

  const [Ingrediente, setIngrediente] = useState({
    nombre: "",
    descripcion: "",
    alergenos: "",
    stock: "",
    vegano: "",
  });

  const [archivoImagen, setArchivoImagen] = useState(null);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const verificarConexion = async () => {
      try {
        await ejecutarFetch(() => obtenerEntidades("ingredientes"));
        setErrorBackend(false);
      } catch (err) {
        setErrorBackend(true);
      }
    };
    verificarConexion();
  }, []);

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

  const validarFormulario = () => {
    let erroresTemp = {};
    let esValido = true;

    if (!Ingrediente.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio.";
      esValido = false;
    }
    if (!Ingrediente.descripcion.trim()) {
      erroresTemp.descripcion = "La descripción es obligatoria.";
      esValido = false;
    }
    if (!Ingrediente.alergenos) {
      erroresTemp.alergenos = "Debes seleccionar un alérgeno.";
      esValido = false;
    }
    
    const stockNum = Number(Ingrediente.stock);
    if (Ingrediente.stock === "" || isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
      erroresTemp.stock = "El stock debe ser un número entero positivo.";
      esValido = false;
    }

    if (Ingrediente.vegano === "") {
      erroresTemp.vegano = "¿Es vegano? es obligatorio.";
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  const AñadirIngrediente = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      alert("Por favor, corrige los errores antes de enviar.");
      return;
    }

    setEnviando(true);

    const ingredienteFinal = {
      nombre: Ingrediente.nombre,
      descripcion: Ingrediente.descripcion,
      alergenos: Ingrediente.alergenos,
      stock: Number(Ingrediente.stock),
      esVegano: Ingrediente.vegano === "true",
    };

    const formData = new FormData();
    formData.append("ingrediente", JSON.stringify(ingredienteFinal));

    if (archivoImagen) {
      formData.append("imagen", archivoImagen);
    }

    try {
      await crearIngredienteAPI(formData);
      alert(ingredienteFinal.nombre + " añadido correctamente");

      setIngrediente({
        nombre: "",
        descripcion: "",
        alergenos: "",
        stock: "",
        vegano: "",
      });
      setArchivoImagen(null);
      const inputImg = document.getElementById("input-imagen");
      if (inputImg) inputImg.value = "";
      setErrores({});

    } catch (error) {
      console.error("Fallo al crear ingrediente:", error);
      alert(" Error de conexión con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '20px' 
      }}>
        <BlinkBlur color="#AC7E2F" size="large" text="Verificando conexión..." textColor="#AC7E2F" />
      </div>
    );
  }



  return (
    <div className="div_father">
      <h2>Formulario agregación Ingrediente</h2>
      <div className="div_form">
        <form onSubmit={AñadirIngrediente}>
          
          <label htmlFor="nombre">Nombre alimento</label>
          <input
            type="text"
            placeholder="Nombre"
            value={Ingrediente.nombre}
            onChange={(e) => setIngrediente({ ...Ingrediente, nombre: e.target.value })}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}

          <label htmlFor="descripcion">Descripción del alimento</label>
          <input
            type="text"
            placeholder="Descripción"
            value={Ingrediente.descripcion}
            onChange={(e) => setIngrediente({ ...Ingrediente, descripcion: e.target.value })}
          />
          {errores.descripcion && <p className="error">{errores.descripcion}</p>}

          <label htmlFor="alergeno">Alérgeno del alimento</label>
          <select
            value={Ingrediente.alergenos}
            onChange={(e) => setIngrediente({ ...Ingrediente, alergenos: e.target.value })}
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
          {errores.alergenos && <p className="error">{errores.alergenos}</p>}

          <label htmlFor="stock">Stock inicial</label>
          <input
            type="number" 
            placeholder="Cantidad en stock"
            min="0" 
            step="1"
            value={Ingrediente.stock}
            onChange={(e) => setIngrediente({ ...Ingrediente, stock: e.target.value })}
          />
          {errores.stock && <p className="error">{errores.stock}</p>}

          <label htmlFor="vegano">¿Es vegano?</label>
          <select
            value={Ingrediente.vegano}
            onChange={(e) => setIngrediente({ ...Ingrediente, vegano: e.target.value })}
          >
            <option value="">Selecciona</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
          {errores.vegano && <p className="error">{errores.vegano}</p>}

          <label>Subir Imagen (.png)</label>
          <input
            id="input-imagen"
            type="file"
            accept="image/png"
            onChange={handleImagenChange}
          />

          <button 
            type="submit" 
            className="btn-submit" 
            disabled={enviando}
          >
            {enviando ? "Guardando..." : "Enviar ingrediente"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgregarIngrediente;