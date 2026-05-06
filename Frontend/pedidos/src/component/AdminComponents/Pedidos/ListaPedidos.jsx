import { useState, useEffect } from "react";
import { useAuth } from "../../../hook/auth/authcontext"; 

function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = user?.token;
        if (!token) throw new Error("No hay token de administrador");

        const response = await fetch("http://localhost:8080/pedidos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Error al obtener los pedidos del servidor");

        const data = await response.json();
        
        // Ordenamos del más reciente al más antiguo
        const pedidosOrdenados = data.sort((a, b) => b.idPedido - a.idPedido);
        
        setPedidos(pedidosOrdenados);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [user]);

  const formatearFecha = (fechaDb) => {
    if (!fechaDb) return "---";
    const fecha = new Date(fechaDb);
    return fecha.toLocaleString("es-ES", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Cargando pedidos...</h2>;

  return (
    <div className="listar-container" style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto", marginTop: "20px" }}>
      
      {pedidos.length === 0 ? (
        <p style={{ textAlign: "center" }}>No hay pedidos registrados en el sistema.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", borderRadius: "8px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "#AC7E2F", color: "white", textAlign: "left" }}>
              <th style={{ padding: "15px" }}>ID</th>
              <th style={{ padding: "15px" }}>Fecha</th>
              <th style={{ padding: "15px" }}>Tipo</th>
              <th style={{ padding: "15px" }}>Estado</th> {/* NUEVA COLUMNA ESTADO */}
              <th style={{ padding: "15px" }}>Estado Pago</th>
              <th style={{ padding: "15px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.idPedido} style={{ borderBottom: "1px solid #eee", transition: "background-color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                <td style={{ padding: "15px", fontWeight: "bold" }}>#{pedido.idPedido}</td>
                
                {/* AQUÍ ESTABA EL ERROR: Cambiado a pedido.fecha */}
                <td style={{ padding: "15px" }}>{formatearFecha(pedido.fecha)}</td>
                
                <td style={{ padding: "15px", textTransform: "capitalize" }}>{pedido.tipoPedido}</td>
                
                {/* NUEVO: ESTADO DEL PEDIDO (Preparando/Pendiente) */}
                <td style={{ padding: "15px" }}>
                  <span style={{ 
                    backgroundColor: pedido.estado === 'pendiente' ? '#fff3e0' : '#e3f2fd', 
                    color: pedido.estado === 'pendiente' ? '#e65100' : '#1565c0',
                    padding: "6px 10px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "bold", textTransform: "capitalize"
                  }}>
                    {pedido.estado || 'pendiente'}
                  </span>
                </td>

                <td style={{ padding: "15px" }}>
                  <span style={{ 
                    backgroundColor: pedido.estadoPago === 'pagado' ? '#e8f5e9' : '#ffebee', 
                    color: pedido.estadoPago === 'pagado' ? '#2e7d32' : '#c62828',
                    padding: "6px 10px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "bold", textTransform: "capitalize"
                  }}>
                    {pedido.estadoPago}
                  </span>
                </td>
                
                <td style={{ padding: "15px", fontWeight: "bold", color: "#AC7E2F", fontSize: "1.1rem" }}>
                  {pedido.total.toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListarPedidos;