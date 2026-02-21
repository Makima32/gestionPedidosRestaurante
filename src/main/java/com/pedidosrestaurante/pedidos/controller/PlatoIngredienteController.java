package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId; 
import com.pedidosrestaurante.pedidos.repository.PlatoIngredienteRepository;
import com.pedidosrestaurante.pedidos.service.PlatoIngredienteService; 

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@Transactional
@RequestMapping("/platosIngredientes")
public class PlatoIngredienteController {

    @Autowired
    private PlatoIngredienteRepository repo;
    
    @Autowired
    private PlatoIngredienteService service;

    @PostMapping()
    public ResponseEntity<?> crear(@RequestBody PlatoIngrediente pi){
        PlatoIngrediente nuevo = service.crear(pi); 
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @GetMapping()
    public List<PlatoIngrediente> listar(){
        return repo.findAll();
    }

    @GetMapping("/{idPlato}/{idIngrediente}")
    public Optional<Object> obtenerPorClave(
            @PathVariable int idPlato, 
            @PathVariable int idIngrediente)
    {
        PlatoIngredienteId id = new PlatoIngredienteId(idPlato, idIngrediente);
        
        return repo.findById(id)
            .map(ResponseEntity::ok);
            
    }

    @DeleteMapping("/{idPlato}/{idIngrediente}")
    public ResponseEntity<?> eliminarPorIDs(
            @PathVariable int idPlato, 
            @PathVariable int idIngrediente
    ){
        repo.deleteByPlato_IdPlatoAndIngrediente_IdIngrediente(idPlato, idIngrediente);
        return ResponseEntity.ok("Eliminado correctamente");
    }
    
    @GetMapping("/{idPlato}") 
    public List<PlatoIngrediente> listarPorPlato(@PathVariable int idPlato){
        return repo.findByPlato_IdPlato(idPlato);
    }
}