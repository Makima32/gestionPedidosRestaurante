package com.pedidosrestaurante.pedidos.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.pedidosrestaurante.pedidos.service.UserDetailsServiceImpl;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Buscamos la cabecera "Authorization" en la petición
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // omprobamos si trae el token y si empieza por "Bearer"
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Quitamos la palabra "Bearer "
            try {
                username = jwtUtil.extractUsername(jwt); // La Fábrica lee el nombre
            } catch (Exception e) {
                System.out.println("Atención: Token inválido, malformado o expirado.");
            }
        }

        // Si hemos sacado un nombre del token y el usuario no está ya validado...
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Vamos a la base de datos a por sus datos y sus roles
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            //  Comprobamos que el token sea valido
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {

                // Creamos el token de autenticación
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Le decimos a Spring que este usuario ya puede pasar
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // 7. Seguimos la cadena (hacia los controladores o hacia el rechazo)
        chain.doFilter(request, response);
    }
}