import "./Ubicacion.css";


function Ubicacion() {
    return(
    
    <>
    <div className="ubicacion_div_father">

        <h2>Donde estamos </h2>
        <div className="ubicacion_div_map_container">

<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7037.311227498179!2d-15.452150738184924!3d28.12652326536581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40951c8a18a0f3%3A0x142cb0d09763a325!2sIES%20El%20Rinc%C3%B3n!5e0!3m2!1ses!2ses!4v1763418329361!5m2!1ses!2ses"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

        </div>
    </div>
    </>
    )
}


export default Ubicacion;