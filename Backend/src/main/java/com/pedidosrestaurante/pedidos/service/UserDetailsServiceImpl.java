
package com.pedidosrestaurante.pedidos.service;
import com.pedidosrestaurante.pedidos.models.Usuario;
import com.pedidosrestaurante.pedidos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        // Buscamos tu Usuario en la base de datos
        Usuario usuario = usuarioRepository.findByNombre(username)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario " + username + " no existe en la base de datos"));

        // Extraemos su rol y le añadimos el prefijo "ROLE_" 
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + usuario.getRol().toUpperCase());

        // Convertimos tu "Usuario" al "User" oficial que entiende Spring Security
        return new User(
                usuario.getNombre(), 
                usuario.getPassword(), 
                Collections.singletonList(authority) 
        );
    }
}