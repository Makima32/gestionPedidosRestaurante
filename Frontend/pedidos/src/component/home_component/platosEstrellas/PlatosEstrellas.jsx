import "./PlatosEstrellas.css"

function PlatosEstrellas({pizza1, pizza2, pizza3, pizza4, pizza5}) {
    
    return(

        <>

        <div className="PlatosEstrellas_father_div">

            <h2>Nuestras pizzas estrellas</h2>

            <div className="PlatosEstrellas_section">

        <section>
            
          

            <div className="card_platoEstrella_div" id="card_platoEstrella_div1" style={{backgroundImage:`url(/pizzas/${pizza1}.png)`}}>
                
                <p><span>{pizza1}</span></p>

            </div>
            
            <div className="card_platoEstrella_div" id="card_platoEstrella_div2" style={{backgroundImage:`url(/pizzas/${pizza2}.png)`}}>
                
                <p><span>{pizza2}</span></p>

            </div>
            <div className="card_platoEstrella_div" id="card_platoEstrella_div3" style={{backgroundImage:`url(/pizzas/${pizza3}.png)`}}>
                
                <p><span>{pizza3}</span></p>

            </div>
            <div className="card_platoEstrella_div " id="card_platoEstrella_div4 " style={{backgroundImage:`url(/pizzas/${pizza4}.png)`}}>
                
                <p><span>{pizza4}</span></p>

            </div>
            <div className="card_platoEstrella_div" id="card_platoEstrella_div5" style={{backgroundImage:`url(/pizzas/${pizza5}.png)`}}>
                
                <p><span>{pizza5}</span></p>

            </div>
        </section>
        
        </div>
        </div>
        </>
    )
}

export default PlatosEstrellas;