import "./ContactUs.css";

function ContacUs() {
  return (
    <>
      <div className="ContactUs_div_father">
        <div className="ContactUs_content">
          <h2>Contacto</h2>

          <div className="ContactDiv">
            <h3>Telefono: </h3>
            <p> 664549258</p>
          </div>

          <div className="ContactDiv">
            <h3>Correo: </h3>
            <p>IlRitualepizzeria@gmail.com</p>
          </div>

          <div className="ContactDiv">
            <h3>Instagram: </h3>
            <p>IlRitualepizzeria_69</p>
          </div>

          <div className="ContactDiv">
            <h3>Facebook: </h3>
            <p>IlRitualepizzeria_69</p>
          </div>
        </div>

        <div className="horario_content">
          <h2>Horario</h2>

          <div className="ContactDiv">
            <h3>De lunes a jueves</h3>
            <p>13:00 - 23:00</p>
          </div>

          <div className="ContactDiv">
            <h3>Viernes y sabados</h3>
            <p>13:00 - 00:30</p>
          </div>

          <div className="ContactDiv">
            <h3>Festivos</h3>
            <p>Horario especial — ¡consulta nuestras redes!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContacUs;
