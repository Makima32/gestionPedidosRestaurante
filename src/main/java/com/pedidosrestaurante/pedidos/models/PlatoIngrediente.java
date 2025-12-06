package com.pedidosrestaurante.pedidos.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId;

// 🚨 Importaciones para Hibernate ON DELETE CASCADE
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

// Usando 'jakarta' para Spring Boot 3+
import jakarta.persistence.*;

@Entity
@Table(name = "plato_ingrediente")
public class PlatoIngrediente {

    @EmbeddedId // Indica que la clave primaria es compuesta
    private PlatoIngredienteId id;

    // Relación Plato: Mantiene la consistencia de la clave compuesta
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("platoId") // Mapea la FK 'platoId' a la clave incrustada
    @JoinColumn(name = "id_plato") // Nombre real de la columna FK en la tabla
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "ingredientes"})
    private Plato plato;

    // 🚨 Relación Ingrediente: ¡AÑADIR ON DELETE CASCADE!
    // Esto genera la instrucción a nivel de base de datos para borrar las referencias.
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredienteId") // Mapea la FK 'ingredienteId' a la clave incrustada
    @JoinColumn(name = "id_ingrediente") // Nombre real de la columna FK en la tabla
    @OnDelete(action = OnDeleteAction.CASCADE) // 💥 SOLUCIÓN AL ERROR DE CLAVE FORÁNEA
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "platosIngredientes"})
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
        if (this.id != null && plato != null) {
              this.id.setPlatoId(plato.getIdPlato()); 
        }
    }

    public Ingrediente getIngrediente() { return ingrediente; }
    // Cuando estableces el ingrediente, también actualizas la clave compuesta
    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
        if (this.id != null && ingrediente != null) {
            this.id.setIngredienteId(ingrediente.getIdIngrediente());
        }
    }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}