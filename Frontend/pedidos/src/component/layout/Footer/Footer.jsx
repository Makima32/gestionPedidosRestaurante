import "./Footer.css";

function FooterWeb() {
  return (
    <footer className="footer_div_father">
      <div className="footer_div_content">
        <div className="footer_socials">
          <h1>Síguenos</h1>
          <a href="https://instagram.com">
            <img src="/socialMedia/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://facebook.com">
            <img src="/socialMedia/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://X.com">
            <img src="/socialMedia/x.svg" alt="X" />
          </a>
        </div>

        <div className="footer_links">
          <h1>Enlaces rápidos</h1>
          <a href="/">Inicio</a>
          <a href="/carta">Carta</a>
          <a href="/AboutUs">Sobre nosotros</a>
          <a href="/pedidos">Pedidos</a>

        </div>

        <div className="footer_info">
          <h1>Contacto</h1>
          <p>Teléfono: +34 664-54-98</p>
          <p>Email: IllRituale@gmail.com</p>
          <p>© 2025 Pizzería Ill Rituale</p>
        </div>
      </div>

      <div className="copyright_div">
        <p>© 2025 Ill Rituale. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default FooterWeb;
