import "./Carta.css";


function Carta() {
    return(
    
    <>
  <div className="carta_div_father">
    <div className="carta_div_img">

        <img src="logo.png" alt="img_carta" />

    </div>
    <div className="carta_div_information">

        <div className="carta_div_information_content">
        <h2>Nuestra carta</h2>
        <p>Déjate tentar por nuestras pizzas artesanales, con combinaciones únicas y los ingredientes más frescos. Descubre tu próxima favorita y sorprende a tu paladar. ¡Explora nuestra carta ahora!</p>
        <button>Ir a carta </button>
        </div>
    </div>
</div>

    </>
    )
}


export default Carta;