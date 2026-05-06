package com.pedidosrestaurante.pedidos.controller;

import com.pedidosrestaurante.pedidos.models.Pedido;
import com.pedidosrestaurante.pedidos.models.Usuario;
import com.pedidosrestaurante.pedidos.models.Plato;
import com.pedidosrestaurante.pedidos.models.PlatoPedido;
import com.pedidosrestaurante.pedidos.DTO.PedidoRequestDTO;
import com.pedidosrestaurante.pedidos.DTO.DetallePedidoDTO;
import com.pedidosrestaurante.pedidos.repository.PedidoRepository;
import com.pedidosrestaurante.pedidos.repository.UsuarioRepository;
import com.pedidosrestaurante.pedidos.repository.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PlatoRepository platoRepository;

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody PedidoRequestDTO request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName(); 
        
        System.out.println("DEBUG: Usuario detectado en el Token -> " + username);

        Usuario clienteReal = usuarioRepository.findByNombre(username).orElse(null);

        if (clienteReal == null) {
            System.out.println("DEBUG: El usuario no existe.");
            return ResponseEntity.status(401).body("Usuario no válido en base de datos");
        }

        Pedido nuevoPedido = new Pedido();
        nuevoPedido.setCliente(clienteReal);
        nuevoPedido.setTotal(request.getTotal());
        nuevoPedido.setTipoPedido(request.getTipoPedido());
        nuevoPedido.setEstadoPago("pagado"); 

        if (request.getDetalles() != null) {
            for (DetallePedidoDTO detalleDTO : request.getDetalles()) {
                Plato plato = platoRepository.findById(detalleDTO.getIdPlato())
                        .orElseThrow(() -> new RuntimeException("Plato no encontrado con ID: " + detalleDTO.getIdPlato()));
                
                PlatoPedido platoPedido = new PlatoPedido();
                platoPedido.setPlato(plato);
                platoPedido.setCantidad(detalleDTO.getCantidad());
                
                nuevoPedido.addDetalle(platoPedido);
            }
        }

        Pedido pedidoGuardado = pedidoRepository.save(nuevoPedido);
        return ResponseEntity.ok(pedidoGuardado);
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listarPedidos() {
        return ResponseEntity.ok(pedidoRepository.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEstadoPedido(@PathVariable int id, @RequestBody Pedido pedidoActualizado) {
        Optional<Pedido> pedidoExistente = pedidoRepository.findById(id);
        
        if (pedidoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Pedido pedidoDB = pedidoExistente.get();
        pedidoDB.setEstado(pedidoActualizado.getEstado());
        
        return ResponseEntity.ok(pedidoRepository.save(pedidoDB));
    }
}