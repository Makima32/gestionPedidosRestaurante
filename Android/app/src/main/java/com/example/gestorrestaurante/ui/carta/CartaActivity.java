package com.example.gestorrestaurante.ui.carta;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.model.Plato;
import com.example.gestorrestaurante.network.ApiClient;
import com.example.gestorrestaurante.network.PlatoApi;
import com.example.gestorrestaurante.network.TokenManager;
import com.example.gestorrestaurante.ui.auth.LoginActivity;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CartaActivity extends AppCompatActivity {

    private RecyclerView recyclerCarta;
    private TextView btnLogoutCarta;

    private PlatoApi platoApi;
    private TokenManager tokenManager;
    private CartaPlatosAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_carta);

        tokenManager = new TokenManager(this);

        if (tokenManager.getToken() == null) {
            abrirLogin();
            return;
        }

        recyclerCarta = findViewById(R.id.recyclerCarta);
        btnLogoutCarta = findViewById(R.id.btnLogoutCarta);

        recyclerCarta.setLayoutManager(new LinearLayoutManager(this));

        platoApi = ApiClient.getClient(this).create(PlatoApi.class);

        btnLogoutCarta.setOnClickListener(v -> {
            tokenManager.clearSession();
            abrirLogin();
        });

        cargarCarta();
    }

    private void cargarCarta() {
        platoApi.getPlatos().enqueue(new Callback<List<Plato>>() {
            @Override
            public void onResponse(Call<List<Plato>> call, Response<List<Plato>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    adapter = new CartaPlatosAdapter(response.body());
                    recyclerCarta.setAdapter(adapter);
                } else {
                    Toast.makeText(CartaActivity.this,
                            "Error al cargar la carta. Código: " + response.code(),
                            Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<Plato>> call, Throwable t) {
                Toast.makeText(CartaActivity.this,
                        "Fallo de conexión: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void abrirLogin() {
        Intent intent = new Intent(CartaActivity.this, LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}