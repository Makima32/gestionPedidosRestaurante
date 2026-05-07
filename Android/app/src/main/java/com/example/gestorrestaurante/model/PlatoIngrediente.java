package com.example.gestorrestaurante.model;

public class PlatoIngrediente {

    private PlatoIngredienteId id;
    private Ingrediente ingrediente;
    private int cantidad;

    public PlatoIngrediente() {
    }

    public PlatoIngredienteId getId() {
        return id;
    }

    public void setId(PlatoIngredienteId id) {
        this.id = id;
    }

    public Ingrediente getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}

