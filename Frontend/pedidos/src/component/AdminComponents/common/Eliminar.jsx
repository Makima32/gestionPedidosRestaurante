import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./eliminar.css"; 
import { IMAGENES, SERVER } from "../../../utils/assets";

function Eliminar() {
    const { tipo } = useParams();
    const [datos, setDatos] = useState([]);
    const [errorBackend, setErrorBackend] = useState(false);

    const recursoSingular = tipo === "ingredientes" ? "ingrediente" : tipo === "platos" ? "plato" : "recurso";

    function fetchDatos() {
        setErrorBackend(false); 
        fetch(`${SERVER}/${tipo}`) 
            .then((response) => {
                if (!response.ok) throw new Error("Error en la respuesta del servidor (HTTP code)");
                return response.json(); 
            })
            .then((data) => {
                console.log("Datos recibidos:", data);
                setDatos(data); 
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                setErrorBackend(true); 
            });
    }

    useEffect(() => {
        fetchDatos();
    }, [tipo]); 
    
    function borrarDato(id) {
        
        fetch(`${SERVER}/${tipo}/${id}`, {
            method: "DELETE",
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage || `Error al eliminar ${recursoSingular} (Status: ${response.status})`);
                });
            }
            
            return response.text(); 
        })
        .then(successMessage => {
            alert(successMessage.trim()); 
            fetchDatos(); 
        })
        .catch(error => {
            console.error("Error al borrar:", error);
            alert(`Fallo en la operación: ${error.message}`); 
        });
    }

    if (errorBackend) {
        return (
            <div className="error-screen-center"> 
                <div className="error-message-box">
                    <span className="error-code">❌</span>
                    <h1>¡Conexión Fallida!</h1>
                    <p>No se pudo establecer conexión con el backend.</p>
                    <button 
                        className="reload-button-inline"
                        onClick={() => window.location.reload()}
                    >
                        Intentar Recargar
                    </button>
                </div>
            </div>
        );
    }

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
                            const imagen = dato.imagen ? dato.imagen : "default";
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
                                        <button id="DeleteButtom" type="button" onClick={() => borrarDato(id)}>
                                            <img src={IMAGENES.DeleteButton} alt="" />
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
                            const imagen = dato.imagen ? dato.imagen : "default";
                            const id = dato[idKey];
                            const nombre = dato.nombre;

                            return (
                                <div className="card_delete" key={id}>
                                    <div className="card_image">
                                        <img src={`/CrudImg/${folder}/${imagen}.png`} alt="imagenPlato" /> 
                                    </div>

                                    <div>
                                        <h2>{nombre}</h2>
                                    </div>

                                    <div className="buttomDeleteDiv">
                                        <button id="DeleteButtom" type="button" onClick={() => borrarDato(id)}>
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
    
    return <div>Cargando datos o tipo de recurso no válido.</div>;
}

export default Eliminar;