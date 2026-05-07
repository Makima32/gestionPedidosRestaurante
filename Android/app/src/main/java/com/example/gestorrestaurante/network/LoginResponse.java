package com.example.gestorrestaurante.network;

public class LoginResponse {

    private String jwt;
    private String username;
    private String rol;

    public LoginResponse() {
    }

    public String getJwt() {
        return jwt;
    }

    public String getUsername() {
        return username;
    }

    public String getRol() {
        return rol;
    }
}