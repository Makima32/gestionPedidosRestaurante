package com.pedidosrestaurante.pedidos.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedidosrestaurante.pedidos.models.Usuario;
import com.pedidosrestaurante.pedidos.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public ResponseEntity<String> registrar(@RequestBody Usuario usuario) {
        repository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Usuario creado correctamente ");
    }

    @GetMapping("/buscar/{nombre}")
    public ResponseEntity<?> obtenerUsuario(@PathVariable String nombre) {
        Optional<Usuario> userOptional = repository.findByNombre(nombre);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
            
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuario no encontrado");
        }
    }

@PutMapping("/modificar/{id}")
public ResponseEntity<?> modificarUsuario(@PathVariable Integer id, @RequestBody Usuario cambios) {
    Optional<Usuario> userOptional = repository.findById(id);

    String cambiosHechos = "";
    if (userOptional.isPresent()) {
        Usuario user = userOptional.get();

        if (cambios.getNombre() != null && !cambios.getNombre().isEmpty()) {
            user.setNombre(cambios.getNombre());
            cambiosHechos += "nombre, ";
        }

        if (cambios.getPassword() != null && !cambios.getPassword().isEmpty()) {
            user.setPassword(cambios.getPassword());
            cambiosHechos += "password, ";
        }

        if (cambios.getCorreo() != null && !cambios.getCorreo().isEmpty()) {
            user.setCorreo(cambios.getCorreo());
            cambiosHechos += "correo ";
        }


        repository.save(user);
        return ResponseEntity.ok(cambiosHechos + " del usuario actualizados con éxito");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body("Usuario no encontrado con ID: " + id);
    }
}
}