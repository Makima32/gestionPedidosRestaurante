import { Link } from "react-router-dom";
import "./crud.css";

function Crud({valor}) {
  return (
    <>
    <h2>Gestion de {valor}</h2>
    <div className="crud_div_father">
      
      <div className="crud_div_daugther">
        <div className="crud_row">
          
          <Link to={`/Añadir${valor}`}><button>Añadir</button></Link>
          <Link to={`/Modificar${valor}`}><button>Modificar</button></Link>
        </div>
        <div className="crud_row">
          <Link to={`/Eliminar${valor}`}><button>Eliminar</button></Link>
          <Link to={`/Visualizar${valor}`}><button>Visualizar</button></Link>
        </div>
      </div>
    </div>

</>
    
  );
}

export default Crud;
