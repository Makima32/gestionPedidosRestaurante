package com.pedidosrestaurante.pedidos.chatbot;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.pedidosrestaurante.pedidos.models.Plato;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.repository.PlatoRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/gemini")
public class chatbotController {

    @Value("${GEMINI_API_KEY:}")
    private String geminiApiKey;

    @Autowired
    private PlatoRepository platoRepo;

    @PostMapping("/chat")
    public String chat(@RequestBody Map<String, String> payload) {

        String userPrompt = payload.getOrDefault("mensaje", "");
        String historial = payload.getOrDefault("historial", "");

        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            return "ERROR: La clave API de Gemini no esta configurada en application.properties.";
        }

        List<Plato> platos = platoRepo.findAll();
        
        System.out.println("LOG: Enviando " + platos.size() + " platos al Chatbot.");

        String menuFormateado = platos.stream()
                .map(plato -> formatPlatoParaGemini(plato))
                .collect(Collectors.joining("\n---\n"));

        String prompt = "### SYSTEM PROMPT\n"
                + "Eres el encantador y experto camarero del restaurante italiano **IL RITUALE**. Tu misión es asesorar al cliente.\n\n"
                + "Instrucciones:\n"
                + "1. **Personalidad**: Habla español con toques italianos ('Perfetto', 'Mamma mia', 'Prego'). Sé amable y apasionado por la comida.\n"
                + "2. **Concisión**: Máximo 2 líneas por respuesta. Ve al grano a no ser que el cliente requiera de una respuesta mas completa.\n"
                + "3. **Actualización**: Ignora cualquier lista de platos mencionada antes en el historial. El menú real es el que se encuentra dentro de las etiquetas <MENU_ACTUAL> y no cuestiones ninguna pizza, aunque no tenga sentido el nombre es una pizza y si te preguntan por las pizzas devuelves TODOS los nombres , no cuestiones ninguna pizza.\n"
                + "4. **Formato**: Usa negritas (**) para platos y expresiones italianas.\n\n"
                + "<MENU_ACTUAL>\n"
                + menuFormateado + "\n"
                + "</MENU_ACTUAL>\n\n"
                + "<HISTORIAL_RECIENTE>\n"
                + (historial.isEmpty() ? "Inicio de la conversación." : historial) + "\n"
                + "</HISTORIAL_RECIENTE>\n\n"
                + "### PETICIÓN DEL CLIENTE:\n"
                + "Cliente: " + userPrompt + "\n"
                + "Camarero:";

        try {
            Client client = Client.builder().apiKey(geminiApiKey).build();

            GenerateContentResponse response = client.models.generateContent(
                    "gemini-2.5-flash",
                    prompt,
                    null);

            return response.text();

        } catch (Exception e) {
            System.err.println("Error en la API: " + e.getMessage());
            return "Scusa... la cocina está un poco caótica ahora mismo. ¿Podrías repetir tu pregunta?";
        }
    }

    private String formatPlatoParaGemini(Plato plato) {
        StringBuilder sb = new StringBuilder();
        sb.append("Plato: ").append(plato.getNombre()).append("\n");
        sb.append("Detalle: ").append(plato.getDescripcion()).append("\n");
        sb.append("Precio: ").append(plato.getPrecio()).append("€\n");
        sb.append("Ingredientes: ");
        List<PlatoIngrediente> ingredientes = plato.getIngredientes();
        for (int i = 0; i < ingredientes.size(); i++) {
            sb.append(ingredientes.get(i).getIngrediente().getNombre());
            if (i < ingredientes.size() - 1) {
                sb.append(", ");
            }
        }
        return sb.toString();
    }
}