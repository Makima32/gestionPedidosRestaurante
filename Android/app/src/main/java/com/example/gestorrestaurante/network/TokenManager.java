package com.example.gestorrestaurante.network;

import android.content.Context;
import android.content.SharedPreferences;

public class TokenManager {

    private static final String PREF_NAME = "gestor_restaurante_session";
    private static final String KEY_TOKEN = "jwt_token";
    private static final String KEY_USERNAME = "username";
    private static final String KEY_ROL = "rol";

    private final SharedPreferences preferences;

    public TokenManager(Context context) {
        preferences = context.getApplicationContext()
                .getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
    }

    public void saveSession(String token, String username, String rol) {
        preferences.edit()
                .putString(KEY_TOKEN, token)
                .putString(KEY_USERNAME, username)
                .putString(KEY_ROL, rol)
                .apply();
    }

    public String getToken() {
        return preferences.getString(KEY_TOKEN, null);
    }

    public String getUsername() {
        return preferences.getString(KEY_USERNAME, null);
    }

    public String getRol() {
        return preferences.getString(KEY_ROL, null);
    }

    public boolean isAdmin() {
        String rol = getRol();
        return rol != null && rol.equalsIgnoreCase("admin");
    }

    public boolean isUser() {
        String rol = getRol();
        return rol != null && rol.equalsIgnoreCase("user");
    }

    public void clearSession() {
        preferences.edit().clear().apply();
    }
}