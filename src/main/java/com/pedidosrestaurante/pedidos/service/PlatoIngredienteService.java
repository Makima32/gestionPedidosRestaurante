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

    @Autowired
    private PlatoIngredienteRepository piRepository;
    
    @Autowired
    private PlatoRepository platoRepository;
    
    @Autowired
    private IngredienteRepository ingredienteRepository;

    
    @Transactional 
    public PlatoIngrediente crear(PlatoIngrediente pi) {
        
        
        int platoId = pi.getPlato().getIdPlato();
        int ingredienteId = pi.getIngrediente().getIdIngrediente();

        Plato platoRef = platoRepository.getReferenceById(platoId);
        Ingrediente ingredienteRef = ingredienteRepository.getReferenceById(ingredienteId);
        
        pi.setPlato(platoRef);
        pi.setIngrediente(ingredienteRef);
        
        return piRepository.save(pi);
    }
}