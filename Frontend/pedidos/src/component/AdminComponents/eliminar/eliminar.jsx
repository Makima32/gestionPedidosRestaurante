import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./eliminar.css";

function Eliminar() {
  const { tipo } = useParams();
  const [datos, setDatos] = useState([]);

  function fetchDatos() {
    fetch(`http://localhost:8080/${tipo}/listar`) //Modificar Ingredientes a variable dinamica
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

function borrarDato(idIngrediente) {
fetch(`http://localhost:8080/${tipo}/eliminar/${idIngrediente}`, {
  method: "DELETE",
})
.then(() => {
  alert(`${tipo} ${idIngrediente} eliminado`);
  fetchDatos(); // refresca la lista automáticamente
})

}

  return (
 <>
 
 <div>
      <div className="div_title">
      <h1>{tipo}</h1>
      </div>
      <div className="cards-container">
        
       {datos.map((dato) => {
  const imagen = dato.imagen ? dato.imagen : "/logo.png";

  return (
    <div className="card_delete" key={dato.idIngrediente}>
      <div className="card_image">
        <img src={imagen} alt="imagenIngrediente" />
      </div>

      <div>
        <h2>{dato.nombre}</h2>
      </div>

      <div className="buttomDeleteDiv">
        <button type="button" onClick={() => borrarDato(dato.idIngrediente)}>
          <img src="/deletebuttom.png" alt="" />
        </button>
      </div>
    </div>
  );
})}

      </div>
    </div>
 
 
 </>
  );
}

export default Eliminar;
