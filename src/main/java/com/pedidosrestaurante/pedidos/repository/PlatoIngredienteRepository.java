package com.pedidosrestaurante.pedidos.repository;

import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId; 
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlatoIngredienteRepository extends JpaRepository<PlatoIngrediente, PlatoIngredienteId> {

    List<PlatoIngrediente> findByPlato_IdPlato(int idPlato);
    
    void deleteByPlato_IdPlatoAndIngrediente_IdIngrediente(int idPlato, int idIngrediente); 
}