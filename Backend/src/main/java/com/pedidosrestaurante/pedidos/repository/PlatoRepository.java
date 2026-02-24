package com.pedidosrestaurante.pedidos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pedidosrestaurante.pedidos.models.Plato;

@Repository
public interface PlatoRepository extends JpaRepository<Plato, Integer> {

}
