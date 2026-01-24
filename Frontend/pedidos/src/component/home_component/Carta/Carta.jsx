import "./Carta.css";


function Carta() {
    function Redireccion() {
    
    location.href = "/carta"
}

    return(
    
    <>
  <div className="carta_div_father">
    <div className="carta_div_img">

        <img src="/home/carta_img_home.webp" alt="img_carta" />

    </div>
    <div className="carta_div_information">

        <div className="carta_div_information_content">
        <h2>Nuestra carta</h2>
        <p>Déjate tentar por nuestras pizzas artesanales, con combinaciones únicas y los ingredientes más frescos. Descubre tu próxima favorita y sorprende a tu paladar. ¡Explora nuestra carta ahora!</p>
        <button onClick={Redireccion}>Ir a carta </button>
        </div>
    </div>
</div>

    </>
    )
}


export default Carta;