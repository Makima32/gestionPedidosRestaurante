import { useEffect, useState } from "react";
import "../formularios.css";

function AgregarPlato() {
    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
    });

    // Ingredientes que vienen del backend
    const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);

    // Ingredientes que tendrá este plato
    const [ingredientesPlato, setIngredientesPlato] = useState([]);

    // Línea temporal para el select + cantidad
    const [lineaNueva, setLineaNueva] = useState({
        idIngrediente: "",
        cantidad: "",
    });

    // Cargar ingredientes al montar el componente
    useEffect(() => {
        const cargarIngredientes = async () => {
            try {
                const resp = await fetch("http://localhost:8080/ingredientes/listar");
                if (!resp.ok) throw new Error("Error al obtener ingredientes");
                const data = await resp.json();
                setIngredientesDisponibles(data);
            } catch (err) {
                console.error(err);
                alert("No se pudieron cargar los ingredientes");
            }
        };

        cargarIngredientes();
    }, []);

    // ================= VALIDACIONES =================
    const validarFormulario = () => {
        if (!plato.nombre.trim()) {
            alert("El nombre del plato es obligatorio");
            return false;
        }

        if (plato.nombre.trim().length < 3) {
            alert("El nombre debe tener al menos 3 caracteres");
            return false;
        }

        if (!plato.descripcion.trim()) {
            alert("La descripción es obligatoria");
            return false;
        }

        if (plato.descripcion.trim().length < 5) {
            alert("La descripción debe tener al menos 5 caracteres");
            return false;
        }

        // Precio obligatorio, puede ser decimal pero siempre > 0
        const precioNum = Number(plato.precio);
        if (!plato.precio || Number.isNaN(precioNum) || precioNum <= 0) {
            alert("El precio debe ser un número mayor que 0");
            return false;
        }

        // Imagen NO es obligatoria → no se valida

        // Al menos 1 ingrediente
        if (ingredientesPlato.length === 0) {
            alert("Debes añadir al menos un ingrediente al plato");
            return false;
        }

        // Comprobar cantidades > 0
        for (const linea of ingredientesPlato) {
            const cant = Number(linea.cantidad);
            if (Number.isNaN(cant) || cant <= 0) {
                alert(
                    `La cantidad del ingrediente "${linea.nombre}" debe ser mayor que 0`
                );
                return false;
            }
        }

        return true;
    };

    // ============ AÑADIR INGREDIENTE A LA LISTA ============
    const handleAñadirIngrediente = () => {
        if (!lineaNueva.idIngrediente) {
            alert("Selecciona un ingrediente");
            return;
        }

        const cant = Number(lineaNueva.cantidad);
        if (!lineaNueva.cantidad || Number.isNaN(cant) || cant <= 0) {
            alert("La cantidad debe ser mayor que 0");
            return;
        }

        const idNum = Number(lineaNueva.idIngrediente);

        // Evitar duplicados
        const yaExiste = ingredientesPlato.some(
            (i) => i.idIngrediente === idNum
        );
        if (yaExiste) {
            alert(
                "Ese ingrediente ya está añadido. Si quieres cambiar la cantidad, elimínalo y vuelve a añadirlo."
            );
            return;
        }

        const ing = ingredientesDisponibles.find(
            (i) => i.idIngrediente === idNum
        );

        if (!ing) {
            alert("Ingrediente no encontrado (error interno)");
            return;
        }

        const nuevaLinea = {
            idIngrediente: ing.idIngrediente,
            nombre: ing.nombre,
            cantidad: cant,
        };

        setIngredientesPlato((prev) => [...prev, nuevaLinea]);

        // Limpiar select y cantidad
        setLineaNueva({
            idIngrediente: "",
            cantidad: "",
        });
    };

    // ============ QUITAR INGREDIENTE DE LA LISTA ============
    const handleQuitarIngrediente = (idIngrediente) => {
        setIngredientesPlato((prev) =>
            prev.filter((i) => i.idIngrediente !== idIngrediente)
        );
    };

    // ============ CALCULAR ALÉRGENOS DEL PLATO ============
    const alergenosPlato = [];
    ingredientesPlato.forEach((linea) => {
        const ing = ingredientesDisponibles.find(
            (i) => i.idIngrediente === linea.idIngrediente
        );

        if (
            ing &&
            ing.alergenos &&
            ing.alergenos !== "" &&
            ing.alergenos !== "Ninguno" &&
            !alergenosPlato.includes(ing.alergenos)
        ) {
            alergenosPlato.push(ing.alergenos);
        }
    });

    // ============ SUBMIT ============
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        const platoAEnviar = {
            nombre: plato.nombre.trim(),
            descripcion: plato.descripcion.trim(),
            precio: Number(plato.precio),
            imagen: plato.imagen.trim(), // puede ir vacío
            ingredientes: ingredientesPlato.map((linea) => ({
                ingrediente: { idIngrediente: linea.idIngrediente },
                cantidad: linea.cantidad,
            })),
        };

        try {
            const resp = await fetch("http://localhost:8080/platos/crear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(platoAEnviar),
            });

            if (!resp.ok) {
                alert("Error al crear el plato");
                return;
            }

            alert(`Plato "${platoAEnviar.nombre}" creado correctamente`);
            console.log("Plato enviado:", platoAEnviar);

            // Limpiar formulario
            setPlato({
                nombre: "",
                descripcion: "",
                precio: "",
                imagen: "",
            });
            setIngredientesPlato([]);
            setLineaNueva({
                idIngrediente: "",
                cantidad: "",
            });
        } catch (err) {
            console.error("Error al crear plato:", err);
            alert("No se pudo conectar con el servidor.");
        }
    };

    // ============ JSX ============
    return (
        <div className="div_father">
            <h2>Formulario agregación Plato</h2>

            <div className="div_form">
                <form onSubmit={handleSubmit}>
                    {/* NOMBRE */}
                    <label htmlFor="nombre">Nombre del plato</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={plato.nombre}
                        onChange={(e) =>
                            setPlato({ ...plato, nombre: e.target.value })
                        }
                    />

                    {/* DESCRIPCIÓN */}
                    <label htmlFor="descripcion">Descripción del plato</label>
                    <input
                        id="descripcion"
                        type="text"
                        placeholder="Descripción"
                        value={plato.descripcion}
                        onChange={(e) =>
                            setPlato({ ...plato, descripcion: e.target.value })
                        }
                    />

                    {/* PRECIO */}
                    <label htmlFor="precio">Precio del plato</label>
                    <input
                        id="precio"
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="Precio"
                        value={plato.precio}
                        onChange={(e) =>
                            setPlato({ ...plato, precio: e.target.value })
                        }
                    />

                    {/* IMAGEN (OPCIONAL) */}
                    <label htmlFor="imagen">Imagen (opcional)</label>
                    <input
                        id="imagen"
                        type="text"
                        placeholder="Nombre de la imagen (sin .png)"
                        value={plato.imagen}
                        onChange={(e) =>
                            setPlato({ ...plato, imagen: e.target.value })
                        }
                    />

                    <hr />

                    {/* INGREDIENTES DEL PLATO */}
                    <h3>Ingredientes del plato</h3>

                    <div style={{ marginBottom: "1rem" }}>
                        <label htmlFor="ingredienteSelect">Ingrediente</label>
                        <select
                            id="ingredienteSelect"
                            value={lineaNueva.idIngrediente}
                            onChange={(e) =>
                                setLineaNueva({
                                    ...lineaNueva,
                                    idIngrediente: e.target.value,
                                })
                            }
                        >
                            <option value="">Selecciona ingrediente</option>
                            {ingredientesDisponibles.map((ing) => (
                                <option
                                    key={ing.idIngrediente}
                                    value={ing.idIngrediente}
                                >
                                    {ing.nombre}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="cantidad" style={{ marginLeft: "0.5rem" }}>
                            Cantidad
                        </label>
                        <input
                            id="cantidad"
                            type="number"
                            min="1"
                            placeholder="Cantidad"
                            value={lineaNueva.cantidad}
                            onChange={(e) =>
                                setLineaNueva({
                                    ...lineaNueva,
                                    cantidad: e.target.value,
                                })
                            }
                        />

                        <button
                            type="button"
                            onClick={handleAñadirIngrediente}
                            style={{ marginLeft: "0.5rem" }}
                        >
                            Añadir ingrediente
                        </button>
                    </div>

                    {/* LISTA DE INGREDIENTES AÑADIDOS */}
                    {ingredientesPlato.length > 0 ? (
                        <ul>
                            {ingredientesPlato.map((linea) => (
                                <li key={linea.idIngrediente}>
                                    {linea.nombre} – cantidad: {linea.cantidad}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuitarIngrediente(linea.idIngrediente)
                                        }
                                        style={{ marginLeft: "0.5rem" }}
                                    >
                                        Quitar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay ingredientes añadidos todavía.</p>
                    )}

                    {/* ALÉRGENOS DEL PLATO */}
                    <h3>Alérgenos del plato</h3>
                    {alergenosPlato.length > 0 ? (
                        <ul>
                            {alergenosPlato.map((a) => (
                                <li key={a}>{a}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Este plato no contiene alérgenos registrados.</p>
                    )}

                    <hr />

                    <button type="submit">Enviar plato</button>
                </form>
            </div>
        </div>
    );
}

export default AgregarPlato;
