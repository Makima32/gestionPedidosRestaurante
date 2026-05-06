import { useState, useEffect } from "react";
import { useAuth } from "../../../hook/auth/authContext";
import "./PedidosEnCurso.css";

function PedidosEnCurso() {
  const [pedidosPendientes, setPedidosPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPedidos = async () => {
    try {
      const token = user?.token;
      if (!token) return;

      const response = await fetch("http://localhost:8080/pedidos", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Error al obtener los pedidos");

      const data = await response.json();
      
      const pendientes = data.filter(pedido => pedido.estado === "pendiente");
      
      pendientes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      setPedidosPendientes(pendientes);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
    
    const intervalo = setInterval(fetchPedidos, 30000);
    return () => clearInterval(intervalo);
  }, [user]);

  const marcarComoListo = async (pedidoEntero) => {
    try {
      const token = user?.token;
      
      const pedidoActualizado = {
        ...pedidoEntero,
        estado: "preparado"
      };

      const response = await fetch(`http://localhost:8080/pedidos/${pedidoEntero.idPedido}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pedidoActualizado)
      });

      if (!response.ok) throw new Error("Error al actualizar el pedido");

      setPedidosPendientes((prevPedidos) => 
        prevPedidos.filter(p => p.idPedido !== pedidoEntero.idPedido)
      );

    } catch (error) {
      console.error("Error al completar:", error);
      alert("Hubo un problema al marcar el pedido como listo.");
    }
  };

  const formatearHora = (fechaDb) => {
    const fecha = new Date(fechaDb);
    return fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando cocina...</h2>;

  return (
    <div className="kds-wrapper">
      <h1 className="kds-header">Panel de Cocina </h1>
      
      {pedidosPendientes.length === 0 ? (
        <h2 style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
           No hay pedidos pendientes.
        </h2>
      ) : (
        <div className="kds-grid">
          {pedidosPendientes.map((pedido) => (
            <div className="kds-card" key={pedido.idPedido}>
              
              <div className="kds-card-header">
                <span className="kds-id">#{pedido.idPedido}</span>
                <span>⏱️ {formatearHora(pedido.fecha)}</span>
                <span className="kds-tipo">{pedido.tipoPedido}</span>
              </div>

              <div className="kds-card-body">
                {pedido.detalles && pedido.detalles.length > 0 ? (
                  pedido.detalles.map((detalle, index) => (
                    <div className="kds-plato-item" key={index}>
                      <span>
                        <span className="kds-cantidad">{detalle.cantidad}x</span>
                        {detalle.plato?.nombre || "Plato desconocido"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "red", textAlign: "center" }}>Sin detalles de platos</p>
                )}
              </div>

              <div className="kds-card-footer">
                <button 
                  className="btn-listo" 
                  onClick={() => marcarComoListo(pedido)}
                >
                  LISTO
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PedidosEnCurso;