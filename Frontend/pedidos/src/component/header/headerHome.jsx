import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Headerhome.css";

function Header_home({ paginaInicial }) {
  const [mostrar, setMostrar] = useState(!paginaInicial); 
  // si paginaInicial = true → empieza oculto (fondo normal)
  // si false → empieza visible (fondo normal)

  useEffect(() => {
    if (!paginaInicial) return; // si NO es la página inicial, no hacemos nada

    function handleScroll() {
      if (window.scrollY >= 100) {
        setMostrar(true);  // fondo normal
      } else {
        setMostrar(false); // fondo negro
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [paginaInicial]);

  // Solo cambia el background
  const headerStyle = {
    backgroundColor: mostrar ? "rgba(48, 45, 45, 0.7)" : "black",
  };



  return (
    <header className="header" style={headerStyle}>
      <div className="header_div">
        <div className="header_div_img_div">
          <img src="logo.png" alt="43" />
        </div>

        <div className="header_nav_div">
          <Link to="/">Inicio</Link>
          <Link to="/pedidos">Pedidos</Link>
          <Link to="/sobreNosotros">Sobre nosotros</Link>
          <Link to="/ubicacion">Ubicación</Link>
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
