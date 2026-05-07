package com.example.gestorrestaurante.ui.platos;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.model.Plato;
import com.example.gestorrestaurante.network.ApiClient;
import com.example.gestorrestaurante.network.PlatoApi;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PlatoFormActivity extends AppCompatActivity {

    private EditText etNombre;
    private EditText etDescripcion;
    private EditText etPrecio;
    private EditText etImagen;
    private Button btnGuardar;
    private Button btnEliminar;

    private PlatoApi platoApi;
    private int platoId = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_plato_form);

        etNombre = findViewById(R.id.etNombrePlato);
        etDescripcion = findViewById(R.id.etDescripcionPlato);
        etPrecio = findViewById(R.id.etPrecioPlato);
        etImagen = findViewById(R.id.etImagenPlato);
        btnGuardar = findViewById(R.id.btnGuardarPlato);
        btnEliminar = findViewById(R.id.btnEliminarPlato);

        findViewById(R.id.btnBackPlatoForm).setOnClickListener(v -> finish());

        platoApi = ApiClient.getClient(this).create(PlatoApi.class);

        if (getIntent().hasExtra("platoId")) {
            platoId = getIntent().getIntExtra("platoId", -1);
            cargarPlato(platoId);
            btnEliminar.setVisibility(View.VISIBLE);
        } else {
            btnEliminar.setVisibility(View.GONE);
        }

        btnGuardar.setOnClickListener(view -> guardarPlato());
        btnEliminar.setOnClickListener(view -> eliminarPlato());
    }

    private void cargarPlato(int id) {
        platoApi.getPlato(id).enqueue(new Callback<Plato>() {
            @Override
            public void onResponse(Call<Plato> call, Response<Plato> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Plato p = response.body();

                    etNombre.setText(p.getNombre());
                    etDescripcion.setText(p.getDescripcion());
                    etPrecio.setText(String.valueOf(p.getPrecio()));
                    etImagen.setText(p.getImagen());
                } else {
                    mostrarError("Error al cargar plato", response);
                }
            }

            @Override
            public void onFailure(Call<Plato> call, Throwable t) {
                Toast.makeText(PlatoFormActivity.this,
                        "Fallo de conexión al cargar: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void guardarPlato() {
        if (!validarFormulario()) {
            return;
        }

        String nombre = etNombre.getText().toString().trim();
        String descripcion = etDescripcion.getText().toString().trim();
        String precioStr = etPrecio.getText().toString().trim();
        String imagen = etImagen.getText().toString().trim();

        double precio = Double.parseDouble(precioStr);

        Plato plato = new Plato();
        plato.setNombre(nombre);
        plato.setDescripcion(descripcion);
        plato.setPrecio(precio);
        plato.setImagen(imagen);

        btnGuardar.setEnabled(false);

        Call<Void> call = platoId == -1
                ? platoApi.createPlato(plato)
                : platoApi.updatePlato(platoId, plato);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                btnGuardar.setEnabled(true);

                if (response.isSuccessful()) {
                    Toast.makeText(PlatoFormActivity.this,
                            "Plato guardado correctamente",
                            Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    mostrarError("Error al guardar plato", response);
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                btnGuardar.setEnabled(true);
                Toast.makeText(PlatoFormActivity.this,
                        "Fallo de conexión al guardar: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private boolean validarFormulario() {
        String nombre = etNombre.getText().toString().trim();
        String descripcion = etDescripcion.getText().toString().trim();
        String precioStr = etPrecio.getText().toString().trim();
        String imagen = etImagen.getText().toString().trim();

        if (nombre.isEmpty()) {
            etNombre.setError("El nombre del plato es obligatorio");
            etNombre.requestFocus();
            return false;
        }

        if (nombre.length() < 2) {
            etNombre.setError("El nombre debe tener al menos 2 caracteres");
            etNombre.requestFocus();
            return false;
        }

        if (nombre.length() > 60) {
            etNombre.setError("El nombre no puede superar 60 caracteres");
            etNombre.requestFocus();
            return false;
        }

        if (descripcion.isEmpty()) {
            etDescripcion.setError("La descripción es obligatoria");
            etDescripcion.requestFocus();
            return false;
        }

        if (descripcion.length() < 5) {
            etDescripcion.setError("La descripción debe tener al menos 5 caracteres");
            etDescripcion.requestFocus();
            return false;
        }

        if (descripcion.length() > 250) {
            etDescripcion.setError("La descripción no puede superar 250 caracteres");
            etDescripcion.requestFocus();
            return false;
        }

        if (precioStr.isEmpty()) {
            etPrecio.setError("El precio es obligatorio");
            etPrecio.requestFocus();
            return false;
        }

        double precio;
        try {
            precio = Double.parseDouble(precioStr);
        } catch (NumberFormatException e) {
            etPrecio.setError("El precio debe ser un número válido");
            etPrecio.requestFocus();
            return false;
        }

        if (precio <= 0) {
            etPrecio.setError("El precio debe ser mayor que 0");
            etPrecio.requestFocus();
            return false;
        }

        if (precio > 999.99) {
            etPrecio.setError("El precio no puede superar 999.99");
            etPrecio.requestFocus();
            return false;
        }

        if (!imagen.isEmpty() && imagen.length() > 100) {
            etImagen.setError("El nombre o URL de imagen es demasiado largo");
            etImagen.requestFocus();
            return false;
        }

        return true;
    }

    private void eliminarPlato() {
        if (platoId == -1) return;

        new AlertDialog.Builder(this)
                .setTitle("Eliminar plato")
                .setMessage("¿Seguro que quieres eliminar este plato?")
                .setPositiveButton("Sí", (dialog, which) -> confirmarEliminacion())
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void confirmarEliminacion() {
        btnEliminar.setEnabled(false);

        platoApi.deletePlato(platoId).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                btnEliminar.setEnabled(true);

                if (response.isSuccessful()) {
                    Toast.makeText(PlatoFormActivity.this,
                            "Plato eliminado correctamente",
                            Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    mostrarError("Error al eliminar plato", response);
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                btnEliminar.setEnabled(true);
                Toast.makeText(PlatoFormActivity.this,
                        "Fallo de conexión al eliminar: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void mostrarError(String mensaje, Response<?> response) {
        String errorBody = "";

        try {
            if (response.errorBody() != null) {
                errorBody = response.errorBody().string();
            }
        } catch (IOException e) {
            errorBody = e.getMessage();
        }

        Toast.makeText(
                this,
                mensaje + ". Código: " + response.code() + " " + errorBody,
                Toast.LENGTH_LONG
        ).show();
    }
}