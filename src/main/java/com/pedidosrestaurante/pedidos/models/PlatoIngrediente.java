// Archivo: com/pedidosrestaurante/pedidos/models/PlatoIngrediente.java
package com.pedidosrestaurante.pedidos.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn; // Necesario para la FK
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "plato_ingrediente") // Asumimos este nombre de tabla
public class PlatoIngrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // ID de la tabla intermedia

    // Mapeo a la entidad Plato
    @ManyToOne 
    @JoinColumn(name = "id_plato", nullable = false) // <--- ¡LA CLAVE DE LA SOLUCIÓN!
    private Plato plato;

    // Mapeo a la entidad Ingrediente (asumiendo que existe)
    @ManyToOne 
    @JoinColumn(name = "id_ingrediente", nullable = false) // Asumiendo que esta es la otra FK
    @JsonIgnoreProperties("ingredientes") // <-- ROMPE EL CICLO AQUÍ
    private Ingrediente ingrediente; 

    @Column(name = "cantidad")
    private int cantidad;

    // [ Aquí van los Getters, Setters y Constructores ]

    public PlatoIngrediente() {}

    public PlatoIngrediente(Plato plato, Ingrediente ingrediente, int cantidad) {
        this.plato = plato;
        this.ingrediente = ingrediente;
        this.cantidad = cantidad;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
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