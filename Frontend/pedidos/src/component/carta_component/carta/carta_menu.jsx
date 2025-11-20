import { useEffect, useState } from "react";
import "./carta_menu.css";

function Carta_menu() {
  const [datos, setDatos] = useState([]);

  const [imagenAlergenos, setImagenAlergenos] = useState("");
  const [stringAlergenos, setStringAlergenos] = useState("Huevos");

  const [Vegano, setVegano] = useState(true);
  const [imagenVegano, setImagenVegano] = useState();
  

  // Solo se ejecuta 1 vez al montar el componente
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

  useEffect(() => {
    
    if (stringAlergenos === "leche") {
      setImagenAlergenos("/AlergenosIco/Lacteos.ico");
    } 
    else if (stringAlergenos === "Huevos") {
      setImagenAlergenos("/AlergenosIco/Huevos.ico");
    }
    else {
      setImagenAlergenos(""); 
    }

  }, [stringAlergenos]);

  useEffect(() =>{

    if (Vegano) {
      setImagenVegano("/AlergenosIco/Vegano.ico")
    }else{
      setImagenVegano("")
    }
  }

  )

  console.log("imagen:", imagenAlergenos);

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
                  <p><strong>Descripcion:</strong> {dato.descripcion}</p>
                  <p><strong>Alergenos:</strong> {dato.alergenos}</p>
                
                <div className="menu_card_alergias">
                  {/* Mostrar icono */}
                  {imagenAlergenos && (
                    <img 
                      src={imagenAlergenos} 
                      alt={imagenAlergenos} 
                    />
                  )}

                  {imagenVegano && (
                    <img 
                      src={imagenVegano} 
                      alt={imagenVegano} 
                    />
                  )}
</div>
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
