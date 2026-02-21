import { Link, Navigate, useNavigate } from "react-router-dom";
import "./AboutUs.css";
import { IMAGENES } from "../../../utils/assets";


function About_Us() {
    const navigate = useNavigate();

  return (
    <>
      <div className="about_us_div_father">
        <div className="about_us_div_img">
         <picture>
                            <source media="(min-width: 901px)" srcSet={IMAGENES.AboutUs.PC} />
                            <source media="(min-width: 601px)" srcSet={IMAGENES.AboutUs.TABLET} />
                            <img 
                                src={IMAGENES.AboutUs.MOBILE} 
                                alt="Nuestra Carta de Pizzas"   
                                loading="lazy" 
                            />
                        </picture>
        </div>
        <div className="about_us_div_information">
          <div className="about_us_div_information_content">
            <h2>Sobre nosotros</h2>
            <p>
              En nuestra pizzería combinamos ingredientes frescos y recetas
              artesanales para crear sabores que conquistan. Descubre nuestro
              secreto y la pasión que ponemos en cada pizza. ¡Haz clic y conoce
              nuestra historia!
            </p>
            <button onClick={() => navigate("/AboutUs")}>
              Sobre nosotros
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default About_Us;
