package com.example.gestorrestaurante.ui.ingredientes;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.model.Ingrediente;
import com.example.gestorrestaurante.network.ApiClient;
import com.example.gestorrestaurante.network.IngredienteApi;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class IngredienteFormActivity extends AppCompatActivity {

    private EditText etNombre, etDescripcion, etAlergenos, etStock, etImagen;
    private CheckBox cbVegano;
    private Button btnGuardar, btnEliminar;

    private IngredienteApi ingredienteApi;
    private int ingredienteId = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ingrediente_form);

        etNombre = findViewById(R.id.etNombreIngrediente);
        etDescripcion = findViewById(R.id.etDescripcionIngrediente);
        etAlergenos = findViewById(R.id.etAlergenosIngrediente);
        etStock = findViewById(R.id.etStockIngrediente);
        etImagen = findViewById(R.id.etImagenIngrediente);
        cbVegano = findViewById(R.id.cbVegano);
        btnGuardar = findViewById(R.id.btnGuardarIngrediente);
        btnEliminar = findViewById(R.id.btnEliminarIngrediente);

        findViewById(R.id.btnBackIngredienteForm).setOnClickListener(v -> finish());

        ingredienteApi = ApiClient.getClient(this).create(IngredienteApi.class);

        if (getIntent().hasExtra("ingredienteId")) {
            ingredienteId = getIntent().getIntExtra("ingredienteId", -1);
            cargarIngrediente(ingredienteId);
            btnEliminar.setVisibility(View.VISIBLE);
        } else {
            btnEliminar.setVisibility(View.GONE);
        }

        btnGuardar.setOnClickListener(v -> guardarIngrediente());
        btnEliminar.setOnClickListener(v -> eliminarIngrediente());
    }

    private void cargarIngrediente(int id) {
        ingredienteApi.getIngrediente(id).enqueue(new Callback<Ingrediente>() {
            @Override
            public void onResponse(Call<Ingrediente> call, Response<Ingrediente> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Ingrediente i = response.body();
                    etNombre.setText(i.getNombre());
                    etDescripcion.setText(i.getDescripcion());
                    etAlergenos.setText(i.getAlergenos());
                    etStock.setText(String.valueOf(i.getStock()));
                    cbVegano.setChecked(i.isEsVegano());
                    etImagen.setText(i.getImagen());
                } else {
                    mostrarError("Error al cargar ingrediente", response);
                }
            }

            @Override
            public void onFailure(Call<Ingrediente> call, Throwable t) {
                Toast.makeText(IngredienteFormActivity.this,
                        "Fallo de conexión: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void guardarIngrediente() {
        if (!validarFormulario()) {
            return;
        }

        String nombre = etNombre.getText().toString().trim();
        String descripcion = etDescripcion.getText().toString().trim();
        String alergenos = etAlergenos.getText().toString().trim();
        String stockStr = etStock.getText().toString().trim();
        String imagen = etImagen.getText().toString().trim();
        boolean esVegano = cbVegano.isChecked();

        int stock = Integer.parseInt(stockStr);

        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setNombre(nombre);
        ingrediente.setDescripcion(descripcion);
        ingrediente.setAlergenos(alergenos);
        ingrediente.setStock(stock);
        ingrediente.setEsVegano(esVegano);
        ingrediente.setImagen(imagen);

        btnGuardar.setEnabled(false);

        Call<Void> call = ingredienteId == -1
                ? ingredienteApi.createIngrediente(ingrediente)
                : ingredienteApi.updateIngrediente(ingredienteId, ingrediente);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                btnGuardar.setEnabled(true);

                if (response.isSuccessful()) {
                    Toast.makeText(IngredienteFormActivity.this,
                            "Ingrediente guardado correctamente",
                            Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    mostrarError("Error al guardar ingrediente", response);
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                btnGuardar.setEnabled(true);
                Toast.makeText(IngredienteFormActivity.this,
                        "Fallo de conexión al guardar: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private boolean validarFormulario() {
        String nombre = etNombre.getText().toString().trim();
        String descripcion = etDescripcion.getText().toString().trim();
        String stockStr = etStock.getText().toString().trim();
        String imagen = etImagen.getText().toString().trim();

        if (nombre.isEmpty()) {
            etNombre.setError("El nombre es obligatorio");
            etNombre.requestFocus();
            return false;
        }

        if (nombre.length() < 2) {
            etNombre.setError("El nombre debe tener al menos 2 caracteres");
            etNombre.requestFocus();
            return false;
        }

        if (nombre.length() > 50) {
            etNombre.setError("El nombre no puede superar 50 caracteres");
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

        if (descripcion.length() > 200) {
            etDescripcion.setError("La descripción no puede superar 200 caracteres");
            etDescripcion.requestFocus();
            return false;
        }

        if (stockStr.isEmpty()) {
            etStock.setError("El stock es obligatorio");
            etStock.requestFocus();
            return false;
        }

        int stock;
        try {
            stock = Integer.parseInt(stockStr);
        } catch (NumberFormatException e) {
            etStock.setError("El stock debe ser un número entero");
            etStock.requestFocus();
            return false;
        }

        if (stock < 0) {
            etStock.setError("El stock no puede ser negativo");
            etStock.requestFocus();
            return false;
        }

        if (stock > 9999) {
            etStock.setError("El stock no puede superar 9999");
            etStock.requestFocus();
            return false;
        }

        if (!imagen.isEmpty() && imagen.length() > 100) {
            etImagen.setError("El nombre o URL de imagen es demasiado largo");
            etImagen.requestFocus();
            return false;
        }

        return true;
    }

    private void eliminarIngrediente() {
        if (ingredienteId == -1) return;

        new AlertDialog.Builder(this)
                .setTitle("Eliminar ingrediente")
                .setMessage("¿Seguro que quieres eliminar este ingrediente?")
                .setPositiveButton("Sí", (dialog, which) -> confirmarEliminacion())
                .setNegativeButton("Cancelar", null)
                .show();
    }

    private void confirmarEliminacion() {
        btnEliminar.setEnabled(false);

        ingredienteApi.deleteIngrediente(ingredienteId).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                btnEliminar.setEnabled(true);

                if (response.isSuccessful()) {
                    Toast.makeText(IngredienteFormActivity.this,
                            "Ingrediente eliminado correctamente",
                            Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    mostrarError("Error al eliminar ingrediente", response);
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                btnEliminar.setEnabled(true);
                Toast.makeText(IngredienteFormActivity.this,
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