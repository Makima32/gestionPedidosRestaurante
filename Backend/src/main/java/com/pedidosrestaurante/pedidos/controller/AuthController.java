package com.pedidosrestaurante.pedidos.controller;

import com.pedidosrestaurante.pedidos.models.Usuario;
import com.pedidosrestaurante.pedidos.repository.UsuarioRepository;
import com.pedidosrestaurante.pedidos.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

 @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody Map<String, String> authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.get("username"), authRequest.get("password")));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Usuario o contraseña incorrectos"));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.get("username"));
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(userDetails.getUsername());

        Map<String, Object> response = new HashMap<>();
        response.put("jwt", jwt);
        response.put("username", userDetails.getUsername());

        if (usuarioOpt.isPresent()) {
            Usuario user = usuarioOpt.get();
            response.put("idUsuario", user.getIdUsuario());
            response.put("rol", user.getRol());
            response.put("direccion", user.getDireccion());
            response.put("correo", user.getCorreo()); 
            response.put("imagen", user.getImagen()); 
        } else {
            response.put("rol", "user");
        }

        return ResponseEntity.ok(response);
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Usuario nuevoUsuario) {

        if (usuarioRepository.findByNombre(nuevoUsuario.getNombre()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El nombre de usuario ya está en uso"));
        }

        nuevoUsuario.setPassword(passwordEncoder.encode(nuevoUsuario.getPassword()));

        if (nuevoUsuario.getRol() == null || nuevoUsuario.getRol().isEmpty()) {
            nuevoUsuario.setRol("user");
        }

        usuarioRepository.save(nuevoUsuario);

        return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado con éxito"));
    }
}