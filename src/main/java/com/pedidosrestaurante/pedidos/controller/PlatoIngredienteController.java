package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.repository.PlatoIngredienteRepository;

import java.util.Optional;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/platosIngredientes")
public class PlatoIngredienteController {

    @Autowired
    private PlatoIngredienteRepository repo;

    @PostMapping("/crear")
    public ResponseEntity<?> crear(@RequestBody PlatoIngrediente pi){
        repo.save(pi);
        return ResponseEntity.ok("Relación Plato-Ingrediente creada");
    }

    @GetMapping("/listar")
    public List<PlatoIngrediente> listar(){
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable int id){
        Optional<PlatoIngrediente> opt = repo.findById(id);
        if(opt.isEmpty()) return ResponseEntity.status(404).body("No encontrado");
        return ResponseEntity.ok(opt.get());
    }

    @DeleteMapping("/eliminar/{idPlato}/{idIngrediente}")
    public ResponseEntity<?> eliminarPorIDs(
            @PathVariable int idPlato,
            @PathVariable int idIngrediente
    ){
        repo.deleteByPlato_IdPlatoAndIngrediente_IdIngrediente(idPlato, idIngrediente);
        return ResponseEntity.ok("Eliminado correctamente");
    }

    @GetMapping("/plato/{idPlato}")
    public List<PlatoIngrediente> listarPorPlato(@PathVariable int idPlato){
        return repo.findByPlato_IdPlato(idPlato);
    }
}
