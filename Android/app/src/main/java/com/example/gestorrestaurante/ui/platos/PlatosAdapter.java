package com.example.gestorrestaurante.ui.platos;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gestorrestaurante.R;
import com.example.gestorrestaurante.model.Plato;

import java.util.List;

public class PlatosAdapter extends RecyclerView.Adapter<PlatosAdapter.PlatoViewHolder> {

    public interface OnPlatoClickListener {
        void onPlatoClick(Plato plato);
        void onPlatoLongClick(Plato plato);
    }

    private List<Plato> platos;
    private OnPlatoClickListener listener;

    public PlatosAdapter(List<Plato> platos, OnPlatoClickListener listener) {
        this.platos = platos;
        this.listener = listener;
    }

    @NonNull
    @Override
    public PlatoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_plato, parent, false);
        return new PlatoViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull PlatoViewHolder holder, int position) {
        Plato plato = platos.get(position);

        holder.tvNombre.setText(plato.getNombre());
        holder.tvDescripcion.setText(plato.getDescripcion());

        String textoPrecio = "Precio: " + plato.getPrecio();
        holder.tvPrecio.setText(textoPrecio);

        holder.itemView.setOnClickListener(view -> listener.onPlatoClick(plato));

        holder.itemView.setOnLongClickListener(view -> {
            listener.onPlatoLongClick(plato);
            return true;
        });
    }

    @Override
    public int getItemCount() {
        if (platos != null) {
            return platos.size();
        } else {
            return 0;
        }
    }

    static class PlatoViewHolder extends RecyclerView.ViewHolder {

        TextView tvNombre;
        TextView tvDescripcion;
        TextView tvPrecio;

        PlatoViewHolder(@NonNull View itemView) {
            super(itemView);
            tvNombre = itemView.findViewById(R.id.tvNombrePlatoItem);
            tvDescripcion = itemView.findViewById(R.id.tvDescripcionPlatoItem);
            tvPrecio = itemView.findViewById(R.id.tvPrecioPlatoItem);
        }
    }
}
