package com.example.gestorrestaurante.ui.ingredientes;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.model.Ingrediente;

import java.util.List;

public class IngredientesAdapter extends RecyclerView.Adapter<IngredientesAdapter.IngredienteViewHolder> {

    public interface OnIngredienteClickListener {
        void onIngredienteClick(Ingrediente ingrediente);
        void onIngredienteLongClick(Ingrediente ingrediente);
    }

    private List<Ingrediente> ingredientes;
    private OnIngredienteClickListener listener;

    public IngredientesAdapter(List<Ingrediente> ingredientes,
                               OnIngredienteClickListener listener) {
        this.ingredientes = ingredientes;
        this.listener = listener;
    }

    @NonNull
    @Override
    public IngredienteViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_ingrediente, parent, false);
        return new IngredienteViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull IngredienteViewHolder holder, int position) {
        Ingrediente ing = ingredientes.get(position);

        holder.tvNombre.setText(ing.getNombre());

        String detalle = "Stock: " + ing.getStock();
        if (ing.isEsVegano()) {
            detalle = detalle + " · Vegano";
        }
        holder.tvDetalle.setText(detalle);

        holder.itemView.setOnClickListener(v -> listener.onIngredienteClick(ing));

        holder.itemView.setOnLongClickListener(v -> {
            listener.onIngredienteLongClick(ing);
            return true;
        });
    }

    @Override
    public int getItemCount() {
        return ingredientes != null ? ingredientes.size() : 0;
    }

    static class IngredienteViewHolder extends RecyclerView.ViewHolder {

        TextView tvNombre, tvDetalle;

        IngredienteViewHolder(@NonNull View itemView) {
            super(itemView);
            tvNombre = itemView.findViewById(R.id.tvNombreIngredienteItem);
            tvDetalle = itemView.findViewById(R.id.tvDetalleIngredienteItem);
        }
    }
}
