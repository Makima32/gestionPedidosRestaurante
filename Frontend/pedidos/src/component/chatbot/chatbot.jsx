import { useState } from "react";
import "./chatbot.css";
import { BlinkBlur } from "react-loading-indicators";

function Chatbot() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");

  async function enviarMensaje(e) {
    e.preventDefault();

    if (!input.trim()) return; 
    setIsLoading(true); 
    try {
      const res = await fetch("http://localhost:8000/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: input })
      });

      const data = await res.json();
      console.log("Respuesta :", data);

      // Añadir mensaje(s) de la API
      if (typeof data.respuesta === "string") {
        setMensajes(prev => [...prev, data.respuesta]);
      } else if (Array.isArray(data.respuesta)) {
        setMensajes(prev => [...prev, ...data.respuesta]);
      }

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMensajes(prev => [...prev, "Error al obtener respuesta"]);
    } finally {
      setIsLoading(false); 
      setInput(""); 
    }
  }

  return (
    <>
      {/* BOTÓN flotante */}
      <div className="chatbot_button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/chatbotIcon.png" alt="Bot" />
      </div>

      {/* VENTANA del chat */}
      <div className={`chat_window ${isOpen ? "open" : ""}`}>
        <h3>Asistente</h3>

        <div className="chat_content">
          {mensajes.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}

          {isLoading && <BlinkBlur color="#AC7E2F" size="small" text="Escribbiendo" textColor="#000000" />}
        </div>

        <form onSubmit={enviarMensaje} className="chat_input">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe aquí..."
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}

export default Chatbot;
