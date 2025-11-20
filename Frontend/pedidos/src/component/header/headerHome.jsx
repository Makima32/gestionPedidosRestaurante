import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Headerhome.css";

function Header_home({ Style }) {
 

const headerStyle = {
  backgroundColor: Style ? "black" : "transparent",
  height: Style ? "200px" : "0px",
  transition: "all 0.3s ease", 
};




  return (
    <header className="header" style={headerStyle}>
      <div className="header_div">
        <div className="header_div_img_div">
         <Link to="/"> <img src="logo.png" alt="43" /> </Link>
        </div>

        <div className="header_nav_div">
          <Link to="/">Inicio</Link>
          <Link to="/pedidos">Pedidos</Link>
          <Link to="/AboutUs">Sobre nosotros</Link>
          <Link to="/carta">Nuestra carta</Link>
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
