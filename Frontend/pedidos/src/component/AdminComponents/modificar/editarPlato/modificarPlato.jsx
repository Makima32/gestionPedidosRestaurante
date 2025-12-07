import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../formularios/formularios.css"; 

function ModificarPlato() {
    const [platos, setPlatos] = useState([]);
    const navigate = useNavigate();
    const [errorBackend, setErrorBackend] = useState(false); 

    function fetchPlatos() {
        setErrorBackend(false); 

        fetch("http://localhost:8080/platos/listar")
            .then((response) => {
                if (!response.ok) throw new Error("Error en la respuesta del servidor (HTTP code)");
                return response.json();
            })
            .then((data) => {
                console.log("Platos recibidos:", data);
                setPlatos(data);
            })
            .catch((error) => {
                console.error("Error al obtener los platos:", error);
                setErrorBackend(true);
            });
    }

    useEffect(() => {
        fetchPlatos();
    }, []);

    const handleEdit = (idPlato) => {
        navigate(`/modificar/plato/${idPlato}`);
    };
    
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

    return (
        <div>
            <div className="div_title">
                <h1>Platos</h1>
            </div>

            <div className="cards-container">
                {platos.map((plato) => {
                    const imagen = plato.imagen ? plato.imagen : "default";

                    return (
                        <div className="card" key={plato.idPlato}>
                            <div className="card_image">
                                <img
                                    src={`/CrudImg/Platos/${imagen}.png`}
                                    alt={`Imagen del plato ${plato.nombre}`}
                                />
                            </div>

                            <div className="div_content">
                                <h2>{plato.nombre}</h2>
                                <p><strong>Descripción:</strong> {plato.descripcion}</p>
                                <p><strong>Precio:</strong> {plato.precio} €</p>

                                <p><strong>Ingredientes:</strong></p>
                                <p>
                                    {plato.ingredientes?.length
                                        ? plato.ingredientes
                                            .map(rel => `${rel.cantidad}x ${rel.ingrediente.nombre}`)
                                            .join(", ")
                                        : "Sin ingredientes"}
                                </p>
                            </div>

                            <div className="buttonEditDiv">
                                <button
                                    id="editbutton"
                                    onClick={() => handleEdit(plato.idPlato)}
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

export default ModificarPlato;