import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./eliminar.css";

function Eliminar() {
    const { tipo } = useParams();
    const [datos, setDatos] = useState([]);

    
    // -------------------------------------------------------------------
    // FETCH: LISTAR DATOS
    // -------------------------------------------------------------------
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
    
    function borrarDato(id) {
        // Usamos la función para obtener el nombre singular para el mensaje
        
        fetch(`http://localhost:8080/${tipo}/eliminar/${id}`, {
            method: "DELETE",
        })
        .then(response => {
            // 1. Manejo de error: Si el estado NO es 2xx (ej: 404, 500)
            if (!response.ok) {
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage || `Error al eliminar ${recursoSingular} (Status: ${response.status})`);
                });
            }
            
            // 2. Éxito: Leemos el mensaje de éxito del backend
            return response.text(); 
        })
        .then(successMessage => {
            // 3. SOLO ÉXITO: Mostramos el mensaje del backend y refrescamos la lista
            alert(successMessage.trim()); 
            fetchDatos(); 
        })
        .catch(error => {
            // 4. FALLO: Mostramos el mensaje de error
            console.error("Error al borrar:", error);
            alert(`Fallo en la operación: ${error.message}`); 
        });
    }

    // -------------------------------------------------------------------
    // RENDERIZADO DEL COMPONENTE
    // -------------------------------------------------------------------

    if (tipo === "ingredientes") {
        const idKey = "idIngrediente";
        const folder = "Ingredientes";

        return (
            <>
                <div>
                    <div className="div_title">
                        <h1>{tipo}</h1>
                    </div>
                    <div className="cards-container">
                        
                        {datos.map((dato) => {
                            const imagen = dato.imagen ? dato.imagen : "/default";
                            const id = dato[idKey];
                            const nombre = dato.nombre;

                            return (
                                <div className="card_delete" key={id}>
                                    <div className="card_image">
                                        <img src={`/CrudImg/${folder}/${imagen}.png`} alt="imagenIngrediente" />
                                    </div>

                                    <div>
                                        <h2>{nombre}</h2>
                                    </div>

                                    <div className="buttomDeleteDiv">
                                        <button id="DeleteButtom" type="button" onClick={() => borrarDato(id, nombre)}>
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
    
    else if (tipo === "platos") {
        // 🚨 CORRECCIÓN: Se añadió la sentencia 'return' aquí.
        const idKey = "idPlato";
        const folder = "Platos";
        
        return ( 
            <>
                <div>
                    <div className="div_title">
                        <h1>{tipo}</h1>
                    </div>
                    <div className="cards-container">
                        
                        {datos.map((dato) => {
                            const imagen = dato.imagen ? dato.imagen : "/default";
                            const id = dato[idKey];
                            const nombre = dato.nombre;

                            return (
                                <div className="card_delete" key={id}>
                                    <div className="card_image">
                                        {/* 🚨 CORRECCIÓN: Usamos la carpeta 'Platos' */}
                                        <img src={`/CrudImg/${folder}/${imagen}.png`} alt="imagenPlato" /> 
                                    </div>

                                    <div>
                                        <h2>{nombre}</h2>
                                    </div>

                                    <div className="buttomDeleteDiv">
                                        <button id="DeleteButtom" type="button" onClick={() => borrarDato(id, nombre)}>
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
    
    // Renderizado por defecto si 'tipo' no coincide
    return <div>Cargando datos o tipo de recurso no válido.</div>;
}

export default Eliminar;