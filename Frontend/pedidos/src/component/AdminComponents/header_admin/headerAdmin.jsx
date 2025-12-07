import { Link } from "react-router-dom";
import "./headerAdmin.css";

function Header_admin() {


  return (
    <header className="headerAdmin">

        <div className="header_div_Admin">

       
        <div className="header_div_img_div_admin">

      <Link to="/"><img src="logo.png" alt="Logo" /></Link>
     
         </div>
        
        <div className="header_nav_div_Admin">

            <Link to="/adminIngredientes" style={{color: "black"}} >Ingredientes</Link>

            <Link to="/adminPlatos"  style={{color:"black"}}>Platos</Link>

            <Link to="/adminPedidos"  style={{color:"black"}}>Pedidos </Link>

            <Link to="/adminClientes"  style={{color:"black"}}>Clientes </Link>

            <Link to="/adminMesas"  style={{color:"black"}} >Mesas </Link>

            <Link to="/adminReservas"  style={{color:"black"}}>Reservas </Link>

        </div>



        </div>

    </header>
  );
}

export default Header_admin;