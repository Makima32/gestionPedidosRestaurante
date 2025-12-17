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

      // encodeURIComponent asegura que espacios y caracteres especiales sean seguros para la URL
      const encodedPrompt = encodeURIComponent(input);

      const url = `http://localhost:8080/gemini/chat?UserPrompt=${encodedPrompt}`;

      const res = await fetch(url, {
        method: "GET", 
      });

      //EL BACKEND DEVUELVE UN STRING.
      const data = await res.text(); 

      if (res.ok) {
        setMensajes(prev => [...prev, { autor: "ia", texto: data }]);
      } else {
        console.error("Error del Servidor/Gemini:", data);
        setMensajes(prev => [...prev, { autor: "ia", texto: `Error del asistente: ${data.substring(0, 100)}...` }]);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setMensajes(prev => [...prev, { autor: "ia", texto: "Error al conectar con el servidor." }]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  }


  useEffect(() => {
    setMensajes(prev => prev.filter(m => !m.texto.includes("Error")));
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
          <button type="submit"><img src="/sendButton.png" alt="" /></button>
        </form>
      </div>
    </>
  );
}

export default Chatbot;