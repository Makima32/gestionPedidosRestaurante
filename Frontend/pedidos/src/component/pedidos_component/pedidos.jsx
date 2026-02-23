import { useEffect, useState } from "react";
import "./pedidos.css";
import { actualizarCarrito, calcularTotalItems } from "./carrito.js";
import Carrito from "./Carrito.jsx";
import { IMAGENES } from "../../utils/assets.js"; 
import { BlinkBlur } from "react-loading-indicators";

import { useApi } from "../../hook/useApi/useApi.jsx"; 
import { obtenerPlatos } from "../../service/api.js"; 

function Pedidos() {
  const { datos: platos, loading, ejecutarFetch } = useApi();
  
  const [isCarritoVisible, setIsCarritoVisible] = useState(false);
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    ejecutarFetch(obtenerPlatos);
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

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '20px' 
      }}>
        <BlinkBlur color="#AC7E2F" size="large" text="Cargando menú..." textColor="#AC7E2F" />
      </div>
    );
  }

  // 5. si conecta al backend 
  return (
    <div className="div_father_pedidos">
      <header className="pedidos_header">
        <h1 id="titulo">Hacer pedido</h1>
      </header>
      
      {!isCarritoVisible && (
        <button className="carrito_icon_button" onClick={toggleCarrito}>
          <span className="carrito_icon"><img src={IMAGENES.carritoIco} alt="carrito"/></span>
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