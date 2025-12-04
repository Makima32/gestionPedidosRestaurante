import { useState, useEffect } from "react";
import "../formularios.css";

function AgregarPlato() {
    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        imagen: "",
        ingredientes: [], // { idIngrediente, nombre, cantidad }
    });

    const [ingredientesApi, setIngredientesApi] = useState([]);
    const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState("");
    const [cantidadIngrediente, setCantidadIngrediente] = useState("");
    const [errores, setErrores] = useState({});

    // Cargar ingredientes desde la API
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

    // ---------- VALIDACIÓN ----------
    const validarFormulario = () => {
        let erroresTemp = {};
        let esValido = true;

        // 1. Campos obligatorios
        if (!plato.nombre.trim()) {
            erroresTemp.nombre = "El nombre del plato es obligatorio.";
            esValido = false;
        }

        if (!plato.descripcion.trim()) {
            erroresTemp.descripcion = "La descripción del plato es obligatoria.";
            esValido = false;
        }

        if (!plato.precio.toString().trim()) {
            erroresTemp.precio = "El precio es obligatorio.";
            esValido = false;
        }

        // 2. Validar precio numérico positivo
        const precioNum = Number(plato.precio);
        if (isNaN(precioNum) || precioNum <= 0) {
            erroresTemp.precio = "El precio debe ser un número mayor que 0.";
            esValido = false;
        }

        // 3. Validar que haya al menos un ingrediente añadido
        if (plato.ingredientes.length === 0) {
            erroresTemp.ingredientes =
                "Debes añadir al menos un ingrediente al plato.";
            esValido = false;
        }

        setErrores(erroresTemp);
        return esValido;
    };

    // ---------- LÓGICA PARA AÑADIR INGREDIENTE A LA LISTA ----------
    const agregarIngredienteAlPlato = () => {
        if (!ingredienteSeleccionado || !cantidadIngrediente) return;

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
                    cantidad: Number(cantidadIngrediente),
                },
            ],
        }));

        // limpiar selección y posible error de ingredientes
        setIngredienteSeleccionado("");
        setCantidadIngrediente("");
        setErrores((prev) => ({ ...prev, ingredientes: undefined }));
    };

    // ---------- SUBMIT DEL FORM ----------
    const AñadirPlato = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            alert("Por favor, corrige los errores del formulario antes de enviar.");
            return;
        }

        const platoAEnviar = {
            ...plato,
            precio: Number(plato.precio),
        };

        try {
            const resp = await fetch("http://localhost:8080/platos/crear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(platoAEnviar),
            });

            if (!resp.ok) {
                throw new Error(`Error ${resp.status}: no se pudo crear el plato.`);
            }

            console.log("Plato enviado:", platoAEnviar);
            alert(platoAEnviar.nombre + " añadido correctamente");
        } catch (err) {
            console.error("Fallo al crear plato:", err);
            alert("Error al conectar con el servidor o al crear el plato.");
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
                        placeholder="Nombre"
                        value={plato.nombre}
                        onChange={(e) =>
                            setPlato({ ...plato, nombre: e.target.value })
                        }
                    />
                    {errores.nombre && <p className="error">{errores.nombre}</p>}

                    {/* DESCRIPCIÓN */}
                    <label>Descripción del Plato</label>
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={plato.descripcion}
                        onChange={(e) =>
                            setPlato({ ...plato, descripcion: e.target.value })
                        }
                    />
                    {errores.descripcion && (
                        <p className="error">{errores.descripcion}</p>
                    )}

                    {/* PRECIO */}
                    <label>Precio del Plato</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Precio"
                        value={plato.precio}
                        onChange={(e) =>
                            setPlato({ ...plato, precio: e.target.value })
                        }
                    />
                    {errores.precio && <p className="error">{errores.precio}</p>}

                    {/* INGREDIENTES */}
                    <label>Ingrediente del Plato</label>
                    <div className="ingrediente-row">
                        <select
                            className="ingrediente-select"
                            value={ingredienteSeleccionado}
                            onChange={(e) => setIngredienteSeleccionado(e.target.value)}
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

                        <input
                            className="ingrediente-cantidad"
                            type="number"
                            step="0.01"
                            placeholder="Cantidad"
                            value={cantidadIngrediente}
                            onChange={(e) => setCantidadIngrediente(e.target.value)}
                        />

                        <button
                            type="button"
                            className="btn-add-ingrediente"
                            onClick={agregarIngredienteAlPlato}
                        >
                            Añadir ingrediente
                        </button>
                    </div>
                    {errores.ingredientes && (
                        <p className="error">{errores.ingredientes}</p>
                    )}

                    {/* LISTA DE INGREDIENTES AÑADIDOS */}
                    {plato.ingredientes.length > 0 && (
                        <ul className="ingrediente-list">
                            {plato.ingredientes.map((ing, idx) => (
                                <li key={idx}>
                                    {ing.nombre} - {ing.cantidad}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* IMAGEN */}
                    <label>Imagen del Plato</label>
                    <input
                        type="text"
                        placeholder="Imagen"
                        value={plato.imagen}
                        onChange={(e) =>
                            setPlato({ ...plato, imagen: e.target.value })
                        }
                    />

                    <button type="submit" className="btn-submit">
                        Agregar Plato
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AgregarPlato;

