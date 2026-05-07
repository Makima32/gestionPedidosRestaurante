package com.example.gestorrestaurante.ui.ingredientes;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.model.Ingrediente;
import com.example.gestorrestaurante.network.ApiClient;
import com.example.gestorrestaurante.network.IngredienteApi;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class IngredientesListActivity extends AppCompatActivity
        implements IngredientesAdapter.OnIngredienteClickListener {

    private RecyclerView recyclerIngredientes;
    private FloatingActionButton fabAddIngrediente;
    private IngredienteApi ingredienteApi;
    private IngredientesAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ingredientes_list);

        recyclerIngredientes = findViewById(R.id.recyclerIngredientes);
        fabAddIngrediente = findViewById(R.id.fabAddIngrediente);

        recyclerIngredientes.setLayoutManager(new LinearLayoutManager(this));

        ingredienteApi = ApiClient.getClient(this).create(IngredienteApi.class);

        findViewById(R.id.btnBackIngredientes).setOnClickListener(v -> finish());

        fabAddIngrediente.setOnClickListener(v -> {
            Intent intent = new Intent(this, IngredienteFormActivity.class);
            startActivity(intent);
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        cargarIngredientes();
    }

    private void cargarIngredientes() {
        ingredienteApi.getIngredientes().enqueue(new Callback<List<Ingrediente>>() {
            @Override
            public void onResponse(Call<List<Ingrediente>> call, Response<List<Ingrediente>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    adapter = new IngredientesAdapter(response.body(), IngredientesListActivity.this);
                    recyclerIngredientes.setAdapter(adapter);
                } else {
                    Toast.makeText(IngredientesListActivity.this,
                            "Error al cargar ingredientes. Código: " + response.code(),
                            Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<Ingrediente>> call, Throwable t) {
                Toast.makeText(IngredientesListActivity.this,
                        "Fallo de conexión: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public void onIngredienteClick(Ingrediente ingrediente) {
        Intent intent = new Intent(this, IngredienteFormActivity.class);
        intent.putExtra("ingredienteId", ingrediente.getIdIngrediente());
        startActivity(intent);
    }

    @Override
    public void onIngredienteLongClick(Ingrediente ingrediente) {
        ingredienteApi.deleteIngrediente(ingrediente.getIdIngrediente())
                .enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {
                        if (response.isSuccessful()) {
                            Toast.makeText(IngredientesListActivity.this,
                                    "Ingrediente eliminado correctamente",
                                    Toast.LENGTH_SHORT).show();
                            cargarIngredientes();
                        } else {
                            Toast.makeText(IngredientesListActivity.this,
                                    "Error al eliminar. Código: " + response.code(),
                                    Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        Toast.makeText(IngredientesListActivity.this,
                                "Fallo de conexión al eliminar: " + t.getMessage(),
                                Toast.LENGTH_LONG).show();
                    }
                });
    }
}