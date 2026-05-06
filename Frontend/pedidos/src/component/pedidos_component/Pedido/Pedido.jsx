import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../../hook/auth/authcontext"; 
import "./Pedido.css";

function Pedido() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); 

  const tipoPedido = location.state?.tipo;

  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);
  const [tarjeta, setTarjeta] = useState({ titular: "", numero: "", caducidad: "", cvv: "" });

  if (!tipoPedido) {
    return <Navigate to="/carrito" replace />;
  }

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalCalc = carritoGuardado.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    setCarrito(carritoGuardado);
    setTotal(totalCalc);

    if (tipoPedido === "recogida") {
      setDireccion("C/ Il rituale nº 32");
    } else if (user) {
      setDireccion(user.direccion || ""); 
    }
  }, [user, tipoPedido]);

  const handleChange = (e) => {
    setTarjeta({ ...tarjeta, [e.target.name]: e.target.value });
  };

  const handlePago = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("=== INICIANDO PROCESO DE PAGO ===");
    console.log("1. Datos del usuario en AuthContext:", user);
    
    const token = user?.token; 
    console.log("2. Token extraído:", token ? "Token detectado (largo)" : "¡TOKEN VACÍO/UNDEFINED!");

    try {
      if (!token) {
        throw new Error("No has iniciado sesion inicia sesion para continuar.");
      }

      const detallesDelPedido = carrito.map((item) => ({
        idPlato: item.idPlato, 
        cantidad: item.cantidad
      }));

      const objetoPedido = {
        total: total,
        tipoPedido: tipoPedido,
        detalles: detallesDelPedido
      };

      console.log("3. JSON que se enviará al Backend:", JSON.stringify(objetoPedido, null, 2));

      const res = await fetch("http://localhost:8080/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(objetoPedido)
      });

      console.log("4. Respuesta del servidor - Status:", res.status);

      if (!res.ok) {
         if(res.status === 403) {
           console.error("ERROR 403: El servidor rechazó el token o la ruta está protegida.");
           throw new Error("Acceso denegado (403). Tu sesión podría ser inválida.");
         }
         throw new Error("Error en el servidor: " + res.status);
      }

      const pedidoGuardado = await res.json();
      console.log("5. ¡ÉXITO! Pedido guardado:", pedidoGuardado);
      
      localStorage.removeItem("carrito");
      navigate(`/ticket/${pedidoGuardado.idPedido}`, { 
        state: { carrito, total, pedido: pedidoGuardado, direccion } 
      });

    } catch (error) {
      console.error("ERROR FINAL EN CATCH:", error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
      console.log("=== FIN DEL PROCESO ===");
    }
  };

  return (
    <div className="pasarela-container">
      <div className="pasarela-card">
        <h2>Finalizar Pedido ({tipoPedido === 'domicilio' ? 'Envío' : 'Recogida'})</h2>
        
        <div className="resumen-total">
          <h3>Total: <span>{total.toFixed(2)} €</span></h3>
        </div>

        <form onSubmit={handlePago} className="form-pago">
          <div className="seccion-form">
            <h4> {tipoPedido === 'domicilio' ? 'Dirección de Envío' : 'Punto de Recogida'}</h4>
            <input 
              type="text" 
              value={direccion} 
              onChange={(e) => setDireccion(e.target.value)} 
              disabled={tipoPedido === 'recogida'} 
              className={tipoPedido === 'recogida' ? "input-disabled" : ""}
              required
            />
          </div>

          <div className="seccion-form">
            <h4> Datos de Pago</h4>
            <input type="text" name="titular" placeholder="Titular" onChange={handleChange} required />
            <input type="text" name="numero" placeholder="Nº Tarjeta" maxLength="16" onChange={handleChange} required />
            <div className="fila-inputs">
              <input type="text" name="caducidad" placeholder="MM/AA" onChange={handleChange} required />
              <input type="password" name="cvv" placeholder="CVV" maxLength="3" onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn-pagar" disabled={loading}>
            {loading ? "Procesando..." : `Pagar ${total.toFixed(2)} €`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pedido;