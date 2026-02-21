package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException; 

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

    @PostMapping()
    public ResponseEntity<?> crearPlato(@RequestBody Plato plato) {
        try {
            if (plato.getIngredientes() != null) {
                for (PlatoIngrediente pi : plato.getIngredientes()) {
                    
                    if (pi.getIngrediente() == null) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cada PlatoIngrediente debe especificar un Ingrediente.");
                    }
                    
                    int idIngrediente = pi.getIngrediente().getIdIngrediente();
                    
                    if (!ingredienteRepo.existsById(idIngrediente)) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El ID de ingrediente " + idIngrediente + " no existe en la base de datos.");
                    }
                    
                    pi.setIngrediente(ingredienteRepo.getReferenceById(idIngrediente));
                    
                    pi.setPlato(plato);
                }
            }
            
            platoRepo.save(plato);
            return new ResponseEntity<>("Plato creado correctamente", HttpStatus.CREATED);
            
        } catch (ResponseStatusException e) {
            return new ResponseEntity<>(e.getReason(), e.getStatusCode());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error al crear el plato: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{id}")
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
                     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ingrediente con ID no válido en el payload de actualización.");
                }
                
                int idIngrediente = pi.getIngrediente().getIdIngrediente();
                
                pi.setIngrediente(ingredienteRepo.getReferenceById(idIngrediente));
            }
            
        plato.actualizarIngredientes(cambios.getIngredientes());        }

        try {
            platoRepo.save(plato);
            return ResponseEntity.ok("Plato actualizado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error al actualizar el plato: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    @GetMapping("")
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPlato(@PathVariable int id) {
        Optional<Plato> opt = platoRepo.findById(id);

        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body("Plato no encontrado");
        }

        platoRepo.deleteById(id);
        return ResponseEntity.ok("Plato eliminado correctamente");
    }
}