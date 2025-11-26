import "./Ubicacion.css";


function Ubicacion() {
    return(
    
    <>
    <div className="ubicacion_div_father">

        <h2>Donde estamos </h2>
        <p>Nuestras pizzas son la bomba</p>
        <div className="ubicacion_div_map_container">

<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435857.2625432832!2d34.05902583568346!3d31.41041016236987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd844104b258a9%3A0xfddcb14b194be8e7!2sFranja%20de%20Gaza!5e0!3m2!1ses!2ses!4v1763836687492!5m2!1ses!2ses"
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