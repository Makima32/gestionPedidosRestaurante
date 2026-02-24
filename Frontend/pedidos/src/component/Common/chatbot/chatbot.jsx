import { useEffect, useRef, useState } from "react";
import "./chatbot.css";
import { BlinkBlur } from "react-loading-indicators";
import { IMAGENES, SERVER } from "../../../utils/assets";

function Chatbot() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
}, [mensajes, isLoading]); 
  async function enviarMensaje(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const historialString = mensajes.map(msg => {
      const remitente = msg.autor === "user" ? "Cliente" : "Camarero";
      return `${remitente}: ${msg.texto}`;
    }).join("\n");

    setMensajes(prev => [...prev, { autor: "user", texto: input }]);    setIsLoading(true);

    const mensajeEnviado = input; 
    setInput("");
    try {
      const url = `${SERVER}/gemini/chat`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensaje: input,
          historial: historialString
        })
      });

      const data = await res.text(); 

      if (res.ok) {
        setMensajes(prev => [...prev, { autor: "ia", texto: data }]);
      } else {
        console.error("Error del Servidor/Gemini:", data);
        setMensajes(prev => [...prev, { 
          autor: "ia", 
          texto: "**Mamma mia...** Parece que hubo un problema en cocina. ¿Puedes intentarlo de nuevo en un rato?" 
        }]);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setMensajes(prev => [...prev, { 
        autor: "ia", 
        texto: "🔌 **Error de conexión:** Asegúrate de que tienes internet o inténtalo más tarde, *per favore*." 
      }]);
    } finally {
      setIsLoading(false);
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
      {/* El botón redondo solo se muestra si el chat está CERRADO */}
      {!isOpen && (
        <div className="chatbot_button" onClick={() => setIsOpen(true)}>
          <img src={IMAGENES.ChatbotIcon} alt="Bot" />
        </div>
      )}

      <div className={`chat_window ${isOpen ? "open" : ""}`}>
        <div className="chat_header">
          <h3>Asistente IA</h3>
          {/* Botón de cerrar X */}
          <button className="close_chat" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="chat_content" ref={scrollRef}>
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
            placeholder="Pregunta por nuestras pizzas..."
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