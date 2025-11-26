// Archivo: PlatoIngredienteService.java
package com.pedidosrestaurante.pedidos.service;

import com.pedidosrestaurante.pedidos.models.Ingrediente;
import com.pedidosrestaurante.pedidos.models.Plato;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.repository.IngredienteRepository;
import com.pedidosrestaurante.pedidos.repository.PlatoIngredienteRepository;
import com.pedidosrestaurante.pedidos.repository.PlatoRepository;

import jakarta.transaction.Transactional; // Importación para el manejo de transacciones
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class PlatoIngredienteService {

    // Inyección de los repositorios necesarios
    @Autowired
    private PlatoIngredienteRepository piRepository;
    
    @Autowired
    private PlatoRepository platoRepository;
    
    @Autowired
    private IngredienteRepository ingredienteRepository;

    /**
     * Lógica para crear una relación PlatoIngrediente con clave compuesta.
     * Busca las referencias de las entidades antes de guardar.
     */
    @Transactional // 👈 ¡CLAVE! Asegura que todo el proceso sea una única operación atómica
    public PlatoIngrediente crear(PlatoIngrediente pi) {
        
        // --- 1. Obtener las Referencias de las Entidades ---
        // getReferenceById crea un "proxy" o "referencia fantasma".
        // Esto es necesario porque el objeto 'pi' recibido solo tiene los IDs,
        // y Hibernate necesita una entidad gestionada para la FK.
        
        int platoId = pi.getPlato().getIdPlato();
        int ingredienteId = pi.getIngrediente().getIdIngrediente();

        Plato platoRef = platoRepository.getReferenceById(platoId);
        Ingrediente ingredienteRef = ingredienteRepository.getReferenceById(ingredienteId);
        
        // --- 2. Asignar las Referencias al objeto PI ---
        // Los setters de PlatoIngrediente se encargan de actualizar la clave compuesta (id)
        pi.setPlato(platoRef);
        pi.setIngrediente(ingredienteRef);
        
        // --- 3. Guardar la Entidad ---
        return piRepository.save(pi);
    }
}