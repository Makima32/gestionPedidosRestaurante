import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Headerhome.css";
import { useAuth } from "../../hook/auth/authcontext";

function Header_home({ home }) {
 const [isHome] = useState(home ?? false);
 const { user, logout } = useAuth(); 
 const [nombre, setNombre] = useState("Cuenta");
 // 🚨 1. NUEVO ESTADO para controlar el menú hamburguesa
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 useEffect(() => {
  if (user) setNombre(user.name);
 }, [user]);

 // 🚨 Función para alternar el estado del menú
 const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
 };

 const handleLogout = () => {
  logout(); // Llama a la función logout del AuthContext
 };
 
 // --- RENDERING PARA ADMINISTRADOR (ADMIN) ---
 if (user && user.name === "admin") {
  return (
   <header className="header">
    <div className="header_div">
     <div className="header_div_img_div">
      <Link to="/"><img src="logo.png" alt="Logo" /></Link>
     </div>

     {/* 🚨 Botón Hamburguesa (Visible solo en móvil) */}
     <div 
      className={`hamburger_menu ${isMenuOpen ? 'active' : ''}`} 
      onClick={toggleMenu}
     >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
     </div>

     {/* 🚨 2. Clase condicional 'active' para desplegar en móvil */}
     <div className={`header_nav_div ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
      <Link to="/" style={{color: isHome ? "white": "black"}}>Inicio</Link>
      <Link to="/pedidos" style={{color: isHome ? "white": "black"}}>Pedidos</Link>
      <Link to="/AboutUs" style={{color: isHome ? "white": "black"}}>Sobre nosotros</Link>
      <Link to="/carta" style={{color: isHome ? "white": "black"}}>Nuestra carta</Link>
      <Link to="/adminMenu" style={{color: isHome ? "white": "black"}}>Administracion</Link>
     </div>

     {/* ADMIN: Se mantiene la estructura completa con el botón de logout */}
     <div className="header_account_div">
      <img src="gatoweee.jpeg" alt="" />
      <p>{nombre}</p>
      <button className="logout_button" onClick={handleLogout}>X</button>
     </div>
    </div>
   </header>
  );
 }

 // --- RENDERING PARA USUARIO LOGUEADO ---
 if (user) {
  return (
   <header className="header">
    <div className="header_div">
     <div className="header_div_img_div">
      <Link to="/"><img src="logo.png" alt="Logo" /></Link>
     </div>
     
     {/* 🚨 Botón Hamburguesa */}
     <div 
      className={`hamburger_menu ${isMenuOpen ? 'active' : ''}`} 
      onClick={toggleMenu}
     >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
     </div>

     {/* 🚨 Clase condicional 'active' */}
     <div className={`header_nav_div ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
      <Link to="/" style={{color: isHome ? "white": "black"}}>Inicio</Link>
      <Link to="/pedidos" style={{color: isHome ? "white": "black"}}>Pedidos</Link>
      <Link to="/AboutUs" style={{color: isHome ? "white": "black"}}>Sobre nosotros</Link>
      <Link to="/carta" style={{color: isHome ? "white": "black"}}>Nuestra carta</Link>
     </div>

     {/* USUARIO: Se mantiene la estructura completa con el botón de logout */}
     <div className="header_account_div">
      <img src="gatoweee.jpeg" alt="" />
      <p>{nombre}</p>
      <button className="logout_button" onClick={handleLogout}>X</button>
     </div>
    </div>
   </header>
  );
 }

 // --- RENDERING PARA INVITADO / NO LOGUEADO ---
 return (
  <header className="header">
   <div className="header_div">
    <div className="header_div_img_div">
     <Link to="/"><img src="logo.png" alt="Logo" /></Link>
    </div>

    {/* 🚨 Botón Hamburguesa */}
    <div 
     className={`hamburger_menu ${isMenuOpen ? 'active' : ''}`} 
     onClick={toggleMenu}
    >
     <div className="bar"></div>
     <div className="bar"></div>
     <div className="bar"></div>
    </div>

    {/* 🚨 Clase condicional 'active' */}
    <div className={`header_nav_div ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
     <Link to="/" style={{color: isHome ? "white": "black"}}>Inicio</Link>
     <Link to="/pedidos" style={{color: isHome ? "white": "black"}}>Pedidos</Link>
     <Link to="/AboutUs" style={{color: isHome ? "white": "black"}}>Sobre nosotros</Link>
     <Link to="/carta" style={{color: isHome ? "white": "black"}}>Nuestra carta</Link>
     <Link to="/login" style={{color: isHome ? "white": "black"}}>Login</Link>
    </div>

    {/* 🚨 INVITADO: Placeholder para mantener la simetría */}
    {/* IMPORTANTE: Debes asegurarte de tener la clase CSS .header_account_placeholder 
           definida con el mismo ancho y margen que .header_account_div 
        */}
    <div className="header_account_placeholder">
     {/* Este div está vacío, pero ocupa el espacio necesario */}
    </div>
   </div>
  </header>
 );
}

export default Header_home;