package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException; // Para manejar errores 400 limpios

import com.pedidosrestaurante.pedidos.models.Plato;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.repository.PlatoRepository;
import com.pedidosrestaurante.pedidos.repository.IngredienteRepository; 

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/platos")
public class PlatoController {

    @Autowired
    private PlatoRepository platoRepo;
    
    @Autowired
    private IngredienteRepository ingredienteRepo;

    // --- MÉTODO CREAR PLATO CORREGIDO Y VALIDADO ---
    @PostMapping("/crear")
    public ResponseEntity<?> crearPlato(@RequestBody Plato plato) {
        try {
            if (plato.getIngredientes() != null) {
                for (PlatoIngrediente pi : plato.getIngredientes()) {
                    
                    // 🚨 VALIDACIÓN CRUCIAL 1: El objeto Ingrediente debe existir en el JSON
                    if (pi.getIngrediente() == null) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cada PlatoIngrediente debe especificar un Ingrediente.");
                    }
                    
                    int idIngrediente = pi.getIngrediente().getIdIngrediente();
                    
                    // 🚨 VALIDACIÓN CRUCIAL 2: El Ingrediente debe existir en la base de datos
                    if (!ingredienteRepo.existsById(idIngrediente)) {
                        // Opcionalmente, puedes usar existsById para verificar antes de getReferenceById
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El ID de ingrediente " + idIngrediente + " no existe en la base de datos.");
                    }
                    
                    // 1. CREAR REFERENCIA: Reemplaza el objeto parcial con un proxy gestionado.
                    pi.setIngrediente(ingredienteRepo.getReferenceById(idIngrediente));
                    
                    // 2. Establecer la bidireccionalidad
                    pi.setPlato(plato);
                }
            }
            
            platoRepo.save(plato);
            return new ResponseEntity<>("Plato creado correctamente", HttpStatus.CREATED);
            
        } catch (ResponseStatusException e) {
            // Captura los errores 400 que generamos
            return new ResponseEntity<>(e.getReason(), e.getStatusCode());
        } catch (Exception e) {
            // Captura cualquier otro error (incluyendo fallos de Jackson si el JSON es muy malo)
            e.printStackTrace();
            return new ResponseEntity<>("Error al crear el plato: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // --- MÉTODO ACTUALIZAR PLATO CORREGIDO Y VALIDADO ---
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<?> actualizarPlato(@PathVariable int id, @RequestBody Plato cambios) {
        Optional<Plato> opt = platoRepo.findById(id);

        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body("Plato no encontrado");
        }

        Plato plato = opt.get();
        if (cambios.getNombre() != null)
            plato.setNombre(cambios.getNombre());
        if (cambios.getDescripcion() != null)
            plato.setDescripcion(cambios.getDescripcion());
        if (cambios.getPrecio() != 0) 
            plato.setPrecio(cambios.getPrecio());
        if (cambios.getImagen() != null)
            plato.setImagen(cambios.getImagen());
            
        if (cambios.getIngredientes() != null) {
            
            for (PlatoIngrediente pi : cambios.getIngredientes()) {
                if (pi.getIngrediente() == null || pi.getIngrediente().getIdIngrediente() == 0) {
                     // Si el ingrediente está mal, lanzamos una excepción para detener la operación.
                     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ingrediente con ID no válido en el payload de actualización.");
                }
                
                int idIngrediente = pi.getIngrediente().getIdIngrediente();
                
                // Asegura que la referencia sea gestionada
                pi.setIngrediente(ingredienteRepo.getReferenceById(idIngrediente));
            }
            
            // Pasar la lista preprocesada al Setter (el setter debe manejar la limpieza/bidireccionalidad)
            plato.setIngredientes(cambios.getIngredientes());
        }

        try {
            platoRepo.save(plato);
            return ResponseEntity.ok("Plato actualizado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error al actualizar el plato: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // --- OTROS MÉTODOS (sin cambios) ---

    @GetMapping("/listar")
    public ResponseEntity<?> listarPlatos() {
        return ResponseEntity.ok(platoRepo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPlato(@PathVariable int id) {
        Optional<Plato> opt = platoRepo.findById(id);

        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body("Plato no encontrado");
        }

        return ResponseEntity.ok(opt.get());
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarPlato(@PathVariable int id) {
        Optional<Plato> opt = platoRepo.findById(id);

        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body("Plato no encontrado");
        }

        platoRepo.deleteById(id);
        return ResponseEntity.ok("Plato eliminado correctamente");
    }
}