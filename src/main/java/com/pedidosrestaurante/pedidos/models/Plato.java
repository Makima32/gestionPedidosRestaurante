package com.pedidosrestaurante.pedidos.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType; // <-- ¡IMPORTANTE!
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "platos")
public class Plato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_plato")
    private int idPlato;

    // 🛑 MODIFICACIÓN CLAVE AQUÍ:
    @OneToMany(
        mappedBy = "plato", 
        // 1. Añadimos CASCADE.ALL: Cuando borras un Plato, todas las filas de PlatoIngrediente asociadas se borran.
        cascade = CascadeType.ALL,
        // 2. Añadimos orphanRemoval: Permite que Hibernate gestione automáticamente la eliminación de la asociación.
        orphanRemoval = true 
    )
    @JsonIgnoreProperties("plato") 
    private List<PlatoIngrediente> ingredientes;

    @Column(name = "nombre")
    private String nombre;
// ... (resto de atributos, constructores, getters y setters sin cambios)

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio")
    private double precio;

    @Column(name = "imagen")
    private String imagen;

    // [ El resto de Constructores, Getters y Setters no necesitan cambio ]
    public Plato() {
    };

    public Plato(String nombre, String descripcion, double precio, String imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }

    public String getNombre() {
        return nombre;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    @Override
    public String toString() {
        return "Plato [idPlato=" + idPlato + ", nombre=" + nombre + ", descripcion=" + descripcion + ", precio="
                + precio
                + ", imagen=" + imagen + "]";
    }

    public int getIdPlato() {
        return idPlato;
    }

    public void setIdPlato(int idPlato) {
        this.idPlato = idPlato;

    }

    public List<PlatoIngrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<PlatoIngrediente> ingredientes) {
        this.ingredientes = ingredientes;

    }
}