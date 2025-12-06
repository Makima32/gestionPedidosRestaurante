import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../formularios.css"; // mismo CSS que el formulario de crear

function ModificarPlato() {
    const { id } = useParams();          // id del plato desde la URL
    const navigate = useNavigate();

    const [plato, setPlato] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
    });

    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(true);

    // ========== CARGAR PLATO AL ENTRAR ==========
    useEffect(() => {
        const cargarPlato = async () => {
            try {
                const res = await fetch(`http://localhost:8080/platos/${id}`);
                if (!res.ok) throw new Error("Error al cargar el plato");

                const data = await res.json();

                setPlato({
                    nombre: data.nombre || "",
                    descripcion: data.descripcion || "",
                    precio: data.precio != null ? String(data.precio) : "",
                    imagen: data.imagen || "",
                });
            } catch (error) {
                console.error(error);
                alert("No se pudo cargar el plato");
            } finally {
                setCargando(false);
            }
        };

        cargarPlato();
    }, [id]);

    // ========== VALIDACIÓN ==========
    const validar = () => {
        const errs = {};

        if (!plato.nombre.trim()) {
            errs.nombre = "El nombre es obligatorio.";
        }

        if (!plato.descripcion.trim()) {
            errs.descripcion = "La descripción es obligatoria.";
        }

        if (!plato.precio.toString().trim()) {
            errs.precio = "El precio es obligatorio.";
        } else {
            const precioNum = Number(plato.precio);
            if (isNaN(precioNum)) {
                errs.precio = "El precio debe ser un número.";
            } else if (precioNum <= 0) {
                errs.precio = "El precio debe ser mayor que 0.";
            }
        }

        // imagen es opcional -> no se valida

        setErrores(errs);
        return Object.keys(errs).length === 0;
    };

    // ========== ENVIAR FORMULARIO ==========
    const manejarSubmit = async (e) => {
        e.preventDefault();

        if (!validar()) {
            alert("Por favor, corrige los errores del formulario.");
            return;
        }

        const platoFinal = {
            nombre: plato.nombre.trim(),
            descripcion: plato.descripcion.trim(),
            precio: Number(plato.precio),
            imagen: plato.imagen.trim() || null,
        };

        try {
            const res = await fetch(`http://localhost:8080/platos/actualizar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(platoFinal),
            });

            if (!res.ok) throw new Error("Error al actualizar el plato");

            alert("Plato actualizado correctamente");
            // redirige donde te interese:
            navigate("/adminPlatos");
        } catch (error) {
            console.error(error);
            alert("No se pudo actualizar el plato.");
        }
    };

    if (cargando) {
        return <p style={{ textAlign: "center", marginTop: "40px" }}>Cargando plato...</p>;
    }

    return (
        <div className="div_father">
            <h2>Formulario modificación Plato</h2>

            <div className="div_form">
                <form onSubmit={manejarSubmit}>
                    {/* NOMBRE */}
                    <label htmlFor="nombre">Nombre del plato</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={plato.nombre}
                        onChange={(e) => setPlato({ ...plato, nombre: e.target.value })}
                    />
                    {errores.nombre && <p className="error">{errores.nombre}</p>}

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
                    {errores.descripcion && (
                        <p className="error">{errores.descripcion}</p>
                    )}

                    {/* PRECIO */}
                    <label htmlFor="precio">Precio del plato</label>
                    <input
                        id="precio"
                        type="text"
                        placeholder="Precio (usar punto)"
                        value={plato.precio}
                        onChange={(e) => setPlato({ ...plato, precio: e.target.value })}
                    />
                    {errores.precio && <p className="error">{errores.precio}</p>}

                    {/* IMAGEN OPCIONAL */}
                    <label htmlFor="imagen">Imagen (opcional)</label>
                    <input
                        id="imagen"
                        type="text"
                        placeholder="Nombre de la imagen (sin .png)"
                        value={plato.imagen}
                        onChange={(e) => setPlato({ ...plato, imagen: e.target.value })}
                    />

                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
        </div>
    );
}

export default ModificarPlato;
