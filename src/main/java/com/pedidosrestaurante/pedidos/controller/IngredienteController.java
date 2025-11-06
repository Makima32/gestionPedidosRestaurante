package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.pedidosrestaurante.pedidos.models.Ingrediente;
import com.pedidosrestaurante.pedidos.repository.IngredienteRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ingredientes")
public class IngredienteController {

    @Autowired
    private IngredienteRepository repo;

    @PostMapping("/crear")
    public ResponseEntity<String> crearIngrediente(@RequestBody Ingrediente ingrediente) {
        repo.save(ingrediente);
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body("Ingrediente creado correctamente ");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Ingrediente>> listarIngredientes() {
        List<Ingrediente> ingredientes = repo.findAll();
        return ResponseEntity.ok(ingredientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerIngrediente(@PathVariable int id) {
        Optional<Ingrediente> ingrediente = repo.findById(id);
        if (ingrediente.isPresent()) {
            return ResponseEntity.ok(ingrediente.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Ingrediente no encontrado");
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarIngrediente(@PathVariable int id, @RequestBody Ingrediente cambios) {
        Optional<Ingrediente> opt = repo.findById(id);

        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Ingrediente no encontrado ");
        }

        Ingrediente ing = opt.get();
        if (cambios.getNombre() != null) ing.setNombre(cambios.getNombre());
        if (cambios.getDescripcion() != null) ing.setDescripcion(cambios.getDescripcion());
        if (cambios.getAlergenos() != null) ing.setAlergenos(cambios.getAlergenos());
        ing.setStock(cambios.getStock());
        ing.setEsVegano(cambios.isEsVegano());

        repo.save(ing);
        return ResponseEntity.ok("Ingrediente actualizado correctamente ");
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarIngrediente(@PathVariable int id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Ingrediente no encontrado ");
        }
        repo.deleteById(id);
        return ResponseEntity.ok("Ingrediente eliminado correctamente ");
    }
}
