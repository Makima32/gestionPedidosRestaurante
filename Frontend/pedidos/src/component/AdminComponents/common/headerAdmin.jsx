import { Link } from "react-router-dom";
import { useState } from "react";
import "./headerAdmin.css";
import { IMAGENES } from "../../../utils/assets";

function Header_admin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="headerAdmin">
      <div className="header_div_Admin">
        <div className="header_div_img_div_admin">
          <Link to="/">
            {" "}
            <picture>
              <source media="(min-width: 901px)" srcSet={IMAGENES.LOGO.PC} />

              <img
                src={IMAGENES.LOGO.MOBILE}
                alt="Logo"
                loading="lazy"
              />
            </picture>
          </Link>
        </div>

        <div
          className={`hamburger_menu_admin ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar_admin"></div>
          <div className="bar_admin"></div>
          <div className="bar_admin"></div>
        </div>

        <div
          className={`header_nav_div_Admin ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <Link to="/adminIngredientes" style={{ color: "black" }}>
            Ingredientes
          </Link>
          <Link to="/adminPlatos" style={{ color: "black" }}>
            Platos
          </Link>
          <Link to="/adminPedidos" style={{ color: "black" }}>
            Pedidos
          </Link>
          <Link to="/adminClientes" style={{ color: "black" }}>
            Clientes
          </Link>
       
        </div>

        <div className="header_account_placeholder_admin"></div>
      </div>
    </header>
  );
}

export default Header_admin;
