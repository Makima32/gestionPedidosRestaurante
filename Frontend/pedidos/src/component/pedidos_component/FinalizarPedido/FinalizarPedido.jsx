import "./FinalizarPedido.css";
import { IMAGENES } from "../../../utils/assets";
import { useNavigate } from "react-router-dom";

function FinalizarPedido() {
  const navigate = useNavigate();

  const seleccionarTipo = (tipo) => {
    navigate("/pedido", { state: { tipo: tipo } });
  };

  return (
    <div className="finalizar-container">
      <div className="div_title">
        <h1>¿Cómo quieres recibir tu pedido?</h1>
      </div>

      <div className="opciones-pedido">
        <div className="opcion-card" onClick={() => seleccionarTipo("domicilio")}>
          <img src={IMAGENES.Domicilio} alt="A domicilio" className="full-image" /> 
          <div className="opcion-info">
            <span>A domicilio</span>
          </div>
        </div>

        <div className="opcion-card" onClick={() => seleccionarTipo("recogida")}>
          <img src={IMAGENES.Recoger} alt="Recoger en local" className="full-image" />
          <div className="opcion-info">
            <span>Recoger en local</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalizarPedido;