import "./Card.css";

function Card() {
    return(
        <>

        <div className="card_title_div">
    <h2>Nuestra filosofía</h2>
 </div>
 <div className="card_div_father">

    <div className="card">  
        <div className="card_img"><img src="/ingredientes_icon.png" alt="" /></div>
        <div className="card_content">
            <h2>Ingredientes de Calidad</h2>
            <p>Seleccionamos cuidadosamente ingredientes frescos y naturales. Cada pizza está hecha para ofrecer el mejor sabor y textura en cada bocado.</p>
        </div>
    </div>

    <div className="card">  
        <div className="card_img"><img src="/Sostenibilidad_icon.png" alt="" /></div>
        <div className="card_content">
            <h2>Sostenibilidad</h2>
            <p>Trabajamos con proveedores locales y usamos envases reciclables. Queremos que disfrutes tu comida mientras cuidamos el planeta.</p>
        </div>
    </div>

    <div className="card">  
        <div className="card_img"><img src="/Experiencia_icon.png" alt="" /></div>
        <div className="card_content">
            <h2>Experiencia Única</h2>
            <p>Disfruta de un ambiente acogedor y pizzas recién horneadas. Cada visita es una oportunidad de saborear la pasión que ponemos en cada plato.</p>
        </div>
    </div>
</div>

        </>
    )
}

export default Card;