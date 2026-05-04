package com.pedidosrestaurante.pedidos.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pedidosrestaurante.pedidos.models.Usuario;
import com.pedidosrestaurante.pedidos.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    private final String RUTA_IMAGENES = "C:/Users/jefra/DAM/Segundo_año/pedidos/Frontend/pedidos/public/CrudImg/Usuarios/";

    private void guardarImagen(Usuario user, MultipartFile archivoImagen) throws Exception {
        if (archivoImagen != null && !archivoImagen.isEmpty()) {
            String nombreOriginal = archivoImagen.getOriginalFilename();
            if (nombreOriginal == null || !nombreOriginal.toLowerCase().endsWith(".png")) {
                throw new Exception("Solo se permiten archivos .png");
            }
            String nombreSinExtension = nombreOriginal.substring(0, nombreOriginal.lastIndexOf('.'));
            user.setImagen(nombreSinExtension);

            Path directorio = Paths.get(RUTA_IMAGENES);
            if (!Files.exists(directorio)) Files.createDirectories(directorio);
            Path rutaArchivo = directorio.resolve(nombreOriginal);
            Files.copy(archivoImagen.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);
        }
    }

    // Aceptar JSON directo (para registro normal)
    @PostMapping
    public ResponseEntity<?> registrarJSON(@RequestBody Usuario usuario) {
        try {
            repository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Aceptar Multipart (para Admin Crud con imagen)
    @PostMapping(value = "/admin", consumes = {"multipart/form-data"})
    public ResponseEntity<?> registrarMultipart(@RequestPart("usuario") String usuarioJson,
                                               @RequestPart(value = "imagen", required = false) MultipartFile archivoImagen) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Usuario usuario = mapper.readValue(usuarioJson, Usuario.class);
            guardarImagen(usuario, archivoImagen);
            repository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuario(@PathVariable Integer id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> modificarUsuarioMultipart(@PathVariable Integer id, 
                                                      @RequestPart("cambios") String cambiosJson,
                                                      @RequestPart(value = "imagen", required = false) MultipartFile archivoImagen) {
        Optional<Usuario> userOptional = repository.findById(id);
        if (userOptional.isPresent()) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                Usuario cambios = mapper.readValue(cambiosJson, Usuario.class);
                Usuario user = userOptional.get();

                guardarImagen(user, archivoImagen);

                if (cambios.getNombre() != null) user.setNombre(cambios.getNombre());
                if (cambios.getPassword() != null && !cambios.getPassword().isEmpty()) user.setPassword(cambios.getPassword());
                if (cambios.getCorreo() != null) user.setCorreo(cambios.getCorreo());
                if (cambios.getRol() != null) user.setRol(cambios.getRol());
                if (archivoImagen == null && cambios.getImagen() != null) user.setImagen(cambios.getImagen());

                repository.save(user);
                return ResponseEntity.ok("Usuario actualizado con éxito");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Integer id) {
        if (!repository.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe");
        repository.deleteById(id);
        return ResponseEntity.ok("Usuario eliminado");
    }
}
