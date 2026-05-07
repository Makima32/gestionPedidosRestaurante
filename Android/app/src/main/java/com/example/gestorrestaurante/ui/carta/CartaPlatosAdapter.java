package com.example.gestorrestaurante.ui.carta;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.model.Plato;

import java.util.List;

public class CartaPlatosAdapter extends RecyclerView.Adapter<CartaPlatosAdapter.CartaViewHolder> {

    private final List<Plato> platos;

    public CartaPlatosAdapter(List<Plato> platos) {
        this.platos = platos;
    }

    @NonNull
    @Override
    public CartaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_carta_plato, parent, false);
        return new CartaViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CartaViewHolder holder, int position) {
        Plato plato = platos.get(position);

        holder.tvNombre.setText(plato.getNombre());

        String descripcion = plato.getDescripcion();
        if (descripcion == null || descripcion.trim().isEmpty()) {
            descripcion = "Sin descripción disponible";
        }

        holder.tvDescripcion.setText(descripcion);
        holder.tvPrecio.setText(String.format("Precio: %.2f €", plato.getPrecio()));
    }

    @Override
    public int getItemCount() {
        return platos != null ? platos.size() : 0;
    }

    static class CartaViewHolder extends RecyclerView.ViewHolder {

        TextView tvNombre;
        TextView tvDescripcion;
        TextView tvPrecio;

        CartaViewHolder(@NonNull View itemView) {
            super(itemView);
            tvNombre = itemView.findViewById(R.id.tvNombreCartaPlato);
            tvDescripcion = itemView.findViewById(R.id.tvDescripcionCartaPlato);
            tvPrecio = itemView.findViewById(R.id.tvPrecioCartaPlato);
        }
    }
}