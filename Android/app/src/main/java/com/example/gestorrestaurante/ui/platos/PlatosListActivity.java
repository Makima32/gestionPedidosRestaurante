package com.example.gestorrestaurante.ui.platos;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.model.Plato;
import com.example.gestorrestaurante.network.ApiClient;
import com.example.gestorrestaurante.network.PlatoApi;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PlatosListActivity extends AppCompatActivity
        implements PlatosAdapter.OnPlatoClickListener {

    private RecyclerView recyclerPlatos;
    private FloatingActionButton fabAddPlato;
    private PlatoApi platoApi;
    private PlatosAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_platos_list);

        recyclerPlatos = findViewById(R.id.recyclerPlatos);
        fabAddPlato = findViewById(R.id.fabAddPlato);

        recyclerPlatos.setLayoutManager(new LinearLayoutManager(this));

        platoApi = ApiClient.getClient(this).create(PlatoApi.class);

        findViewById(R.id.btnBackPlatos).setOnClickListener(v -> finish());

        fabAddPlato.setOnClickListener(v -> {
            Intent intent = new Intent(this, PlatoFormActivity.class);
            startActivity(intent);
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        cargarPlatos();
    }

    private void cargarPlatos() {
        platoApi.getPlatos().enqueue(new Callback<List<Plato>>() {
            @Override
            public void onResponse(Call<List<Plato>> call, Response<List<Plato>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    adapter = new PlatosAdapter(response.body(), PlatosListActivity.this);
                    recyclerPlatos.setAdapter(adapter);
                } else {
                    Toast.makeText(PlatosListActivity.this,
                            "Error al cargar platos. Código: " + response.code(),
                            Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<Plato>> call, Throwable t) {
                Toast.makeText(PlatosListActivity.this,
                        "Fallo de conexión: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public void onPlatoClick(Plato plato) {
        Intent intent = new Intent(this, PlatoFormActivity.class);
        intent.putExtra("platoId", plato.getIdPlato());
        startActivity(intent);
    }

    @Override
    public void onPlatoLongClick(Plato plato) {
        platoApi.deletePlato(plato.getIdPlato())
                .enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {
                        if (response.isSuccessful()) {
                            Toast.makeText(PlatosListActivity.this,
                                    "Plato eliminado correctamente",
                                    Toast.LENGTH_SHORT).show();
                            cargarPlatos();
                        } else {
                            Toast.makeText(PlatosListActivity.this,
                                    "Error al eliminar. Código: " + response.code(),
                                    Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        Toast.makeText(PlatosListActivity.this,
                                "Fallo de conexión al eliminar: " + t.getMessage(),
                                Toast.LENGTH_LONG).show();
                    }
                });
    }
}