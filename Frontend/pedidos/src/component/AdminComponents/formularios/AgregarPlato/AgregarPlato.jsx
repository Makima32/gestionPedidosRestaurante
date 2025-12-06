import { useState, useEffect } from "react";
import "../formularios.css";

function AgregarPlato() {
    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,  
        ingredientes: [], // { idIngrediente, nombre, cantidad } 
        imagen: "",
    });

    const [ingredientesApi, setIngredientesApi] = useState([]);
    const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState("");
    const [cantidadIngrediente, setCantidadIngrediente] = useState("");

    // Dos estados de errores: uno para el formulario principal y otro para el input de ingredientes
    const [errores, setErrores] = useState({});
    const [erroresIngrediente, setErroresIngrediente] = useState({}); 

    // Cargar ingredientes desde la API (se mantiene igual)
    useEffect(() => {
        const cargarIngredientes = async () => {
            try {
                const resp = await fetch("http://localhost:8080/ingredientes/listar");
                const data = await resp.json();
                setIngredientesApi(data);
            } catch (err) {
                console.error("Error al cargar ingredientes:", err);
            }
        };
        cargarIngredientes();
    }, []);

    // 1. Manejador de cambios para campos principales (limpia el error)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlato({ ...plato, [name]: value });

        // Limpiar el error cuando el usuario empieza a escribir
        if (errores[name]) {
            setErrores({ ...errores, [name]: undefined });
        }
    };
    
    // 2. Manejador para la selección de ingrediente (limpia error de ingrediente)
    const handleIngredienteSelect = (e) => {
        setIngredienteSeleccionado(e.target.value);
        setErroresIngrediente({ ...erroresIngrediente, idIngrediente: undefined });
    }

    // 3. Manejador para la cantidad de ingrediente (limpia error de cantidad)
    const handleCantidadChange = (e) => {
        setCantidadIngrediente(e.target.value);
        setErroresIngrediente({ ...erroresIngrediente, cantidad: undefined });
    }

    // ---------- VALIDACIÓN DEL FORMULARIO PRINCIPAL ----------
    const validarFormulario = () => {
        let erroresTemp = {};
        let esValido = true;

        // 1. Validar campos obligatorios
        if (!plato.nombre.trim()) {
            erroresTemp.nombre = "El nombre del plato es obligatorio.";
            esValido = false;
        }

        if (!plato.descripcion.trim()) {
            erroresTemp.descripcion = "La descripción del plato es obligatoria.";
            esValido = false;
        }

        // 2. Validar precio numérico y positivo
        const precioNum = Number(plato.precio);
        if (!plato.precio.toString().trim()) {
            erroresTemp.precio = "El precio es obligatorio.";
            esValido = false;
        } else if (isNaN(precioNum) || precioNum <= 0) {
            erroresTemp.precio = "El precio debe ser un número mayor que 0.";
            esValido = false;
        }

        // 3. Validar que haya al menos un ingrediente añadido
        if (plato.ingredientes.length === 0) {
            erroresTemp.ingredientes = "Debes añadir al menos un ingrediente al plato.";
            esValido = false;
        }

        setErrores(erroresTemp);
        return esValido;
    };

    // ---------- LÓGICA PARA AÑADIR INGREDIENTE A LA LISTA (CON VALIDACIÓN DE CANTIDAD) ----------
    const agregarIngredienteAlPlato = () => {
        let erroresIngTemp = {};
        let esIngredienteValido = true;
        const cantidadNum = Number(cantidadIngrediente);

        // Validar selección de ingrediente
        if (!ingredienteSeleccionado) {
            erroresIngTemp.idIngrediente = "Debes seleccionar un ingrediente.";
            esIngredienteValido = false;
        }

        // Validar cantidad (debe ser > 0 y numérica)
        if (!cantidadIngrediente.toString().trim()) {
            erroresIngTemp.cantidad = "La cantidad es obligatoria.";
            esIngredienteValido = false;
        } else if (isNaN(cantidadNum) || cantidadNum <= 0) {
            erroresIngTemp.cantidad = "La cantidad debe ser un número mayor que 0.";
            esIngredienteValido = false;
        }

        setErroresIngrediente(erroresIngTemp);

        if (!esIngredienteValido) return;

        // Verificar si ya existe (lógica anterior)
        const yaExiste = plato.ingredientes.some(ing => ing.idIngrediente === Number(ingredienteSeleccionado));
        if (yaExiste) {
            alert("Este ingrediente ya está añadido al plato.");
            return;
        }
        
        const ingObj = ingredientesApi.find(
            (i) => i.idIngrediente === Number(ingredienteSeleccionado)
        );

        setPlato((prev) => ({
            ...prev,
            ingredientes: [
                ...prev.ingredientes,
                {
                    idIngrediente: Number(ingredienteSeleccionado),
                    nombre: ingObj?.nombre, 
                    cantidad: cantidadNum, // Usamos el valor numérico validado
                },
            ],
        }));

        // Limpiar selección
        setIngredienteSeleccionado("");
        setCantidadIngrediente("");
        // Limpiar error de ingredientes principal (si se añadió uno con éxito)
        setErrores((prev) => ({ ...prev, ingredientes: undefined }));
    };
    
    // Función para eliminar un ingrediente (se mantiene igual)
    const eliminarIngredienteDePlato = (id) => {
        setPlato((prev) => ({
            ...prev,
            ingredientes: prev.ingredientes.filter(ing => ing.idIngrediente !== id)
        }));
    };

    // ---------- SUBMIT DEL FORM ----------
    const AñadirPlato = async (e) => {
        e.preventDefault();

        // Limpia cualquier error de ingrediente temporal antes de validar el formulario final
        setErroresIngrediente({}); 

        if (!validarFormulario()) {
            alert("Por favor, corrige los errores del formulario antes de enviar.");
            return;
        }
        
        // Mapear la lista de ingredientes al formato de Spring Boot (lógica anterior)
        const ingredientesMapeados = plato.ingredientes.map(ing => ({
            cantidad: ing.cantidad,
            ingrediente: {
                idIngrediente: ing.idIngrediente
            }
        }));

        const platoAEnviar = {
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: Number(plato.precio),
            imagen: plato.imagen,
            ingredientes: ingredientesMapeados, 
        };

        try {
            const resp = await fetch("http://localhost:8080/platos/crear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(platoAEnviar),
            });

            if (!resp.ok) {
                const errorText = await resp.text();
                throw new Error(`Error ${resp.status}: ${errorText || 'No se pudo crear el plato.'}`);
            }

            console.log("Plato enviado:", platoAEnviar);
            alert(platoAEnviar.nombre + " añadido correctamente");
            
            // Reiniciar el formulario
            setPlato({ nombre: "", descripcion: "", precio: 0, imagen: "", ingredientes: [] });
            setErrores({});
            
        } catch (err) {
            console.error("Fallo al crear plato:", err);
            alert("Error al crear el plato: " + err.message); 
        }
    };

    return (
        <div className="div_father">
            <h2>Formulario agregación Plato</h2>
            <div className="div_form">
                <form onSubmit={AñadirPlato}>
                    
                    {/* NOMBRE */}
                    <label>Nombre Plato</label>
                    <input
                        type="text"
                        name="nombre" 
                        placeholder="Nombre"
                        value={plato.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && <p className="error">{errores.nombre}</p>}

                    {/* DESCRIPCIÓN */}
                    <label>Descripción del Plato</label>
                    <input
                        type="text"
                        name="descripcion"
                        placeholder="Descripción"
                        value={plato.descripcion}
                        onChange={handleChange}
                    />
                    {errores.descripcion && (
                        <p className="error">{errores.descripcion}</p>
                    )}

                    {/* PRECIO */}
                    <label>Precio del Plato</label>
                    <input
                        type="number"
                        name="precio"
                        step="0.01"
                        min="0"
                        placeholder="Precio"
                        value={plato.precio}
                        onChange={handleChange}
                    />
                    {errores.precio && <p className="error">{errores.precio}</p>}

                    {/* IMAGEN */}
                    <label>Imagen del Plato</label>
                    <input
                        type="text"
                        name="imagen"
                        placeholder="Imagen"
                        value={plato.imagen}
                        onChange={handleChange}
                    />

                    {/* INGREDIENTES */}
                    <label>Añadir Ingredientes</label>
                    <div className="ingrediente-row">
                        {/* SELECT INGREDIENTE */}
                        <select
                            className="ingrediente-select"
                            value={ingredienteSeleccionado}
                            onChange={handleIngredienteSelect}
                        >
                            <option value="">-- Selecciona un ingrediente --</option>
                            {ingredientesApi.map((ing) => (
                                <option
                                    key={ing.idIngrediente}
                                    value={ing.idIngrediente}
                                >
                                    {ing.nombre}
                                </option>
                            ))}
                        </select>
                        {/* ERROR DE SELECT */}
                        {erroresIngrediente.idIngrediente && (
                            <p className="error">{erroresIngrediente.idIngrediente}</p>
                        )}


                        {/* INPUT CANTIDAD */}
                        <input
                            className="ingrediente-cantidad"
                            type="number"
                            step="1"
                            min="0" // Validacion visual en el navegador
                            placeholder="Cantidad"
                            value={cantidadIngrediente}
                            onChange={handleCantidadChange}
                        />
                        {/* ERROR DE CANTIDAD */}
                        {erroresIngrediente.cantidad && (
                            <p className="error">{erroresIngrediente.cantidad}</p>
                        )}


                        <button
                            type="button"
                            className="btn-add-ingrediente"
                            onClick={agregarIngredienteAlPlato}
                        >
                            Añadir
                        </button>
                    </div>

                    {/* ERROR DE LA LISTA COMPLETA */}
                    {errores.ingredientes && (
                        <p className="error">{errores.ingredientes}</p>
                    )}

                    {/* LISTA DE INGREDIENTES AÑADIDOS */}
                    {plato.ingredientes.length > 0 && (
                        <ul className="ingrediente-list">
                            {plato.ingredientes.map((ing) => (
                                <li key={ing.idIngrediente}>
                                    {ing.nombre} - {ing.cantidad}
                                    <button 
                                        type="button" 
                                        onClick={() => eliminarIngredienteDePlato(ing.idIngrediente)}
                                        style={{ marginLeft: '10px', background: 'red', color: 'white' }}
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    
                    <button type="submit" className="btn-submit">
                        Agregar Plato
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AgregarPlato;