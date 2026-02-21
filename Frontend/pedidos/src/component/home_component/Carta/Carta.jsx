import { useNavigate } from "react-router-dom";
import "./Carta.css";
import { IMAGENES } from "../../../utils/assets"; 

function Carta() {
    const navigate = useNavigate();

    return (
        <div className="carta_div_father">
            <div className="carta_div_img">
                <picture>
                    <source media="(min-width: 901px)" srcSet={IMAGENES.CARTA.PC} />
                    <source media="(min-width: 601px)" srcSet={IMAGENES.CARTA.TABLET} />
                    <img 
                        src={IMAGENES.CARTA.MOBILE} 
                        alt="Nuestra Carta de Pizzas"   
                        loading="lazy" 
                    />
                </picture>
            </div>
            
            <div className="carta_div_information">
                <div className="carta_div_information_content">
                    <h2>Nuestra carta</h2>
                    <p>Déjate tentar por nuestras pizzas artesanales, con combinaciones únicas y los ingredientes más frescos.</p>
                    
                    <button onClick={() => navigate("/carta")}>
                        Ir a carta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Carta;