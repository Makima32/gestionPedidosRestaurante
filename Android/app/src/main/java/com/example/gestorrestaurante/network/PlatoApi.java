package com.example.gestorrestaurante.network;

import com.example.gestorrestaurante.model.Plato;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface PlatoApi {

    @GET("platos")
    Call<List<Plato>> getPlatos();

    @GET("platos/{id}")
    Call<Plato> getPlato(@Path("id") int id);

    @POST("platos/android")
    Call<Void> createPlato(@Body Plato plato);

    @PUT("platos/android/{id}")
    Call<Void> updatePlato(@Path("id") int id, @Body Plato plato);

    @DELETE("platos/{id}")
    Call<Void> deletePlato(@Path("id") int id);
}