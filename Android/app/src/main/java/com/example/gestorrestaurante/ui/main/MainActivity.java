package com.example.gestorrestaurante.ui.main;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.network.TokenManager;
import com.example.gestorrestaurante.ui.auth.LoginActivity;
import com.example.gestorrestaurante.ui.carta.CartaActivity;
import com.example.gestorrestaurante.ui.ingredientes.IngredientesListActivity;
import com.example.gestorrestaurante.ui.platos.PlatosListActivity;

public class MainActivity extends AppCompatActivity {

    private TextView btnLogout;
    private TokenManager tokenManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        tokenManager = new TokenManager(this);

        if (tokenManager.getToken() == null) {
            abrirLogin();
            return;
        }

        if (!tokenManager.isAdmin()) {
            abrirCarta();
            return;
        }

        setContentView(R.layout.activity_main);

        btnLogout = findViewById(R.id.btnLogout);

        findViewById(R.id.btnIngredientes).setOnClickListener(v ->
                startActivity(new Intent(this, IngredientesListActivity.class)));

        findViewById(R.id.btnPlatos).setOnClickListener(v ->
                startActivity(new Intent(this, PlatosListActivity.class)));

        btnLogout.setOnClickListener(v -> {
            tokenManager.clearSession();
            abrirLogin();
        });
    }

    private void abrirLogin() {
        Intent intent = new Intent(MainActivity.this, LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    private void abrirCarta() {
        Intent intent = new Intent(MainActivity.this, CartaActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}