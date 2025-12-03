import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./eliminar.css";

function Eliminar() {
  const { tipo } = useParams();       // "ingredientes" o "platos"
  const [datos, setDatos] = useState([]);

  function fetchDatos() {
    fetch(`http://localhost:8080/${tipo}/listar`)
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
  }, [tipo]);

  // ahora es genérico, no sólo idIngrediente
  function borrarDato(id, nombre) {
    fetch(`http://localhost:8080/${tipo}/eliminar/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert(`${tipo.slice(0, -1)} ${nombre} eliminado`);
        fetchDatos(); // refresca la lista automáticamente
      })
      .catch((error) => console.error("Error al eliminar:", error));
  }

  return (
    <div>
      <div className="div_title">
        <h1>
          Eliminar {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
        </h1>
      </div>

      <div className="cards-container">
        {datos.map((dato) => {
          // si es ingredientes → idIngrediente, si es platos → idPlato
          const id =
            tipo === "ingredientes" ? dato.idIngrediente : dato.idPlato;

          const imagen = dato.imagen ? dato.imagen : "default";

          // carpeta de imágenes distinta según tipo
          const carpetaImagen =
            tipo === "ingredientes" ? "Ingredientes" : "Platos";

          return (
            <div className="card_delete" key={id}>
              <div className="card_image">
                <img
                  src={`/CrudImg/${carpetaImagen}/${imagen}.png`}
                  alt={`imagen-${tipo.slice(0, -1)}`}
                />
              </div>

              <div>
                <h2>{dato.nombre}</h2>
              </div>

              <div className="buttomDeleteDiv">
                <button
                  id="DeleteButtom"
                  type="button"
                  onClick={() => borrarDato(id, dato.nombre)}
                >
                  <img src="/deletebuttom.png" alt="Eliminar" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Eliminar;
