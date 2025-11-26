package com.pedidosrestaurante.pedidos.id;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

// Marca esta clase para que pueda ser incrustada como ID en la entidad
@Embeddable 
public class PlatoIngredienteId implements Serializable {

    // Nota: El tipo de dato debe coincidir con el ID de Plato (asumo Long)
    private int platoId; 

    // Nota: El tipo de dato debe coincidir con el ID de Ingrediente (asumo Long)
    private int ingredienteId; 

    // --- CONSTRUCTORES ---
    public PlatoIngredienteId() {}

    public PlatoIngredienteId(int platoId, int ingredienteId) {
        this.platoId = platoId;
        this.ingredienteId = ingredienteId;
    }

    // --- GETTERS y SETTERS ---
    public int getPlatoId() { return platoId; }
    public void setPlatoId(int platoId) { this.platoId = platoId; }

    public int getIngredienteId() { return ingredienteId; }
    public void setIngredienteId(int ingredienteId) { this.ingredienteId = ingredienteId; }


    // --- MÉTODOS REQUERIDOS POR LA CLAVE COMPUESTA ---
    // Hibernate REQUIERE estos métodos para comparar y manejar la clave.

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlatoIngredienteId that = (PlatoIngredienteId) o;
        return Objects.equals(platoId, that.platoId) && 
               Objects.equals(ingredienteId, that.ingredienteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(platoId, ingredienteId);
    }
}