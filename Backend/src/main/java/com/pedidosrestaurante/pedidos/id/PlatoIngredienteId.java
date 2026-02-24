package com.pedidosrestaurante.pedidos.id;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable 
public class PlatoIngredienteId implements Serializable {

    private int platoId; 

    private int ingredienteId; 

    public PlatoIngredienteId() {}

    public PlatoIngredienteId(int platoId, int ingredienteId) {
        this.platoId = platoId;
        this.ingredienteId = ingredienteId;
    }

    public int getPlatoId() { return platoId; }
    public void setPlatoId(int platoId) { this.platoId = platoId; }

    public int getIngredienteId() { return ingredienteId; }
    public void setIngredienteId(int ingredienteId) { this.ingredienteId = ingredienteId; }



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