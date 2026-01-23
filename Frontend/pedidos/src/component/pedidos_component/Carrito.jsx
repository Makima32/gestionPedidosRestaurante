import React from 'react';
import './Carrito.css';
import { eliminarPlatoDelCarrito, cambiarCantidad } from './carrito.js'; 

const Carrito = ({ carrito, setCarrito, isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  const handleEliminar = (platoId) => {
    setCarrito(prev => eliminarPlatoDelCarrito(prev, platoId));
  };

  const handleCantidadChange = (platoId, cantidad) => {
    console.log("handleCantidadChange llamado:", { platoId, cantidad, carritoPrevio: carrito }); // LOG DEPURACION
    if (cantidad < 1) {
      handleEliminar(platoId);
    } else {
      setCarrito(prev => cambiarCantidad(prev, platoId, cantidad));
    }
  };
  
  const calcularSubtotal = (item) => {
      return (item.precio * item.cantidad).toFixed(2);
  }

  const calcularTotalGeneral = () => {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2);
  };

  return (
    <div className="carrito-overlay" onClick={onClose}>
      <div className="carrito-sidebar" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="carrito-close-btn">&times;</button>
        <h2>Mi Carrito</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            <div className="carrito-items">
              {carrito.map(item => (
                <div key={item.idPlato} className="carrito-item">
                  <img src={`/CrudImg/Platos/${item.imagen}.png`} alt={item.nombre} />
                  <div className="item-details">
                    <p className='item-nombre'>{item.nombre}</p>
                    <div className="item-quantity">
                      <button onClick={() => handleCantidadChange(item.idPlato, item.cantidad - 1)}>-</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => handleCantidadChange(item.idPlato, item.cantidad + 1)}>+</button>
                    </div>
                  </div>
                   <div className="item-price">
                       <p>{calcularSubtotal(item)}€</p>
                       <button onClick={() => handleEliminar(item.idPlato)} className="item-remove-btn">Eliminar</button>
                   </div>
                </div>
              ))}
            </div>
            <div className="carrito-total">
              <h3>Total: {calcularTotalGeneral()}€</h3>
              <button className="finalizar-compra-btn" onClick={onClose}>
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;
