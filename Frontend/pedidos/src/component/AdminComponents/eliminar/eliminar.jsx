// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./eliminar.css";

// function Eliminar() {
//   const { tipo } = useParams();          // "ingredientes" o "platos"
//   const [datos, setDatos] = useState([]);

//   useEffect(() => {
//     const url = `http://localhost:8080/${tipo}/listar`;

//     fetch(url)
//       .then((r) => {
//         if (!r.ok) throw new Error("Error al obtener datos");
//         return r.json();
//       })
//       .then((data) => {
//         setDatos(data);
//       })
//       .catch((e) => console.error("Error al cargar datos:", e));
//   }, [tipo]);

//   function borrarDato(id, nombre) {
//     const url = `http://localhost:8080/${tipo}/eliminar/${id}`;

//     function borrarDato(idIngrediente, nombre) {
//       fetch(`http://localhost:8080/${tipo}/eliminar/${idIngrediente}`, {
//         method: "DELETE",
//       })
//         .then(() => {
//           alert(`${tipo} ${nombre} eliminado`);
//           fetchDatos(); // refresca la lista automáticamente
//         })

//       // Quitar del estado local
//       setDatos((prev) => prev.filter((item) => item.id !== id));
//     })
//       .catch ((e) => {
//       console.error("Error al eliminar:", e);
//       alert("No se pudo eliminar");
//     });
//   }

//   return (
//     <div>
//       <div className="div_title">
//         <h1>{tipo}</h1>
//       </div>

//       <div className="cards-container">
//         {datos.map((dato) => (
//           <div className="card_delete" key={dato.id}>
//             <div className="card_image">
//               <img src={dato.imagenUrl} alt={`imagen-${tipo}`} />
//             </div>

//             <div>
//               <h2>{dato.nombre}</h2>
//             </div>

//             <div className="buttomDeleteDiv">
//               <button
//                 id="DeleteButtom"
//                 type="button"
//                 onClick={() => borrarDato(dato.id, dato.nombre)}
//               >
//                 <img src="/deletebuttom.png" alt="Eliminar" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Eliminar;


// src/pages/eliminar.jsx (o donde lo tengas)

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { listar, eliminar } from "../../../api/crudApi";
import "./eliminar.css";

function Eliminar() {
  const { tipo } = useParams(); // "ingredientes" o "platos"
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    listar(tipo)
      .then((items) => {
        console.log("[Eliminar] datos normalizados:", items);
        setDatos(items);
      })
      .catch((e) => console.error("Error al cargar datos:", e));
  }, [tipo]);

  function borrarDato(item) {
    console.log("[Eliminar] borrarDato item:", item);

    const { id, nombre } = item;

    eliminar(tipo, id)
      .then(() => {
        alert(`${tipo.slice(0, -1)} ${nombre} eliminado`);
        setDatos((prev) => prev.filter((x) => x.id !== id));
      })
      .catch((e) => {
        console.error(e);
        alert("No se pudo eliminar");
      });
  }

  return (
    <div>
      <div className="div_title">
        <h1>{tipo}</h1>
      </div>

      <div className="cards-container">
        {datos.map((dato) => {
          // por si algo viniera roto, fallamos en consola pero no en la UI
          if (dato.id == null) {
            console.warn("[Eliminar] item sin id:", dato);
            return null;
          }

          return (
            <div className="card_delete" key={dato.id}>
              <div className="card_image">
                <img src={dato.imagenUrl} alt={`imagen-${tipo}`} />
              </div>

              <div>
                <h2>{dato.nombre}</h2>
              </div>

              <div className="buttomDeleteDiv">
                <button
                  id="DeleteButtom"
                  type="button"
                  onClick={() => borrarDato(dato)}
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



