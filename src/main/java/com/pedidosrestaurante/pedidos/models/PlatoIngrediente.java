package com.pedidosrestaurante.pedidos.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;

@Entity
@Table(name = "plato_ingrediente")
public class PlatoIngrediente {

    @EmbeddedId 
    private PlatoIngredienteId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("platoId") 
    @JoinColumn(name = "id_plato") 
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "ingredientes"})
    @JsonIgnore
    private Plato plato;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredienteId") 
    @JoinColumn(name = "id_ingrediente") 
    @OnDelete(action = OnDeleteAction.CASCADE) 
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "platosIngredientes"})
    private Ingrediente ingrediente;

    @Column(nullable = false)
    private int cantidad;

    public PlatoIngrediente() {
        this.id = new PlatoIngredienteId();
    }


    public PlatoIngredienteId getId() { return id; }
    public void setId(PlatoIngredienteId id) { this.id = id; }

    public Plato getPlato() { return plato; }
    public void setPlato(Plato plato) {
        this.plato = plato;
        if (this.id != null && plato != null) {
              this.id.setPlatoId(plato.getIdPlato()); 
        }
    }

    public Ingrediente getIngrediente() { return ingrediente; }
    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
        if (this.id != null && ingrediente != null) {
            this.id.setIngredienteId(ingrediente.getIdIngrediente());
        }
    }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}