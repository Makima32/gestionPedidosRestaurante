import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Headerhome.css";
import { useAuth } from "../../hook/auth/authcontext";

function Header_home({ home }) {
  //Si home es null lo declara false por defecto
  const [isHome, setIsHome] = useState(home ?? false);

  const { user, loading } = useAuth();

  const [nombre, setNombre] = useState("Cuenta");

  function ComprobarUser() {
    if (user) {
      if (user) {
        setNombre(user.name);
        // nombre = user.name
      }
    }
  }

  useEffect(() => {
   
    ComprobarUser();
  }, [user]);

   return (
    <header className="header" >
      <div className="header_div">
        <div className="header_div_img_div">
          <Link to="/"> <img src="logo.png" alt="Logo" /> </Link>
        </div>
        <div className="header_nav_div">
          <Link to="/" style={{color: isHome ? "white": "black", textDecoration: "none"}}>Inicio</Link>
          <Link to="/pedidos" style={{color: isHome ? "white": "black", textDecoration: "none"}}>Pedidos</Link>
          <Link to="/AboutUs" style={{color: isHome ? "white": "black", textDecoration: "none"}}>Sobre nosotros</Link>
          <Link to="/carta" style={{color: isHome ? "white": "black", textDecoration: "none"}}>Nuestra carta</Link>
          <Link to="/login" style={{color: isHome ? "white": "black", textDecoration: "none"}}>Login</Link>
        </div>
        <div className="header_account_div">
          <img src="UserIcon.png" alt="" />
          <p>{nombre}</p>
        </div>
      </div>
    </header>
  );
}

export default Header_home;
