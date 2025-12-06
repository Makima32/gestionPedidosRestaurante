import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./modificarIngrediente.css"; // Usa la ruta correcta de tu CSS

function ModificarPlato() {
    const { id } = useParams(); // 👈 Captura el ID del plato
    const navigate = useNavigate();

    // Estado principal del plato. NOTA: 'ingredientes' se conserva para el PUT.
    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
        ingredientes: [], // 👈 Mantenemos la lista original de ingredientes
    });

    // Estados de errores
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(true);

    // Función centralizada para manejar cambios y limpiar errores del formulario principal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlato({ ...plato, [name]: value });
        if (errores[name]) {
            setErrores({ ...errores, [name]: undefined });
        }
    };
    
    // ==========================================================
    // ========== CARGAR DATOS INICIALES (Solo Plato) ==========
    // ==========================================================
    useEffect(() => {
        const cargarDatos = async () => {
            if (!id) {
                setCargando(false);
                return;
            }
            try {
                // 1. Cargar el plato
                const resPlato = await fetch(`http://localhost:8080/platos/${id}`);
                if (!resPlato.ok) throw new Error("Error al cargar el plato");
                const dataPlato = await resPlato.json();

                // Llenar el estado del plato
                // NOTA: Se carga 'ingredientes' tal como viene de la API (formato JPA)
                setPlato({
                    nombre: dataPlato.nombre || "",
                    descripcion: dataPlato.descripcion || "",
                    precio: dataPlato.precio != null ? String(dataPlato.precio) : "",
                    imagen: dataPlato.imagen || "",
                    ingredientes: dataPlato.ingredientes || [], // GUARDAMOS LOS INGREDIENTES ORIGINALES
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
    
    // ==========================================================
    // ========== VALIDACIÓN Y SUBMIT FINAL ==========
    // ==========================================================

    // Validación del formulario principal (SOLO CAMPOS BÁSICOS)
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

        // Ya no validamos si hay ingredientes

        setErrores(erroresTemp);
        return esValido;
    };


    // ENVIAR FORMULARIO (PUT)
    const manejarSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            alert("Por favor, corrige los errores del formulario antes de enviar.");
            return;
        }
        
        // El objeto plato.ingredientes YA ESTÁ EN EL FORMATO CORRECTO (formato JPA)
        // porque se cargó así en el useEffect y nunca fue modificado por el usuario.
        const platoAEnviar = {
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: Number(plato.precio),
            imagen: plato.imagen.trim() || null,
            // Enviamos la lista de ingredientes sin cambios
            ingredientes: plato.ingredientes, 
        };

        try {
            // Llama a la API con el método PUT y el ID del plato para actualizar
            const res = await fetch(`http://localhost:8080/platos/actualizar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(platoAEnviar),
            });

            if (!res.ok) {
                 const errorText = await res.text();
                 throw new Error(`Error ${res.status}: ${errorText || 'No se pudo actualizar el plato.'}`);
            }

            alert("Plato actualizado correctamente");
            // Redirige al listado de administración de platos
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
                    
                    {/* CAMPOS PRINCIPALES */}
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

                    {/* <--- SECCIÓN DE INGREDIENTES ELIMINADA ---> */}

                    <button type="submit" className="btn-submit">
                        Guardar cambios del Plato
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModificarPlato;