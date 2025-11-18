import "./Cards.css";
function Cards() {
    return(
        <>
        
        <h2>Titulo</h2>
        
        <div className="cards_div_father">

        <div className="card">
            <img src="/logo.png" alt="" />
            <h3>carta</h3>
            <p>Texto</p>
        </div>

  <div className="card">
            <img src="/logo.png" alt="" />
            <h3>carta</h3>
            <p>Texto</p>
        </div>
  <div className="card">
            <img src="/logo.png" alt="" />
            <h3>carta</h3>
            <p>Texto</p>
        </div>        
        </div>
        </>
    )
}

export default Cards;