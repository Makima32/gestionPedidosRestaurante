import { useState, useEffect } from "react";
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

    setMensajes(prev => [...prev, { autor: "user", texto: input }]);

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: input })
      });

      const data = await res.json();

      if (typeof data.respuesta === "string") {
        setMensajes(prev => [...prev, { autor: "ia", texto: data.respuesta }]);
      }
    } catch (error) {
      setMensajes(prev => [...prev, { autor: "ia", texto: "Error al obtener respuesta" }]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  }

  useEffect(() => {
    setMensajes(prev => prev.filter(m => m.texto !== "Error al obtener respuesta"));
  }, [input]);

  return (
    <>
      <div className="chatbot_button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/chatbotIcon.png" alt="Bot" />
      </div>

      <div className={`chat_window ${isOpen ? "open" : ""}`}>
        <h3>Asistente</h3>

        <div className="chat_content">
          {mensajes.map((msg, i) => (
            <div key={i} className={`bubble ${msg.autor}`}>
              {msg.texto}
            </div>
          ))}

          {isLoading && (
            <BlinkBlur color="#AC7E2F" size="small" text="Escribiendo..." textColor="#000" />
          )}
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
