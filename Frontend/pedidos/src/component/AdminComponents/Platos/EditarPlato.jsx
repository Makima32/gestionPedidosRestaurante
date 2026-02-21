import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../common/Formularios.css"; 
import { SERVER } from "../../../utils/assets";

function ModificarPlato() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
        ingredientes: [], 
    });

    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlato({ ...plato, [name]: value });
        if (errores[name]) {
            setErrores({ ...errores, [name]: undefined });
        }
    };
    
 
    useEffect(() => {
        const cargarDatos = async () => {
            if (!id) {
                setCargando(false);
                return;
            }
            try {
                const resPlato = await fetch(`${SERVER}/platos/${id}`);
                if (!resPlato.ok) throw new Error("Error al cargar el plato");
                const dataPlato = await resPlato.json();

                setPlato({
                    nombre: dataPlato.nombre || "",
                    descripcion: dataPlato.descripcion || "",
                    precio: dataPlato.precio != null ? String(dataPlato.precio) : "",
                    imagen: dataPlato.imagen || "",
                    ingredientes: dataPlato.ingredientes || [], 
                });
            } catch (error) {
                console.error(error);
                alert("No se pudo cargar los datos del plato: " + error.message);
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [id]);
    
   
    const validarFormulario = () => {
        let erroresTemp = {};
        let esValido = true;

        if (!plato.nombre.trim()) {
            erroresTemp.nombre = "El nombre es obligatorio.";
            esValido = false;
        }
        if (!plato.descripcion.trim()) {
            erroresTemp.descripcion = "La descripción es obligatoria.";
            esValido = false;
        }

        const precioNum = Number(plato.precio);
        if (!plato.precio.toString().trim()) {
            erroresTemp.precio = "El precio es obligatorio.";
            esValido = false;
        } else if (isNaN(precioNum) || precioNum <= 0) {
            erroresTemp.precio = "El precio debe ser un número mayor que 0.";
            esValido = false;
        }


        setErrores(erroresTemp);
        return esValido;
    };


    const manejarSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            alert("Por favor, corrige los errores del formulario antes de enviar.");
            return;
        }
        
        
        const platoAEnviar = {
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: Number(plato.precio),
            imagen: plato.imagen.trim() || null,
            ingredientes: plato.ingredientes, 
        };

        try {
            const res = await fetch(`${SERVER}/platos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(platoAEnviar),
            });

            if (!res.ok) {
                 const errorText = await res.text();
                 throw new Error(`Error ${res.status}: ${errorText || 'No se pudo actualizar el plato.'}`);
            }

            alert("Plato actualizado correctamente");
            navigate("/adminPlatos"); 
        } catch (error) {
            console.error("Fallo al actualizar plato:", error);
            alert("Error al actualizar el plato: " + error.message);
        }    };

    if (cargando) {
        return <p>Cargando plato...</p>;
    }
    
    if (!id) {
        return <p>Error: No se ha proporcionado un ID de plato para modificar.</p>;
    }

    return (
        <div className="div_father">
            <h2>Formulario Modificación Plato</h2>

            <div className="div_form">
                <form onSubmit={manejarSubmit}>
                    
                    <label htmlFor="nombre">Nombre Plato</label>
                    <input name="nombre" type="text" placeholder="Nombre" value={plato.nombre} onChange={handleChange} />
                    {errores.nombre && <p className="error">{errores.nombre}</p>}

                    <label htmlFor="descripcion">Descripción del Plato</label>
                    <input name="descripcion" type="text" placeholder="Descripción" value={plato.descripcion} onChange={handleChange} />
                    {errores.descripcion && <p className="error">{errores.descripcion}</p>}

                    <label htmlFor="precio">Precio del Plato</label>
                    <input name="precio" type="number" step="0.01" min="0.01" placeholder="Precio" value={plato.precio} onChange={handleChange} />
                    {errores.precio && <p className="error">{errores.precio}</p>}

                    <label htmlFor="imagen">Imagen del Plato (opcional)</label>
                    <input name="imagen" type="text" placeholder="Imagen" value={plato.imagen} onChange={handleChange} />


                    <button type="submit" className="btn-submit">
                        Guardar cambios del Plato
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModificarPlato;