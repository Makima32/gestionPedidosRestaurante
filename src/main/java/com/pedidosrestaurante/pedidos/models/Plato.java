package com.pedidosrestaurante.pedidos.models;

import java.util.List;
import java.util.ArrayList; 

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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

    @OneToMany(
        mappedBy = "plato", 
        // Permite guardar/actualizar/eliminar PlatoIngrediente cuando se opera sobre Plato
        cascade = CascadeType.ALL,
        orphanRemoval = true 
    )
    @JsonIgnoreProperties("plato") 
    private List<PlatoIngrediente> ingredientes = new ArrayList<>(); 

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio")
    private double precio;

    @Column(name = "imagen")
    private String imagen;
    
    // --- Métodos de Conveniencia y Constructores ---

    public void addIngrediente(PlatoIngrediente platoIngrediente) {
        // Establece la relación bidireccional
        platoIngrediente.setPlato(this);
        this.ingredientes.add(platoIngrediente);
    }

    public Plato() {
    }

    public Plato(String nombre, String descripcion, double precio, String imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }

    // --- Getters y Setters ---

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

    // ELIMINAMOS LA LÓGICA DE BIDIRECCIONALIDAD EN EL SETTER DE PLATO, 
    // USANDO EL MÉTODO addIngrediente PARA MANTENER LA REFERENCIA.
    public void setIngredientes(List<PlatoIngrediente> ingredientes) {
        // Limpiamos la lista actual antes de añadir los nuevos
        this.ingredientes.clear(); 
        if (ingredientes != null) {
            for (PlatoIngrediente pi : ingredientes) {
                // Usamos el método de conveniencia para asegurar la bidireccionalidad
                this.addIngrediente(pi); 
            }
        }
    }
}