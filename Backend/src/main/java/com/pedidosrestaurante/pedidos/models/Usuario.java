package com.pedidosrestaurante.pedidos.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name="usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_usuario")
    private int idUsuario;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Column(name="nombre", unique = true)
    private String nombre;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Column(name="password")
    private String password;
    

    @Column(name="rol", columnDefinition = "VARCHAR(255) DEFAULT 'user'")
    private String rol = "user";


    @NotBlank(message = "El correo no puede estar vacío")
    @Column(name="correo")
    private String correo;
    public Usuario(){}

   
    
    public Usuario(@NotBlank(message = "El nombre no puede estar vacío") String nombre,
            @NotBlank(message = "La contraseña no puede estar vacía") String password,
            @NotBlank(message = "El rol no puede estar vacío") String rol,
            @NotBlank(message = "El correo no puede estar vacío") String correo) {
        this.nombre = nombre;
        this.password = password;
        this.rol = rol;
        this.correo = correo;
    }



    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }



    public String getCorreo() {
        return correo;
    }



    public void setCorreo(String correo) {
        this.correo = correo;
    }


    
    
}
