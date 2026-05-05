package com.pedidosrestaurante.pedidos.controller;

import java.nio.file.*;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pedidosrestaurante.pedidos.models.Usuario;
import com.pedidosrestaurante.pedidos.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String RUTA_IMAGENES = "C:/Users/jefra/DAM/Segundo_año/pedidos/Frontend/pedidos/public/CrudImg/Usuarios/";

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping(value = "/admin", consumes = { "multipart/form-data" })
    public ResponseEntity<?> registrarUsuario(@RequestPart("usuario") String usuarioJson,
                                             @RequestPart(value = "imagen", required = false) MultipartFile archivoImagen) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Usuario usuario = mapper.readValue(usuarioJson, Usuario.class);
            
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            
            guardarImagen(usuario, archivoImagen);
            
            repository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
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

                if (cambios.getPassword() != null && !cambios.getPassword().isEmpty()) {
                    user.setPassword(passwordEncoder.encode(cambios.getPassword()));
                }
                if (cambios.getCorreo() != null) user.setCorreo(cambios.getCorreo());
                if (cambios.getDireccion() != null) user.setDireccion(cambios.getDireccion());
                if (cambios.getRol() != null) user.setRol(cambios.getRol());

                repository.save(user);
                return ResponseEntity.ok(Map.of("mensaje", "Usuario actualizado con éxito"));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuario(@PathVariable Integer id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Integer id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.ok("Usuario eliminado");
    }

    private void guardarImagen(Usuario user, MultipartFile archivoImagen) throws Exception {
        if (archivoImagen != null && !archivoImagen.isEmpty()) {
            String extension = ".png";
            String nombreArchivoFinal = user.getNombre() + extension;
            user.setImagen(user.getNombre());

            Path directorio = Paths.get(RUTA_IMAGENES);
            if (!Files.exists(directorio)) {
                Files.createDirectories(directorio);
            }
            
            Path rutaArchivo = directorio.resolve(nombreArchivoFinal);
            Files.copy(archivoImagen.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);
        }
    }
}