import { useState, useEffect } from "react";
import "./chatbot.css";
import { BlinkBlur } from "react-loading-indicators";
import { IMAGENES, SERVER } from "../../../utils/assets";

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
      const url = `${SERVER}/gemini/chat?UserPrompt=${encodedPrompt}`;

      const res = await fetch(url, {
        method: "GET", 
      });

      // EL BACKEND DEVUELVE UN STRING.
      const data = await res.text(); 

      if (res.ok) {
        setMensajes(prev => [...prev, { autor: "ia", texto: data }]);
      } else {
        // ERROR DEL BACKEND O DE GEMINI 
        console.error("Error del Servidor/Gemini:", data);
        setMensajes(prev => [...prev, { 
          autor: "ia", 
          texto: "**Ups...** Parece que hubo un error con Gemini ¿Puedes intentarlo de nuevo en un rato?" 
        }]);
      }
    } catch (error) {
      // ERROR DE CONEXIÓN 
      console.error("Error de conexión:", error);
      setMensajes(prev => [...prev, { 
        autor: "ia", 
        texto: "🔌 **Error de conexión:**Asegúrate de que tienes internet o intentalo mas tarde." 
      }]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  }

  // FUNCIÓN PARA FORMATEAR EL TEXTO DE GEMINI (Negritas y saltos de línea)
  const formatearTextoIA = (texto) => {
    if (!texto) return { __html: "" };
    
    let textoFormateado = texto.replace(/\n/g, "<br />");
    
    textoFormateado = textoFormateado.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    
    textoFormateado = textoFormateado.replace(/\*(.*?)\*/g, "<b>$1</b>");

    return { __html: textoFormateado };
  };

  return (
    <>
      <div className="chatbot_button" onClick={() => setIsOpen(!isOpen)}>
        <img src={IMAGENES.ChatbotIcon} alt="Bot" />
      </div>

      <div className={`chat_window ${isOpen ? "open" : ""}`}>
        <h3>Asistente</h3>

        <div className="chat_content">
          {mensajes.map((msg, i) => (
            <div key={i} className={`bubble ${msg.autor}`}>
              {msg.autor === "ia" ? (
                <span dangerouslySetInnerHTML={formatearTextoIA(msg.texto)} />
              ) : (
                msg.texto
              )}
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
          <button type="submit">
            <img src={IMAGENES.SendButtom} alt="enviar" />
          </button>
        </form>
      </div>
    </>
  );
}

export default Chatbot;