import { Link } from "react-router-dom";
import "./crud.css";

function Crud({ valor }) {
  if (valor === "pedidos") {
    return (
      <>
        <div className="div_title">
          <h2>Gestión de {valor}</h2>
        </div>
        <div className="crud_div_father">
          <div
            className="crud_div_daugther"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to={`/visualizar/${valor}`}
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <button
                style={{
                  width: "300px",
                  height: "15vh",
                  padding: "10px 20px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor: "#AC7E2F",
                  color: "white",
                }}
              >
                Ver Lista de Pedidos
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="div_title">
        <h2>Gestión de {valor}</h2>
      </div>
      <div className="crud_div_father">
        <div className="crud_div_daugther">
          <div className="crud_row">
            <Link to={`/anadir/${valor}`}>
              <button>Añadir</button>
            </Link>
            <Link to={`/modificar/${valor}`}>
              <button>Modificar</button>
            </Link>
          </div>
          <div className="crud_row">
            <Link to={`/eliminar/${valor}`}>
              <button>Eliminar</button>
            </Link>
            <Link to={`/visualizar/${valor}`}>
              <button>Visualizar</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Crud;
