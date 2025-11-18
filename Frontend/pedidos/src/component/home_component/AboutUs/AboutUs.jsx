import { Link } from "react-router-dom";
import "./AboutUs.css";


function About_Us() {
    return(
    
    <>
  <div className="about_us_div_father">
    <div className="about_us_div_img">

        <img src="logo.png" alt="img_aboutUs" />

    </div>
    <div className="about_us_div_information">

        <div className="about_us_div_information_content">
        <h2>Sobre nosotros</h2>
        <p>En nuestra pizzería combinamos ingredientes frescos y recetas artesanales para crear sabores que conquistan. Descubre nuestro secreto y la pasión que ponemos en cada pizza. ¡Haz clic y conoce nuestra historia!</p>
        <button >Sobre nosotros </button>
        </div>
    </div>
</div>

    </>
    )
}


export default About_Us;