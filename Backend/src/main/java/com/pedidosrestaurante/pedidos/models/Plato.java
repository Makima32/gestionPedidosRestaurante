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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "platos")
public class Plato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_plato")
    private int idPlato;

    @OneToMany(
        mappedBy = "plato", 
            cascade = CascadeType.ALL,
        orphanRemoval = true 
    )
    @JsonIgnoreProperties("plato") 
    private List<PlatoIngrediente> ingredientes = new ArrayList<>(); 

    @Column(name = "nombre")
    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @Column(name = "descripcion")
    @NotBlank(message = "La descripción no puede estar vacía")
    private String descripcion;

    @Column(name = "precio")
    @NotNull(message = "El precio no puede ser nulo")
    @Min(value = 0, message = "El precio no puede ser negativo")
    private double precio;

    @Column(name = "imagen")
    private String imagen;
    

    public void addIngrediente(PlatoIngrediente platoIngrediente) {
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
    @JsonIgnoreProperties("plato")
    public List<PlatoIngrediente> getIngredientes() {
        return ingredientes;
    }

    public void actualizarIngredientes(List<PlatoIngrediente> ingredientes) {
        this.ingredientes.clear(); 
        if (ingredientes != null) {
            for (PlatoIngrediente pi : ingredientes) {
                this.addIngrediente(pi); 
            }
        }
    }

    public void setIngredientes(List<PlatoIngrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }

        
}