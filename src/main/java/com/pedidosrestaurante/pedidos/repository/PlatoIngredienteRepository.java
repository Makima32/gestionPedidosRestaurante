package com.pedidosrestaurante.pedidos.repository;

import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlatoIngredienteRepository extends JpaRepository<PlatoIngrediente, PlatoIngredienteId> {

    // Borrar todas las relaciones de un plato
    void deleteByPlato_IdPlato(int idPlato);

    // Borrar todas las relaciones de un ingrediente
    void deleteByIngrediente_IdIngrediente(int idIngrediente);

    // Borrar UNA relación concreta plato-ingrediente
    void deleteByPlato_IdPlatoAndIngrediente_IdIngrediente(int idPlato, int idIngrediente);

    // Listar relaciones por plato
    List<PlatoIngrediente> findByPlato_IdPlato(int idPlato);

    // (Opcional) Listar relaciones por ingrediente
    List<PlatoIngrediente> findByIngrediente_IdIngrediente(int idIngrediente);
}
