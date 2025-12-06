package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId; // <-- Necesario
import com.pedidosrestaurante.pedidos.repository.PlatoIngredienteRepository;
import com.pedidosrestaurante.pedidos.service.PlatoIngredienteService; // <-- Usaremos un servicio

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/platosIngredientes")
public class PlatoIngredienteController {

    @Autowired
    private PlatoIngredienteRepository repo;
    
    @Autowired // ASUME que ahora tienes un servicio para la lógica de creación/eliminación
    private PlatoIngredienteService service; 

    // 1. CREAR: Usaremos la lógica del servicio para obtener las referencias
    @PostMapping("/crear")
    public ResponseEntity<?> crear(@RequestBody PlatoIngrediente pi){
        // Usar el servicio con la lógica de getReferenceById()
        PlatoIngrediente nuevo = service.crear(pi); 
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @GetMapping("/listar")
    public List<PlatoIngrediente> listar(){
        return repo.findAll();
    }

    // 2. OBTENER: Ahora se requiere idPlato e idIngrediente
    // El método original por ID simple ya NO ES VÁLIDO.
    @GetMapping("/{idPlato}/{idIngrediente}")
    public Optional<Object> obtenerPorClave(
            @PathVariable int idPlato, 
            @PathVariable int idIngrediente)
    {
        PlatoIngredienteId id = new PlatoIngredienteId(idPlato, idIngrediente);
        
        return repo.findById(id)
            .map(ResponseEntity::ok);
            
    }

    // 3. ELIMINAR: Usa el método que ya tenías, pero en el servicio
    @DeleteMapping("/eliminar/{idPlato}/{idIngrediente}")
    public ResponseEntity<?> eliminarPorIDs(
            @PathVariable int idPlato, 
            @PathVariable int idIngrediente
    ){
        // Usar el método que ya existía, pero con los tipos correctos (Long)
        repo.deleteByPlato_IdPlatoAndIngrediente_IdIngrediente(idPlato, idIngrediente);
        return ResponseEntity.ok("Eliminado correctamente");
    }

    @GetMapping("/plato/{idPlato}")
    public List<PlatoIngrediente> listarPorPlato(@PathVariable int idPlato){
        return repo.findByPlato_IdPlato(idPlato);
    }
}