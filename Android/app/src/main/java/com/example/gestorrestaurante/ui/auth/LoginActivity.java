package com.example.gestorrestaurante.ui.auth;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.network.ApiClient;
import com.example.gestorrestaurante.network.AuthApi;
import com.example.gestorrestaurante.network.LoginRequest;
import com.example.gestorrestaurante.network.LoginResponse;
import com.example.gestorrestaurante.network.TokenManager;
import com.example.gestorrestaurante.ui.carta.CartaActivity;
import com.example.gestorrestaurante.ui.main.MainActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private EditText etUsuario;
    private EditText etPassword;
    private Button btnLogin;

    private AuthApi authApi;
    private TokenManager tokenManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        tokenManager = new TokenManager(this);

        if (tokenManager.getToken() != null) {
            abrirPantallaSegunRol();
            return;
        }

        etUsuario = findViewById(R.id.etUsuarioLogin);
        etPassword = findViewById(R.id.etPasswordLogin);
        btnLogin = findViewById(R.id.btnLogin);

        authApi = ApiClient.getClient(this).create(AuthApi.class);

        btnLogin.setOnClickListener(v -> hacerLogin());
    }

    private void hacerLogin() {
        String usuario = etUsuario.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        if (TextUtils.isEmpty(usuario)) {
            etUsuario.setError("Introduce el usuario");
            etUsuario.requestFocus();
            return;
        }

        if (usuario.length() < 3) {
            etUsuario.setError("El usuario debe tener al menos 3 caracteres");
            etUsuario.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(password)) {
            etPassword.setError("Introduce la contraseña");
            etPassword.requestFocus();
            return;
        }

        if (password.length() < 4) {
            etPassword.setError("La contraseña debe tener al menos 4 caracteres");
            etPassword.requestFocus();
            return;
        }

        btnLogin.setEnabled(false);

        LoginRequest request = new LoginRequest(usuario, password);

        authApi.login(request).enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                btnLogin.setEnabled(true);

                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse loginResponse = response.body();

                    if (loginResponse.getJwt() == null || loginResponse.getJwt().isEmpty()) {
                        Toast.makeText(LoginActivity.this,
                                "El backend no devolvió token JWT",
                                Toast.LENGTH_LONG).show();
                        return;
                    }

                    tokenManager.saveSession(
                            loginResponse.getJwt(),
                            loginResponse.getUsername(),
                            loginResponse.getRol()
                    );

                    Toast.makeText(LoginActivity.this, "Login correcto", Toast.LENGTH_SHORT).show();
                    abrirPantallaSegunRol();

                } else if (response.code() == 401) {
                    Toast.makeText(LoginActivity.this,
                            "Usuario o contraseña incorrectos",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(LoginActivity.this,
                            "Error en login. Código: " + response.code(),
                            Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                btnLogin.setEnabled(true);
                Toast.makeText(LoginActivity.this,
                        "Fallo de conexión: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void abrirPantallaSegunRol() {
        Intent intent;

        if (tokenManager.isAdmin()) {
            intent = new Intent(LoginActivity.this, MainActivity.class);
        } else {
            intent = new Intent(LoginActivity.this, CartaActivity.class);
        }

        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}