import { Link } from "react-router-dom";
import "./crud.css";

function Crud({ valor }) {
  return (
    <>
      <h2>Gestión de {valor}</h2>
      <div className="crud_div_father">
        <div className="crud_div_daugther">
          <div className="crud_row">
            <Link to={`/anadir/${valor}`}><button>Añadir</button></Link>
            <Link to={`/modificar/${valor}`}><button>Modificar</button></Link>
          </div>
          <div className="crud_row">
            <Link to={`/eliminar/${valor}`}><button>Eliminar</button></Link>
            <Link to={`/visualizar/${valor}`}><button>Visualizar</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Crud;
