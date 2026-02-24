package com.pedidosrestaurante.pedidos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedidosrestaurante.pedidos.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByNombre(String nombre);
}