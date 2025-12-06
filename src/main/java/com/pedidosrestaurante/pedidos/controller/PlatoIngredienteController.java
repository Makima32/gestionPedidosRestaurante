package com.pedidosrestaurante.pedidos.controller;

import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.repository.PlatoIngredienteRepository;
import com.pedidosrestaurante.pedidos.service.PlatoIngredienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/platosIngredientes")
public class PlatoIngredienteController {

    @Autowired
    private PlatoIngredienteRepository repo;

    @Autowired
    private PlatoIngredienteService service;

    // 1. CREAR relación plato-ingrediente
    @PostMapping("/crear")
    public ResponseEntity<?> crear(@RequestBody PlatoIngrediente pi) {
        // El service se encarga de setear plato e ingrediente con getReferenceById()
        PlatoIngrediente nuevo = service.crear(pi);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    // 2. LISTAR todas las relaciones
    @GetMapping("/listar")
    public ResponseEntity<List<PlatoIngrediente>> listar() {
        List<PlatoIngrediente> lista = repo.findAll();
        return ResponseEntity.ok(lista);
    }

    // 3. OBTENER una relación concreta por clave compuesta
    @GetMapping("/{idPlato}/{idIngrediente}")
    public ResponseEntity<?> obtenerPorClave(
            @PathVariable int idPlato,
            @PathVariable int idIngrediente) {
        PlatoIngredienteId id = new PlatoIngredienteId(idPlato, idIngrediente);

        Optional<PlatoIngrediente> opt = repo.findById(id);

        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        } else {
            return ResponseEntity.status(404)
                    .body("Relación plato-ingrediente no encontrada");
        }
    }

    // 4. ELIMINAR una relación concreta plato-ingrediente
    @DeleteMapping("/eliminar/{idPlato}/{idIngrediente}")
    public ResponseEntity<?> eliminarPorIDs(
            @PathVariable int idPlato,
            @PathVariable int idIngrediente) {
        PlatoIngredienteId id = new PlatoIngredienteId(idPlato, idIngrediente);

        if (!repo.existsById(id)) {
            return ResponseEntity.status(404)
                    .body("Relación plato-ingrediente no encontrada");
        }

        // Puedes usar deleteById(id) o el método derivado:
        // repo.deleteByPlato_IdPlatoAndIngrediente_IdIngrediente(idPlato,
        // idIngrediente);
        repo.deleteById(id);

        return ResponseEntity.ok("Relación plato-ingrediente eliminada correctamente");
    }

    // 5. LISTAR todas las relaciones de un plato concreto
    @GetMapping("/plato/{idPlato}")
    public ResponseEntity<List<PlatoIngrediente>> listarPorPlato(@PathVariable int idPlato) {
        List<PlatoIngrediente> lista = repo.findByPlato_IdPlato(idPlato);
        return ResponseEntity.ok(lista);
    }
}
