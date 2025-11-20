import { useEffect, useState } from "react";
import "./carta_menu.css";

function Carta_menu() {
  const [datos, setDatos] = useState([]);

  function fetchDatos() {
    fetch("http://localhost:8080/ingredientes/listar")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener datos");
        return response.json();
      })
      .then((data) => setDatos(data))
      .catch((error) => console.error("Error al obtener los datos:", error));
  }

  useEffect(() => {
    fetchDatos();
  }, []);

  return (
    <>
      <div className="Menu_content_div_father">
        <div className="Menu_content_div">

          {datos.map((dato) => {
            const imagen = dato.imagen ? dato.imagen : "/logo.png";

            return (
              <div className="menu_card" key={dato.idIngrediente}>
                <div className="menu_card_img">
                  <img src={imagen} alt="ingrediente" />
                </div>

                <div className="menu_card_content">
                  <h2>{dato.nombre}</h2>
                  <p><strong>Descripcion: </strong> {dato.descripcion} + asd asda sdas das asd asd as asd asdsd asdaasdddddddddddddddddddddddddddddd</p>
                  <p><strong>Alergenos:</strong> {dato.alergenos}</p>
                  <p><strong>Vegano:</strong> {dato.esVegano ? "Sí" : "No"}</p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
}

export default Carta_menu;
