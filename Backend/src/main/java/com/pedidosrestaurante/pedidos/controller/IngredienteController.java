package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.pedidosrestaurante.pedidos.models.Ingrediente;
import com.pedidosrestaurante.pedidos.repository.IngredienteRepository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/ingredientes")
public class IngredienteController {

    @Autowired
    private IngredienteRepository repo;

    private final String RUTA_IMAGENES = "C:/Users/jefra/DAM/Segundo_año/pedidos/Frontend/pedidos/public/CrudImg/Ingredientes/";

    private void guardarImagen(Ingrediente ing, MultipartFile archivoImagen) throws Exception {
        if (archivoImagen != null && !archivoImagen.isEmpty()) {
            String nombreOriginal = archivoImagen.getOriginalFilename();
            
            if (nombreOriginal == null || !nombreOriginal.toLowerCase().endsWith(".png")) {
                throw new Exception("Solo se permiten archivos .png");
            }
            
            String nombreSinExtension = nombreOriginal.substring(0, nombreOriginal.lastIndexOf('.'));
            ing.setImagen(nombreSinExtension);

            Path directorio = Paths.get(RUTA_IMAGENES);
            if (!Files.exists(directorio)) Files.createDirectories(directorio);
            
            Path rutaArchivo = directorio.resolve(nombreOriginal);
            Files.copy(archivoImagen.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<String> crearIngrediente(
            @RequestPart("ingrediente") String ingredienteJson,
            @RequestPart(value = "imagen", required = false) MultipartFile archivoImagen) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Ingrediente ingrediente = mapper.readValue(ingredienteJson, Ingrediente.class);
            
            guardarImagen(ingrediente, archivoImagen);
            
            repo.save(ingrediente);
            return ResponseEntity.status(HttpStatus.CREATED).body("Ingrediente creado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<String> actualizarIngrediente(
            @PathVariable int id, 
            @RequestPart("cambios") String cambiosJson,
            @RequestPart(value = "imagen", required = false) MultipartFile archivoImagen) {
        
        Optional<Ingrediente> opt = repo.findById(id);
        if (opt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No encontrado");

        try {
            ObjectMapper mapper = new ObjectMapper();
            Ingrediente cambios = mapper.readValue(cambiosJson, Ingrediente.class);
            Ingrediente ing = opt.get();

            guardarImagen(ing, archivoImagen);
            
            if (cambios.getNombre() != null) ing.setNombre(cambios.getNombre());
            if (cambios.getDescripcion() != null) ing.setDescripcion(cambios.getDescripcion());
            if (cambios.getAlergenos() != null) ing.setAlergenos(cambios.getAlergenos());
            
            ing.setStock(cambios.getStock()); 
            ing.setEsVegano(cambios.isEsVegano());
            
            if (archivoImagen == null && cambios.getImagen() != null) ing.setImagen(cambios.getImagen());

            repo.save(ing);
            return ResponseEntity.ok("Ingrediente actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity<List<Ingrediente>> listarIngredientes() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerIngrediente(@PathVariable int id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarIngrediente(@PathVariable int id) {
        if (!repo.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe");
        repo.deleteById(id);
        return ResponseEntity.ok("Eliminado");
    }
}