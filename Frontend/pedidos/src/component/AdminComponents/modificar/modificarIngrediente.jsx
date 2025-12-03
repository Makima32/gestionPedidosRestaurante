import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import "./modificarIngrediente.css"
import { useEffect, useState } from "react";

function ModificarIngrediente() {
    
  const { tipo } = useParams();
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  function fetchDatos() {
    // ... (Tu función fetchDatos actual)
    fetch("http://localhost:8080/ingredientes/listar")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener datos");
        return response.json(); 
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setDatos(data); 
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }

  useEffect(() => {
    fetchDatos();
  }, []);

  // Nueva función para manejar la navegación al editar
  const handleEdit = (idIngrediente) => {
      // Redirige a la ruta de edición, por ejemplo: /editar-ingrediente/1
      navigate(`/editar-ingrediente/${idIngrediente}`);
  };
  
  return (
    <div>
      <div className="div_title">
      <h1>{tipo}</h1>
      </div>
      <div className="cards-container">
        
        {datos.map((dato) => {
          const imagen = dato.imagen ? dato.imagen : "default";

          return (
            <div className="card" key={dato.idIngrediente}>
              <div className="card_image">
                <img src={`/CrudImg/Ingredientes/${imagen}.png`} alt="imagenIngrediente" />
              </div>

              <div className="div_content">
                <h2>{dato.nombre}</h2>
                <p><strong>Descripción:</strong> {dato.descripcion}</p>
                <p><strong>Alergenos:</strong> {dato.alergenos}</p>
                <p><strong>Stock:</strong> {dato.stock}</p>
                <p><strong>Vegano:</strong> {dato.esVegano ? "Sí" : "No"}</p>
              </div>

              <div className="buttonEditDiv">
                {/* Llama a handleEdit con el ID del ingrediente */}
                <button 
                    id="editbutton" 
                    onClick={() => handleEdit(dato.idIngrediente)}
                >
                    <img src="/editbutton.png" alt="Modificar" />
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default ModificarIngrediente;