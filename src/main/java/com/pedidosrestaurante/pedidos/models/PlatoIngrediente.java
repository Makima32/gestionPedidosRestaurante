package com.pedidosrestaurante.pedidos.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId;

import jakarta.persistence.*;

@Entity
@Table(name = "plato_ingrediente")
public class PlatoIngrediente {

    // 1. ELIMINAR EL ID SIMPLE (si existe) y usar la clave incrustada
    @EmbeddedId // Indica que la clave primaria es compuesta
    private PlatoIngredienteId id;

    // 2. Definir la relación Plato (referenciando las columnas de la clave)
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("platoId") // Mapea la FK 'platoId' a la clave incrustada
    @JoinColumn(name = "id_plato") // Nombre real de la columna FK en la tabla
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "ingredientes"})
    private Plato plato;

    // 3. Definir la relación Ingrediente
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredienteId") // Mapea la FK 'ingredienteId' a la clave incrustada
    @JoinColumn(name = "id_ingrediente") // Nombre real de la columna FK en la tabla
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "ingredientes"})
    private Ingrediente ingrediente;

    @Column(nullable = false)
    private int cantidad;

    // --- CONSTRUCTORES ---
    public PlatoIngrediente() {
        this.id = new PlatoIngredienteId();
    }
    // ... otros constructores si los tienes

    // --- GETTERS y SETTERS ---

    public PlatoIngredienteId getId() { return id; }
    public void setId(PlatoIngredienteId id) { this.id = id; }

    public Plato getPlato() { return plato; }
    // Cuando estableces el plato, también actualizas la clave compuesta
    public void setPlato(Plato plato) {
        this.plato = plato;
        this.id.setPlatoId(plato.getIdPlato()); 
    }

    public Ingrediente getIngrediente() { return ingrediente; }
    // Cuando estableces el ingrediente, también actualizas la clave compuesta
    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
        this.id.setIngredienteId(ingrediente.getIdIngrediente());
    }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}