package com.pedidosrestaurante.pedidos.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId;

import jakarta.persistence.*;

@Entity
@Table(name = "plato_ingrediente")
public class PlatoIngrediente {

    @EmbeddedId
    private PlatoIngredienteId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("platoId")
    @JoinColumn(name = "id_plato")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler", "ingredientes" })
    private Plato plato;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredienteId")
    @JoinColumn(name = "id_ingrediente")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler", "ingredientes" })
    private Ingrediente ingrediente;

    @Column(nullable = false)
    private int cantidad;

    public PlatoIngrediente() {
        this.id = new PlatoIngredienteId();
    }

    public PlatoIngredienteId getId() {
        return id;
    }

    public void setId(PlatoIngredienteId id) {
        this.id = id;
    }

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
        this.id.setPlatoId(plato.getIdPlato());
    }

    public Ingrediente getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
        this.id.setIngredienteId(ingrediente.getIdIngrediente());
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}