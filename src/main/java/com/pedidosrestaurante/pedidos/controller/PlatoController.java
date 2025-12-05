package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.pedidosrestaurante.pedidos.models.Plato;
import com.pedidosrestaurante.pedidos.repository.PlatoRepository;
import com.pedidosrestaurante.pedidos.dto.ItemDTO;
import java.util.Optional;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/platos")
public class PlatoController {

    @Autowired
    private PlatoRepository platoRepo;

    @PostMapping("/crear")
    public ResponseEntity<?> crearPlato(@RequestBody Plato plato) {
        platoRepo.save(plato);
        return ResponseEntity.ok("Plato creado correctamente");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ItemDTO>> listarPlatos() {
        List<ItemDTO> platos = platoRepo.findAll()
                .stream()
                .map(plato -> new ItemDTO(
                        plato.getIdPlato(),
                        plato.getNombre(),
                        "/CrudImg/Platos/"
                                + (plato.getImagen() != null && !plato.getImagen().isEmpty()
                                        ? plato.getImagen()
                                        : "default")
                                + ".png"))
                .toList();

        return ResponseEntity.ok(platos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPlato(@PathVariable int id) {
        Optional<Plato> opt = platoRepo.findById(id);

        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body("Plato no encontrado");
        }

        return ResponseEntity.ok(opt.get());
    }

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

        platoRepo.save(plato);
        return ResponseEntity.ok("Plato actualizado correctamente");
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
