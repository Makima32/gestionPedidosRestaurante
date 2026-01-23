import { useEffect, useState } from "react";
import "./pedidos.css";
// Importamos la lógica externa
import { actualizarCarrito, calcularTotalItems } from "./carrito.js";
import Carrito from "./Carrito.jsx";

function Pedidos() {
  const [platos, setPlatos] = useState([]);
  const [isCarritoVisible, setIsCarritoVisible] = useState(false);
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch("http://localhost:8080/platos/listar")
      .then((res) => res.json())
      .then((data) => setPlatos(data))
      .catch((err) => console.error("Error cargando platos:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (plato) => {
    setCarrito((prevCarrito) => actualizarCarrito(prevCarrito, plato));
  };

  const toggleCarrito = () => {
    setIsCarritoVisible(!isCarritoVisible);
  };

  return (
    <div className="div_father_pedidos">
      <header className="pedidos_header">
        <h1 id="titulo">Hacer pedido</h1>
      </header>
      
      {!isCarritoVisible && ( // El boton solo se muestra si el carrito NO esta visible
        <button className="carrito_icon_button" onClick={toggleCarrito}>
          <span className="carrito_icon"><img src="/carrito.png" alt="carrito"/></span>
          <span className="carrito_counter">{calcularTotalItems(carrito)}</span>
        </button>
      )}

      <div className="div_content_pedidos">
        {platos.map((plato) => (
          <div key={plato.idPlato} className="plato_card">
            <div className="plato_info">
              <div className="img_container">
                <img src={`public/CrudImg/Platos/${plato.imagen}.png`} alt={plato.nombre} />
                <button className="btn_add_overlay" onClick={() => agregarAlCarrito(plato)}>
                  +
                </button>
              </div>
              
              <h3>{plato.nombre}</h3>
              <p>{plato.descripcion}</p>
              <span>{plato.precio}€</span>
              
              <div className="div_content_button">
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Carrito 
        carrito={carrito}
        setCarrito={setCarrito}
        isVisible={isCarritoVisible}
        onClose={toggleCarrito}
      />
    </div>
  );

}

export default Pedidos;

//