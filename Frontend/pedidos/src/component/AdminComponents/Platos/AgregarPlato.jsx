import { useState, useEffect } from "react";
import "../common/Formularios.css";
import { SERVER } from "../../../utils/assets";

function AgregarPlato() {
    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        ingredientes: [], 
        imagen: "",
    });

    const [ingredientesApi, setIngredientesApi] = useState([]);
    const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState("");
    const [cantidadIngrediente, setCantidadIngrediente] = useState("");

    const [errores, setErrores] = useState({});
    const [erroresIngrediente, setErroresIngrediente] = useState({}); 

    useEffect(() => {
        const cargarIngredientes = async () => {
            try {
                
                const resp = await fetch(`${SERVER}/ingredientes`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await resp.json();
                setIngredientesApi(data);
            } catch (err) {
                console.error("Error al cargar ingredientes:", err);
            }
        };
        cargarIngredientes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlato({ ...plato, [name]: value });

        if (errores[name]) {
            setErrores({ ...errores, [name]: undefined });
        }
    };
    
    const handleIngredienteSelect = (e) => {
        setIngredienteSeleccionado(e.target.value);
        setErroresIngrediente({ ...erroresIngrediente, idIngrediente: undefined });
    }

    const handleCantidadChange = (e) => {
        setCantidadIngrediente(e.target.value);
        setErroresIngrediente({ ...erroresIngrediente, cantidad: undefined });
    }

    const validarFormulario = () => {
        let erroresTemp = {};
        let esValido = true;

        if (!plato.nombre.trim()) {
            erroresTemp.nombre = "El nombre del plato es obligatorio.";
            esValido = false;
        }

        if (!plato.descripcion.trim()) {
            erroresTemp.descripcion = "La descripción del plato es obligatoria.";
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

        if (plato.ingredientes.length === 0) {
            erroresTemp.ingredientes = "Debes añadir al menos un ingrediente al plato.";
            esValido = false;
        }

        setErrores(erroresTemp);
        return esValido;
    };

    const agregarIngredienteAlPlato = () => {
        let erroresIngTemp = {};
        let esIngredienteValido = true;
        const cantidadNum = Number(cantidadIngrediente);

        if (!ingredienteSeleccionado) {
            erroresIngTemp.idIngrediente = "Debes seleccionar un ingrediente.";
            esIngredienteValido = false;
        }

        if (!cantidadIngrediente.toString().trim()) {
            erroresIngTemp.cantidad = "La cantidad es obligatoria.";
            esIngredienteValido = false;
        } else if (isNaN(cantidadNum) || cantidadNum <= 0) {
            erroresIngTemp.cantidad = "La cantidad debe ser un número mayor que 0.";
            esIngredienteValido = false;
        }

        setErroresIngrediente(erroresIngTemp);

        if (!esIngredienteValido) return;

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
                    cantidad: cantidadNum, 
                },
            ],
        }));

        setIngredienteSeleccionado("");
        setCantidadIngrediente("");
        setErrores((prev) => ({ ...prev, ingredientes: undefined }));
    };
    
    const eliminarIngredienteDePlato = (id) => {
        setPlato((prev) => ({
            ...prev,
            ingredientes: prev.ingredientes.filter(ing => ing.idIngrediente !== id)
        }));
    };

    const AñadirPlato = async (e) => {
        e.preventDefault();

        setErroresIngrediente({}); 

        if (!validarFormulario()) {
            alert("Por favor, corrige los errores del formulario antes de enviar.");
            return;
        }
        
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
            const resp = await fetch(`${SERVER}/platos`, {
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
                    
                    <label>Nombre Plato</label>
                    <input
                        type="text"
                        name="nombre" 
                        placeholder="Nombre"
                        value={plato.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && <p className="error">{errores.nombre}</p>}

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

                    <label>Imagen del Plato</label>
                    <input
                        type="text"
                        name="imagen"
                        placeholder="Imagen"
                        value={plato.imagen}
                        onChange={handleChange}
                    />

                    <label>Añadir Ingredientes</label>
                    <div className="ingrediente-row">
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
                        {erroresIngrediente.idIngrediente && (
                            <p className="error">{erroresIngrediente.idIngrediente}</p>
                        )}


                        <input
                            className="ingrediente-cantidad"
                            type="number"
                            step="1"
                            min="0" 
                            placeholder="Cantidad"
                            value={cantidadIngrediente}
                            onChange={handleCantidadChange}
                        />
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

                    {errores.ingredientes && (
                        <p className="error">{errores.ingredientes}</p>
                    )}

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
