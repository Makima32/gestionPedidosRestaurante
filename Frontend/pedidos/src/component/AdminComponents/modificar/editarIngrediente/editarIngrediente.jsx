import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "../../formularios/Formularios.css"; 
import Header_admin from "../../header_admin/headerAdmin";

function EditarIngrediente() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [Ingrediente, setIngrediente] = useState({
    nombre: "",
    descripcion: "",
    alergenos: "",
    stock: 0,
    esVegano: false, 
    imagen: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let newValue = value;
    if (type === 'number') {
        newValue = parseInt(value, 10);
    } else if (name === 'esVegano') {
        newValue = value === 'true'; 
    }

    setIngrediente({
      ...Ingrediente,
      [name]: newValue,
    });
  };

  useEffect(() => {
    const fetchIngrediente = async () => {
      try {
        const response = await fetch(`http://localhost:8080/ingredientes/${id}`); 
        
        if (!response.ok) {
          throw new Error("Ingrediente no encontrado. Código: " + response.status);
        }
        
        const data = await response.json();
        
        setIngrediente({
          nombre: data.nombre,
          descripcion: data.descripcion,
          alergenos: data.alergenos,
          stock: data.stock,
          esVegano: data.esVegano, 
          imagen: data.imagen || "",
        });
      } catch (error) {
        console.error("Error al cargar el ingrediente:", error);
        alert("Error al cargar los datos del ingrediente.");
      }
    };

    if (id) {
        fetchIngrediente();
    }
  }, [id, navigate]); 

  const ActualizarIngrediente = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:8080/ingredientes/actualizar/${id}`, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Ingrediente),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al actualizar. Servidor: ${errorText}`);
        }

        alert(Ingrediente.nombre + " actualizado correctamente.");
        navigate('/adminIngredientes'); 
    } catch (error) {
        console.error("Error al actualizar el ingrediente:", error);
        alert(`Error al actualizar el ingrediente: ${error.message}`);
    }
  };


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
              placeholder="Nombre"
              value={Ingrediente.nombre}
              onChange={handleInputChange}
            />

            <label htmlFor="descripcion">Descripcion del alimento</label>
            <input
              type="text"
              name="descripcion"
              placeholder="descripcion"
              value={Ingrediente.descripcion}
              onChange={handleInputChange}
            />

            <label htmlFor="alergenos">Alergeno del alimento</label>
            <select
              name="alergenos"
              id="alergenos"
              value={Ingrediente.alergenos}
              onChange={handleInputChange}
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
              type="number" 
              name="stock"
              placeholder="stock"
              value={Ingrediente.stock}
              onChange={handleInputChange}
            />

            <label htmlFor="esVegano">¿Es vegano el alimento?</label>
            <select
              name="esVegano"
              value={Ingrediente.esVegano} 
              onChange={handleInputChange}
            >
              <option value={false}>No</option> 
              <option value={true}>Si</option>
            </select>


            <label htmlFor="imagen">Nombre de la imagen</label>
            <input
              type="text"
              name="imagen"
              placeholder="imagen"
              value={Ingrediente.imagen}
              onChange={handleInputChange}
            />

            <button type="submit">Actualizar ingrediente</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarIngrediente;
