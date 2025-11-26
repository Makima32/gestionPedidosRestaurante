package com.pedidosrestaurante.pedidos.repository;

import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId; 
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// El segundo tipo genérico cambia de Long (o Integer) a PlatoIngredienteId
public interface PlatoIngredienteRepository extends JpaRepository<PlatoIngrediente, PlatoIngredienteId> {

    // El método de búsqueda por plato sigue siendo válido
    List<PlatoIngrediente> findByPlato_IdPlato(Long idPlato);
    
    // El método de eliminación por IDs también cambia el nombre y tipo de los parámetros
    // Nota: El nombre del método debe ser exactamente el mismo si usas el método de consulta de Spring Data JPA
    void deleteByPlato_IdPlatoAndIngrediente_IdIngrediente(Long idPlato, Long idIngrediente); 
}