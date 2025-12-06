import { useEffect, useState } from "react";
import "./pedir.css";
import { Link } from "react-router-dom";

function Pedir() {
 const palabras = ["Carbonara", "Cuatro quesos", "Peperoni", "Margarita", "Chorizo"];
 const [index, setIndex] = useState(0);
 const [mostrarTexto, setMostrarTexto] = useState("");

 useEffect(() => {
  let i = 0;
  const currentWord = palabras[index];

  const typing = setInterval(() => {
   setMostrarTexto(currentWord.slice(0, i + 1));
   i++;
   if (i === currentWord.length) {
 clearInterval(typing);
 setTimeout(() => {
  setIndex((prev) => (prev + 1) % palabras.length);
 }, 1000);
   }
  }, 150);

  return () => clearInterval(typing);
 }, [index]);

 return (
  <div className="home-cta-animated">
   <div className="cta-content">
 <h2 className="cta-question">
  ¿Qué pizza te apetece hoy? 
 </h2>
 <h1 id="rotating-text-h1">
  <span className="rotating-text">{mostrarTexto}</span>
  <span className="cursor"></span>
 </h1>
 <p className="cta-subtitle">¡Tenemos los ingredientes más frescos esperando por ti!</p>
<Link to="/pedidos">
    <button className="btn-cta">
        Pedir Ahora
    </button>
</Link>   </div>
  </div>
 );
}

export default Pedir;