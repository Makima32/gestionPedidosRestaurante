package com.pedidosrestaurante.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pedidosrestaurante.pedidos.models.Plato;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.repository.PlatoRepository;
import com.pedidosrestaurante.pedidos.repository.IngredienteRepository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/platos")
public class PlatoController {

    @Autowired
    private PlatoRepository platoRepo;

    @Autowired
    private IngredienteRepository ingredienteRepo;

    private final String RUTA_IMAGENES = "C:/Users/jefra/DAM/Segundo_año/pedidos/Frontend/pedidos/public/CrudImg/Platos/";

    private void guardarImagen(Plato plato, MultipartFile archivoImagen) throws Exception {
        if (archivoImagen != null && !archivoImagen.isEmpty()) {
            String nombreOriginal = archivoImagen.getOriginalFilename();
            String nombreSinExtension = nombreOriginal;

            if (nombreOriginal != null && nombreOriginal.contains(".")) {
                nombreSinExtension = nombreOriginal.substring(0, nombreOriginal.lastIndexOf('.'));
            }

            plato.setImagen(nombreSinExtension);

            Path directorioImagenes = Paths.get(RUTA_IMAGENES);
            if (!Files.exists(directorioImagenes)) {
                Files.createDirectories(directorioImagenes);
            }
            Path rutaArchivo = directorioImagenes.resolve(nombreOriginal);
            Files.copy(archivoImagen.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<?> crearPlato(
            @RequestPart("plato") String platoJson,
            @RequestPart(value = "imagen", required = false) MultipartFile archivoImagen) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Plato plato = objectMapper.readValue(platoJson, Plato.class);

            guardarImagen(plato, archivoImagen);

            if (plato.getIngredientes() != null) {
                for (PlatoIngrediente pi : plato.getIngredientes()) {
                    if (pi.getIngrediente() != null) {
                        int idIngrediente = pi.getIngrediente().getIdIngrediente();
                        if (!ingredienteRepo.existsById(idIngrediente)) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                                    "ID ingrediente " + idIngrediente + " no existe.");
                        }
                        pi.setIngrediente(ingredienteRepo.getReferenceById(idIngrediente));
                        pi.setPlato(plato);
                    }
                }
            }

            platoRepo.save(plato);
            return new ResponseEntity<>("Plato creado correctamente", HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Error al crear el plato: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<?> actualizarPlato(
            @PathVariable int id,
            @RequestPart("cambios") String cambiosJson,
            @RequestPart(value = "imagen", required = false) MultipartFile archivoImagen) {

        Optional<Plato> opt = platoRepo.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.status(404).body("Plato no encontrado");

        Plato plato = opt.get();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Plato cambios = objectMapper.readValue(cambiosJson, Plato.class);

            guardarImagen(plato, archivoImagen);

            if (cambios.getNombre() != null)
                plato.setNombre(cambios.getNombre());
            if (cambios.getDescripcion() != null)
                plato.setDescripcion(cambios.getDescripcion());
            if (cambios.getPrecio() != 0)
                plato.setPrecio(cambios.getPrecio());

            if (archivoImagen == null && cambios.getImagen() != null) {
                plato.setImagen(cambios.getImagen());
            }

            if (cambios.getIngredientes() != null) {
                for (PlatoIngrediente pi : cambios.getIngredientes()) {
                    if (pi.getIngrediente() != null) {
                        int idIng = pi.getIngrediente().getIdIngrediente();
                        pi.setIngrediente(ingredienteRepo.getReferenceById(idIng));
                    }
                }
                plato.actualizarIngredientes(cambios.getIngredientes());
            }

            platoRepo.save(plato);
            return ResponseEntity.ok("Plato actualizado correctamente");

        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<?> listarPlatos() {
        return ResponseEntity.ok(platoRepo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPlato(@PathVariable int id) {
        return platoRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body(null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPlato(@PathVariable int id) {
        Optional<Plato> opt = platoRepo.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.status(404).body("Plato no encontrado");
        try {
            platoRepo.deleteById(id);
            return ResponseEntity.ok("Plato eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("No se puede eliminar: Este plato forma parte de un pedido existente.");
        }
    }
}