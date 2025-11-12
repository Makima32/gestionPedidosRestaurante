import { useState } from "react";
import "./Headerhome.css";
import { Link } from "react-router-dom";

function Header_home() {


  return (
    <header className="header">

        <div className="header_div">

        <div className="header_div_img_div">

        <img src="logo.png" alt="43" />
        </div>
        
        
        <div className="header_nav_div">

            <Link to="/">Inicio</Link>

            <Link to="/pedidos"> Pedidos </Link>

            <Link to="/sobreNosotros"> Sobre nosotros </Link>

            <Link to="/ubicacion"> Ubicacion </Link>

        </div>

        <div className="header_account_div">

    
            <img src="UserIcon.png" alt="" />
            <p>Cuenta</p>
            

        </div>


        </div>

    </header>
  );
}

export default Header_home;