import { useState } from "react";
import "../formularios.css";

function AgregarIngrediente() {
  const [Ingrediente, setIngrediente] = useState({
    nombre: "",
    descripcion: "",
    alergenos: "",
    stock: "",
    vegano: false,
    imagen: "",
  });

  const AñadirIngrediente = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/ingredientes/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Ingrediente),
    });

    console.log("Ingrediente enviado:", Ingrediente);
    alert(Ingrediente.nombre + " añadido");
  };

  return (
    <>
      <div className="div_father">
        <h2>Formulario agregacion Ingrediente</h2>

        <div className="div_form">
          <form onSubmit={AñadirIngrediente}>
            <label htmlFor="nombre">Nombre alimento</label>
            <input
              type="text"
              placeholder="Nombre"
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, nombre: e.target.value })
              }
            />

            <label htmlFor="descripcion">Descripcion del alimento</label>
            <input
              type="text"
              placeholder="descripcion"
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, descripcion: e.target.value })
              }
            />

            <label htmlFor="alergeno">Alergeno del alimento</label>
            <select
              name="alergeno"
              id="alergeno"
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, alergenos: e.target.value })
              }
            >
              <option value="">Selecciona</option>
              <option value="gluten">Gluten</option>
              <option value="crustaceos">Crustáceos</option>
              <option value="huevos">Huevos</option>
              <option value="pescado">Pescado</option>
              <option value="cacahuetes">Cacahuetes</option>
              <option value="soja">Soja</option>
              <option value="lacteos">Lácteos</option>
              <option value="frutos_cascara">Frutos de cáscara</option>
              <option value="apio">Apio</option>
              <option value="mostaza">Mostaza</option>
              <option value="sesamo">Sésamo</option>
              <option value="sulfito">Dióxido de azufre y sulfitos</option>
              <option value="moluscos">Moluscos</option>
              <option value="altramuces">Altramuces</option>
            </select>
            <label htmlFor="stock">Stock del alimento</label>
            <input
              type="text"
              placeholder="stock"
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, stock: e.target.value })
              }
            />

            <label htmlFor="vegano">¿Es vegano el alimento?</label>
            <select
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, vegano: e.target.value })
              }
            >
              <option value="">Selecciona</option>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>

            <label htmlFor="imagen">Nombre de la imagen</label>
            <input
              type="text"
              placeholder="imagen"
              onChange={(e) =>
                setIngrediente({ ...Ingrediente, imagen: e.target.value })
              }
            />

            <button type="submit">Enviar ingrediente</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AgregarIngrediente;
