import { useState } from "react";
import "../Formularios.css";

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

    // 1. Validar campos obligatorios
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
  
    // 2. Validar que stock sea un número entero no negativo
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

    // Crear el objeto a enviar, asegurando que 'stock' y 'esVegano' sean tipos correctos
    const ingredienteFinal = {
      ...Ingrediente,
      stock: Number(Ingrediente.stock), // Convertir a número
      // Convertir la string "true" o "false" a su valor booleano real
      esVegano: Ingrediente.vegano === "true", 
    };

    try {
      const response = await fetch("http://localhost:8080/ingredientes/crear", {
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
            {/* Campo: Nombre */}
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

            {/* Campo: Descripción */}
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

            {/* Campo: Alérgeno (Dropdown) */}

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
              <option value="Ninguno">Ninguno</option> {/* Opción para no alérgeno */}
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


            {/* Campo: Stock (Cambiado a type="number") */}
            <label htmlFor="stock">Stock del alimento</label>
            <input
              type="number" // Usa type="number" para teclado numérico y validación básica
              placeholder="Stock"
              min="0" // Evita valores negativos a nivel de navegador
              step="1" // Asegura que solo se puedan ingresar enteros
              value={Ingrediente.stock}
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, stock: e.target.value })
              }
            />
            {errores.stock && <p className="error">{errores.stock}</p>}

            {/* Campo: Vegano (Dropdown) */}
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

            {/* Campo: Imagen */}
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
