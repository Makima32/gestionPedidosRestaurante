import { Link } from "react-router-dom";
import "./headerAdmin.css";

function Header_admin() {


  return (
    <header className="headerAdmin">

        <div className="header_div_Admin">

       
        <div className="header_div_img_div_admin">

        <img src="logo.png" alt="43" />
        </div>
        
        <div className="header_nav_div_Admin">

            <Link to="/adminIngredientes">Ingredientes</Link>

            <Link to="/adminPlatos">Platos</Link>

            <Link to="/adminPedidos">Pedidos </Link>

            <Link to="/adminClientes">Clientes </Link>

            <Link to="/adminMesas">Mesas </Link>

            <Link to="/adminReservas">Reservas </Link>

        </div>



        </div>

    </header>
  );
}

export default Header_admin;