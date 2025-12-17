package com.pedidosrestaurante.pedidos.chatbot;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/chat")
    public String chat(@RequestParam String UserPrompt) {

        if (geminiApiKey == null || geminiApiKey.isEmpty()) {
            return "ERROR: La clave API de Gemini no esta configurada en application.properties.";
        }

        List<Plato> platos = platoRepo.findAll();

        String menuFormateado = platos.stream()
                .map(plato -> formatPlatoParaGemini(plato))
                .collect(Collectors.joining("\n---\n"));

        String prompt = "Eres un asistente de chatbot para un restaurante. Aquí está el menú de platos disponibles:\n\n"
                + menuFormateado
                + "\n\nResponde a la siguiente pregunta del usuario basándote en el menú proporcionado e informacion del mismo, haz recomendaciones si el usuario te lo pide y mantente formal y educado, respuestas concisas pero detalladas, Respuestas muy cortas a ser posible, no mucho texto:\n Usuario: ";


        String promptFinal = prompt + UserPrompt;

        Client client;
        try {

            client = Client.builder().apiKey(geminiApiKey)
                    .build();

            GenerateContentResponse response = client.models.generateContent(
                    "gemini-2.5-flash",
                    promptFinal,
                    null);

            return response.text();

        } catch (Exception e) {
            System.err.println("Error en la API: " + e.getMessage());
            return "Error al procesar la solicitud.";
        }

    }

    private String formatPlatoParaGemini(Plato plato) {
        StringBuilder sb = new StringBuilder();
        sb.append("Nombre: ").append(plato.getNombre()).append("\n");
        sb.append("Descripción: ").append(plato.getDescripcion()).append("\n");
        sb.append("Precio: $").append(plato.getPrecio()).append("\n");
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