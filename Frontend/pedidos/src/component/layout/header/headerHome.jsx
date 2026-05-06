import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // <-- Añadido useLocation
import "./headerHome.css";
import { useAuth } from "../../../hook/auth/authContext";
import { IMAGENES } from "../../../utils/assets";

function Header_home({ home }) {
  const { user, logout } = useAuth();
  const [nombre, setNombre] = useState("Cuenta");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hashImagen, setHashImagen] = useState(Date.now());
  
  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || user.name);
      setHashImagen(Date.now()); 
    } else {
      setNombre("Cuenta");
    }
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setIsMenuOpen(false); 
    navigate("/"); 
  };

  const getLinkStyle = (ruta) => {
    const isActive = location.pathname === ruta;
    
    if (isActive) {
      return { 
        color: home ? "white" : "#ac7e2f", 
        fontWeight: "bold",
        textDecoration: "underline" 
      };
    }
    return { color: home ? "white" : "black" };
  };

  const rutaImagenUsuario = user && user.imagen 
    ? `/CrudImg/Usuarios/${user.imagen}.png?t=${hashImagen}` 
    : IMAGENES.IconUser;

  return (
    <header className="header">
      <div className="header_div">
        <div className="header_div_img_div">
          <Link to="/">
            <img src={IMAGENES.LOGO.PC} alt="Logo" fetchpriority="high" />
          </Link>
        </div>

        <div className={`hamburger_menu ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <div className="bar"></div><div className="bar"></div><div className="bar"></div>
        </div>

        <div className={`header_nav_div ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <Link to="/" style={getLinkStyle("/")}>Inicio</Link>
          <Link to="/pedidos" style={getLinkStyle("/pedidos")}>Pedidos</Link>
          <Link to="/AboutUs" style={getLinkStyle("/AboutUs")}>Sobre nosotros</Link>
          <Link to="/carta" style={getLinkStyle("/carta")}>Nuestra carta</Link>
          
          {user && user.rol === "admin" && (
            <Link to="/adminMenu" style={getLinkStyle("/adminMenu")}>Administración</Link>
          )}

          {user && (user.rol === "chef" || user.rol === "cocinero") && (
            <Link to="/cocina" style={getLinkStyle("/cocina")}>Cocina</Link>
          )}

          {user && (
            <div className="mobile_only_links">
              <Link to="/perfil" style={getLinkStyle("/perfil")}>Mi Perfil</Link>
              <Link to="/" style={getLinkStyle("/logout")} onClick={handleLogout}>Cerrar Sesión</Link>
            </div>
          )}

          {!user && <Link to="/login" style={getLinkStyle("/login")}>Login</Link>}
        </div>

        {user ? (
          <div className="header_account_wrapper">
            <div className="header_account_div">
              <Link to="/perfil" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img 
                  src={rutaImagenUsuario} 
                  alt="User" 
                  onError={(e) => e.target.src = IMAGENES.IconUser} 
                />
                <p style={{ color: 'black', margin: 20 }}>{nombre}</p>
              </Link>
              <button className="logout_button" onClick={handleLogout}>X</button>
            </div>
          </div>
        ) : (
          <div className="header_account_placeholder"></div>
        )}
      </div>
    </header>
  );
}

export default Header_home;