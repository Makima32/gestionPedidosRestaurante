package com.pedidosrestaurante.pedidos.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;

@Repository

public interface PlatoIngredienteRepository extends JpaRepository<PlatoIngrediente, Integer> {
   Optional<PlatoIngrediente> findByPlato_IdPlatoAndIngrediente_IdIngrediente(int idPlato, int idIngrediente);

List<PlatoIngrediente> findByPlato_IdPlato(int idPlato);

void deleteByPlato_IdPlatoAndIngrediente_IdIngrediente(int idPlato, int idIngrediente);
}
