package com.pedidosrestaurante.pedidos.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                //Habilitamos CORS 
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Deshabilitamos CSRF (No es necesario en APIs REST que usan JWT)
                .csrf(csrf -> csrf.disable())

                // Le decimos que no guarde sesiones en memoria (Stateless)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Instrucciones de que está protegido y qué no
                .authorizeHttpRequests(auth -> auth
                        // --- RUTAS PÚBLICAS (No piden token) ---

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/platos", "/platos/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/ingredientes", "/ingredientes/**").permitAll()

                        // Chatbot y Login
                        .requestMatchers("/gemini/chat").permitAll()
                        .requestMatchers("/auth/**").permitAll() // <--- ESTE ES EL PASO CRÍTICO
                        // --- RUTAS PROTEGIDAS ---
                        // Cualquier otra petición (POST para añadir platos, DELETE, etc.) requerirá
                        // Token
                        .anyRequest().authenticated())

                // JwtRequestFilter atento a las solicitudes 
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Configuración global de CORS para permitir a tu React entrar
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permitir cualquier cabecera
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // Permitir credenciales/tokens
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //   encriptar contraseñas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Gestor de autenticación para login
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}