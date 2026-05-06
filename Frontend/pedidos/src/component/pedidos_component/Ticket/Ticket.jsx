import { useLocation, Navigate, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js"; 
import "./Ticket.css";

function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();

  const datosTicket = location.state;

  if (!datosTicket) {
    return <Navigate to="/" replace />;
  }

  const { carrito, total, pedido, direccion } = datosTicket;

  const formatearFechaHora = (fechaDb) => {
    const fecha = fechaDb ? new Date(fechaDb) : new Date();
    return fecha.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDescargarPDF = () => {
    const elemento = document.getElementById("ticket-descargable");
    
    const opciones = {
      margin:       10,
      filename:     `Factura_Pedido_${pedido.idPedido}.pdf`,
      image:        { type: "jpeg", quality: 1 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opciones).from(elemento).save();
  };

  return (
    <div className="ticket-page-container">
      <div className="ticket-wrapper">
        
        <div id="ticket-descargable" style={{ padding: "20px", backgroundColor: "white" }}>
          <div className="ticket-header">
            <h2>¡Pedido Confirmado!</h2>
            <p>Gracias por tu compra</p>
          </div>

          <div className="ticket-body">
            <div className="ticket-info">
              <p><strong>Nº de Pedido:</strong> #{pedido.idPedido}</p>
              <p><strong>Fecha y Hora:</strong> {formatearFechaHora(pedido.fechaPedido)}</p>
              <p><strong>Entrega en:</strong> {direccion}</p>
            </div>

            <div className="ticket-items">
              <h3>Detalle del pedido</h3>
              <ul>
                {carrito.map((item, index) => (
                  <li key={index} className="ticket-item">
                    <span>{item.cantidad}x {item.nombre}</span>
                    <span>{(item.precio * item.cantidad).toFixed(2)} €</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ticket-total">
              <h3>TOTAL PAGADO:</h3>
              <h3>{total.toFixed(2)} €</h3>
            </div>
          </div>
        </div>

        <div className="ticket-actions no-print">
          <button className="btn-descargar" onClick={handleDescargarPDF}>
            Descargar Factura (PDF)
          </button>
          <button className="btn-volver" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ticket;