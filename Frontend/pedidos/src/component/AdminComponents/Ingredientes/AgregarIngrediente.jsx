import { useState } from "react";
import "../common/Formularios.css";
import { SERVER } from "../../../utils/assets";

function AgregarIngrediente() {
  const [Ingrediente, setIngrediente] = useState({
    nombre: "",
    descripcion: "",
    alergenos: "",
    stock: "",
    vegano: false,
    imagen: "",
  });

  const [errores, setErrores] = useState({}); 

  // Función de validación
  const validarFormulario = () => {
    let erroresTemp = {};
    let esValido = true;

    // Validar campos obligatorios
    if (!Ingrediente.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio.";
      esValido = false;
    }
    if (!Ingrediente.descripcion.trim()) {
      erroresTemp.descripcion = "La descripción es obligatoria.";
      esValido = false;
    }
    if (!Ingrediente.alergenos) {
      erroresTemp.alergenos = "Debes seleccionar un alérgeno (o Ninguno).";
      esValido = false;
    }
    if (!Ingrediente.stock.toString().trim()) {
      erroresTemp.stock = "El stock es obligatorio.";
      esValido = false;
    }
    if (Ingrediente.vegano === null || Ingrediente.vegano === "") {
      erroresTemp.vegano = "¿Es vegano? es obligatorio.";
      esValido = false;
    }
  
    // Validar que stock sea un número entero no negativo
    const stockNum = Number(Ingrediente.stock);
    if (isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
      erroresTemp.stock = "El stock debe ser un número entero positivo o cero.";
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  const AñadirIngrediente = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      alert("Por favor, corrige los errores en el formulario antes de enviar.");
      return;
    }

    const ingredienteFinal = {
      ...Ingrediente,
      stock: Number(Ingrediente.stock), // Convertir a número
      esVegano: Ingrediente.vegano === "true", 
    };

    try {
      const response = await fetch(`${SERVER}/ingredientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredienteFinal),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo crear el ingrediente.`);
      }

      console.log("Ingrediente enviado:", ingredienteFinal);
      alert(ingredienteFinal.nombre + " añadido correctamente");

      
    } catch (error) {
      console.error("Fallo al crear ingrediente:", error);
      alert("Error al conectar con el servidor o al crear el ingrediente.");
    }
  };

  return (
    <>
      <div className="div_father">
        <h2>Formulario agregación Ingrediente</h2>

        <div className="div_form">
          <form onSubmit={AñadirIngrediente}>
            <label htmlFor="nombre">Nombre alimento</label>
            <input
              type="text"
              placeholder="Nombre"
              value={Ingrediente.nombre}
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, nombre: e.target.value })
              }
            />
            {errores.nombre && <p className="error">{errores.nombre}</p>}

            <label htmlFor="descripcion">Descripción del alimento</label>
            <input
              type="text"
              placeholder="Descripción"
              value={Ingrediente.descripcion}
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, descripcion: e.target.value })
              }
            />
            {errores.descripcion && <p className="error">{errores.descripcion}</p>}


            <label htmlFor="alergeno">Alérgeno del alimento</label>
            <select
              name="alergeno"
              id="alergeno"
              value={Ingrediente.alergenos}
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, alergenos: e.target.value })
              }
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


            <label htmlFor="stock">Stock del alimento</label>
            <input
              type="number" 
              placeholder="Stock"
              min="0" 
              step="1"
              value={Ingrediente.stock}
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, stock: e.target.value })
              }
            />
            {errores.stock && <p className="error">{errores.stock}</p>}

            <label htmlFor="vegano">¿Es vegano el alimento?</label>
            <select
              value={Ingrediente.vegano}
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, vegano: e.target.value })
              }
            >
              <option value="">Selecciona</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            {errores.vegano && <p className="error">{errores.vegano}</p>}

            <label htmlFor="imagen">Nombre de la imagen</label>
            <input
              type="text"
              placeholder="imagen"
              value={Ingrediente.imagen}
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, imagen: e.target.value })
              }
            />
            {errores.imagen && <p className="error">{errores.imagen}</p>}

            <button type="submit">Enviar ingrediente</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AgregarIngrediente;
