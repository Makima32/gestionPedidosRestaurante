import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./headerHome.css";
import { useAuth } from "../../hook/auth/authcontext";

function Header_home({ home }) {
 const [isHome] = useState(home ?? false);
 const { user, logout } = useAuth(); 
 const [nombre, setNombre] = useState("Cuenta");
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 useEffect(() => {
  if (user) setNombre(user.name);
 }, [user]);

 const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
 };

 const handleLogout = () => {
  logout();
 };
 
 if (user && user.name === "admin") {
  return (
   <header className="header">
    <div className="header_div">
     <div className="header_div_img_div">
      <Link to="/"><img src="logo.png" alt="Logo" /></Link>
     </div>

     <div 
      className={`hamburger_menu ${isMenuOpen ? 'active' : ''}`} 
      onClick={toggleMenu}
     >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
     </div>

     <div className={`header_nav_div ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
      <Link to="/" style={{color: isHome ? "white": "black"}}>Inicio</Link>
      <Link to="/pedidos" style={{color: isHome ? "white": "black"}}>Pedidos</Link>
      <Link to="/AboutUs" style={{color: isHome ? "white": "black"}}>Sobre nosotros</Link>
      <Link to="/carta" style={{color: isHome ? "white": "black"}}>Nuestra carta</Link>
      <Link to="/adminMenu" style={{color: isHome ? "white": "black"}}>Administracion</Link>
     </div>

     <div className="header_account_div">
      <img src="gatoweee.jpeg" alt="" />
      <p>{nombre}</p>
      <button className="logout_button" onClick={handleLogout}>X</button>
     </div>
    </div>
   </header>
  );
 }

 if (user) {
  return (
   <header className="header">
    <div className="header_div">
     <div className="header_div_img_div">
      <Link to="/"><img src="logo.png" alt="Logo" /></Link>
     </div>
     
     <div 
      className={`hamburger_menu ${isMenuOpen ? 'active' : ''}`} 
      onClick={toggleMenu}
     >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
     </div>

     <div className={`header_nav_div ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
      <Link to="/" style={{color: isHome ? "white": "black"}}>Inicio</Link>
      <Link to="/pedidos" style={{color: isHome ? "white": "black"}}>Pedidos</Link>
      <Link to="/AboutUs" style={{color: isHome ? "white": "black"}}>Sobre nosotros</Link>
      <Link to="/carta" style={{color: isHome ? "white": "black"}}>Nuestra carta</Link>
     </div>

     <div className="header_account_div">
      <img src="gatoweee.jpeg" alt="" />
      <p>{nombre}</p>
      <button className="logout_button" onClick={handleLogout}>X</button>
     </div>
    </div>
   </header>
  );
 }

 return (
  <header className="header">
   <div className="header_div">
    <div className="header_div_img_div">
     <Link to="/"><img src="logo.png" alt="Logo" /></Link>
    </div>

    <div 
     className={`hamburger_menu ${isMenuOpen ? 'active' : ''}`} 
     onClick={toggleMenu}
    >
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
    </div>

    <div className={`header_nav_div ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
     <Link to="/" style={{color: isHome ? "white": "black"}}>Inicio</Link>
     <Link to="/pedidos" style={{color: isHome ? "white": "black"}}>Pedidos</Link>
     <Link to="/AboutUs" style={{color: isHome ? "white": "black"}}>Sobre nosotros</Link>
     <Link to="/carta" style={{color: isHome ? "white": "black"}}>Nuestra carta</Link>
     <Link to="/login" style={{color: isHome ? "white": "black"}}>Login</Link>
    </div>

       
    <div className="header_account_placeholder">
    </div>
   </div>
  </header>
 );
}

export default Header_home;
