package com.example.gestorrestaurante.network;

import android.content.Context;
import android.util.Log;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class AuthInterceptor implements Interceptor {

    private final TokenManager tokenManager;

    public AuthInterceptor(Context context) {
        tokenManager = new TokenManager(context);
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        Request original = chain.request();

        String token = tokenManager.getToken();

        if (token == null || token.trim().isEmpty()) {
            Log.e("JWT_DEBUG", "No hay token guardado");
            return chain.proceed(original);
        }

        Log.d("JWT_DEBUG", "Enviando token: Bearer " + token);

        Request request = original.newBuilder()
                .header("Authorization", "Bearer " + token)
                .build();

        return chain.proceed(request);
    }
}