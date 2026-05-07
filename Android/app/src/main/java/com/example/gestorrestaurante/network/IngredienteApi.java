package com.example.gestorrestaurante.network;

import com.example.gestorrestaurante.model.Ingrediente;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface IngredienteApi {

    @GET("ingredientes")
    Call<List<Ingrediente>> getIngredientes();

    @GET("ingredientes/{id}")
    Call<Ingrediente> getIngrediente(@Path("id") int id);

    @POST("ingredientes/android")
    Call<Void> createIngrediente(@Body Ingrediente ingrediente);

    @PUT("ingredientes/android/{id}")
    Call<Void> updateIngrediente(
            @Path("id") int id,
            @Body Ingrediente ingrediente
    );

    @DELETE("ingredientes/{id}")
    Call<Void> deleteIngrediente(@Path("id") int id);
}