package com.pedidosrestaurante.pedidos.data;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.pedidosrestaurante.pedidos.models.Ingrediente;
import com.pedidosrestaurante.pedidos.models.Plato;
import com.pedidosrestaurante.pedidos.models.PlatoIngrediente;
import com.pedidosrestaurante.pedidos.id.PlatoIngredienteId; 
import com.pedidosrestaurante.pedidos.repository.IngredienteRepository;
import com.pedidosrestaurante.pedidos.repository.PlatoRepository;
import com.pedidosrestaurante.pedidos.repository.PlatoIngredienteRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
        IngredienteRepository ingredienteRepo,
        PlatoRepository platoRepo,
        PlatoIngredienteRepository piRepo 
    ) {
        return args -> {

            List<PlatoIngrediente> relaciones = new ArrayList<>();
            
            if (platoRepo.count() > 0) {
                System.out.println("Datos iniciales ya existen. Omitiendo carga.");
                return;
            }

            
            Ingrediente tomateBase = new Ingrediente("Tomate Base", "Salsa de tomate clásica", "ninguno", 100, true, "salsa_tomate");
            Ingrediente mozzarella = new Ingrediente("Mozzarella", "Queso mozzarella fresco", "lacteos", 80, false, "mozzarella");
            Ingrediente parmesano = new Ingrediente("Parmesano", "Queso parmesano rallado", "lacteos", 60, false, "parmesano");
            Ingrediente nataCarbonara = new Ingrediente("Nata Carbonara", "Salsa carbonara con nata y huevo", "lacteos, huevo", 60, false, "nata");
            Ingrediente aceiteOliva = new Ingrediente("Aceite de Oliva", "Aceite virgen extra", "ninguno", 150, true, "aceite");
            Ingrediente quesoAzul = new Ingrediente("Queso Azul", "Queso azul intenso", "lacteos", 40, false, "queso_azul");
            Ingrediente quesoCabra = new Ingrediente("Queso de Cabra", "Queso de cabra en rulo", "lacteos", 55, false, "queso_cabra");

            Ingrediente pepperoni = new Ingrediente("Pepperoni", "Rodajas de pepperoni picantes", "ninguno", 50, false, "pepperoni");
            Ingrediente jamonYork = new Ingrediente("Jamón York", "Jamón cocido de calidad", "ninguno", 70, false, "jamon_york");
            Ingrediente jamonSerrano = new Ingrediente("Jamón Serrano", "Lonchas de jamón curado", "ninguno", 45, false, "jamon_serrano");
            Ingrediente bacon = new Ingrediente("Bacon", "Tiras de panceta ahumada", "ninguno", 65, false, "bacon");
            Ingrediente pollo = new Ingrediente("Pollo", "Pollo marinado y troceado", "ninguno", 55, false, "pollo");
            Ingrediente carnePicada = new Ingrediente("Carne Picada", "Carne picada especiada", "ninguno", 40, false, "carne_picada");
            Ingrediente chorizo = new Ingrediente("Chorizo", "Rodajas de chorizo curado", "ninguno", 48, false, "chorizo");
            Ingrediente atun = new Ingrediente("Atún", "Atún en aceite", "pescado", 50, false, "atun");

            Ingrediente champinon = new Ingrediente("Champiñón", "Láminas de champiñón fresco", "ninguno", 90, true, "champinon");
            Ingrediente pimientoRojo = new Ingrediente("Pimiento Rojo", "Tiras de pimiento rojo", "ninguno", 85, true, "pimiento_rojo");
            Ingrediente cebolla = new Ingrediente("Cebolla", "Cebolla en juliana", "ninguno", 95, true, "cebolla");
            Ingrediente olivasNegras = new Ingrediente("Olivas Negras", "Aceitunas negras sin hueso", "ninguno", 75, true, "olivas_negras");
            Ingrediente rucula = new Ingrediente("Rúcula", "Hojas de rúcula fresca", "ninguno", 60, true, "rucula");
            Ingrediente pinha = new Ingrediente("Piña", "Trozos de piña en almíbar", "ninguno", 50, true, "pinha"); // Se mantiene, pero no se usará en las pizzas gourmet
            Ingrediente maiz = new Ingrediente("Maíz", "Granos de maíz dulce", "ninguno", 55, true, "maiz");
            Ingrediente tomateCherry = new Ingrediente("Tomate Cherry", "Tomates cherry partidos", "ninguno", 70, true, "tomate_cherry");
            Ingrediente esparragos = new Ingrediente("Espárragos", "Trozos de espárrago verde", "ninguno", 40, true, "esparragos");
            Ingrediente alcachofas = new Ingrediente("Alcachofas", "Corazones de alcachofa", "ninguno", 30, true, "alcachofas");

            Ingrediente oregano = new Ingrediente("Orégano", "Especias Orégano", "ninguno", 200, true, "oregano");
            Ingrediente albahaca = new Ingrediente("Albahaca", "Hojas de albahaca fresca", "ninguno", 100, true, "albahaca");
            Ingrediente huevo = new Ingrediente("Huevo", "Huevo cocido", "huevo", 35, false, "huevo");
            Ingrediente jalapeños = new Ingrediente("Jalapeños", "Rodajas de chile jalapeño", "ninguno", 40, true, "jalapenhos");
            Ingrediente miel = new Ingrediente("Miel", "Salsa de miel", "ninguno", 20, false, "miel");
            
            List<Ingrediente> allIngredientes = List.of(
                tomateBase, mozzarella, parmesano, nataCarbonara, aceiteOliva, quesoAzul, quesoCabra,
                pepperoni, jamonYork, jamonSerrano, bacon, pollo, carnePicada, chorizo, atun,
                champinon, pimientoRojo, cebolla, olivasNegras, rucula, pinha, maiz, tomateCherry, esparragos, alcachofas,
                oregano, albahaca, huevo, jalapeños, miel
            );
            
            ingredienteRepo.saveAll(allIngredientes);
            

            Plato clasicaGourmet = new Plato("La Clásica di Napoli", "Salsa de tomate San Marzano, mozzarella fresca y albahaca.", 10, "margarita");
            Plato quatroFormaggi = new Plato("Quattro Formaggi (4 Quesos)", "Mozzarella, parmesano DOP, queso azul y rulo de cabra.", 13, "cuatro_quesos");
            Plato diavola = new Plato("La Diavola (Pepperoni)", "Tomate, mozzarella y el toque picante del auténtico pepperoni.", 12, "pepperoni_pizza");
            Plato speckCarbonara = new Plato("Speck Carbonara", "Base de nata, huevo, bacon crujiente y cebolla caramelizada.", 14, "carbonara_pizza");
            Plato iberica = new Plato("La Ibérica (Chorizo)", "Tomate, mozzarella, chorizo ibérico de bellota y un chorrito de AOVE.", 11, "chorizo_pizza");
            
            Plato montanhesa = new Plato("Montañesa", "Base blanca, mozzarella, jamón serrano, rúcula y parmesano laminado.", 15, "serrana");
            Plato trufflePollo = new Plato("Pollo Trufado", "Base de queso, pollo marinado, champiñones y aceite de trufa blanca.", 16, "pollo_gourmet");
            Plato delBosque = new Plato("Del Bosque", "Base blanca, mozzarella, champiñones, espárragos y huevo de codorniz.", 13, "funghi");
            Plato cabraMielPremium = new Plato("Cabra, Bacon y Miel", "Queso de cabra, bacon crujiente, un toque de miel y nueces.", 14, "cabra_miel");
            Plato rustica = new Plato("Rústica", "Tomate, mozzarella, alcachofas, olivas negras y jamón york.", 12, "rustica");
            
            Plato veganaHuerto = new Plato("Vegana del Huerto", "Base de tomate, pimiento rojo, cebolla, alcachofas y aceite de oliva.", 13, "vegetariana");
            Plato delMar = new Plato("Del Mar", "Tomate, mozzarella, atún premium, olivas negras y alcaparras.", 11, "atunera");
            Plato campestre = new Plato("Campestre", "Tomate, mozzarella, champiñones, bacon y tomate cherry.", 14, "campestre");
            Plato picante = new Plato("El Fuego", "Tomate, mozzarella, carne picada, jalapeños y un toque de queso azul.", 15, "picante");
            Plato especialidadChef = new Plato("El Capricho del Chef", "Selección de ingredientes frescos de temporada, siempre sorprendente.", 17, "especialidad");


            List<Plato> allPlatos = List.of(
                clasicaGourmet, quatroFormaggi, diavola, speckCarbonara, iberica, montanhesa,
                trufflePollo, delBosque, cabraMielPremium, rustica, veganaHuerto, delMar, campestre, picante, especialidadChef
            );

            platoRepo.saveAll(allPlatos);
            
            // --- C. CREAR Y GUARDAR LAS RELACIONES PLATOINGREDENTE ---
            
            java.util.function.BiConsumer<Plato, Ingrediente> addRelation = (plato, ingrediente) -> {
                PlatoIngrediente rel = new PlatoIngrediente();
                rel.setPlato(plato);
                rel.setIngrediente(ingrediente);
                rel.setCantidad(1);
                rel.setId(new PlatoIngredienteId(plato.getIdPlato(), ingrediente.getIdIngrediente()));
                relaciones.add(rel);
            };

            // 1. La Clásica di Napoli (Margarita)
            addRelation.accept(clasicaGourmet, tomateBase);
            addRelation.accept(clasicaGourmet, mozzarella);
            addRelation.accept(clasicaGourmet, albahaca);

            // 2. Quattro Formaggi (4 Quesos)
            addRelation.accept(quatroFormaggi, mozzarella);
            addRelation.accept(quatroFormaggi, parmesano);
            addRelation.accept(quatroFormaggi, quesoAzul);
            addRelation.accept(quatroFormaggi, quesoCabra);

            // 3. Diavola (Pepperoni)
            addRelation.accept(diavola, tomateBase);
            addRelation.accept(diavola, mozzarella);
            addRelation.accept(diavola, pepperoni);

            // 4. Speck Carbonara
            addRelation.accept(speckCarbonara, nataCarbonara);
            addRelation.accept(speckCarbonara, bacon);
            addRelation.accept(speckCarbonara, cebolla);
            addRelation.accept(speckCarbonara, huevo); 

            // 5. La Ibérica (Chorizo)
            addRelation.accept(iberica, tomateBase);
            addRelation.accept(iberica, mozzarella);
            addRelation.accept(iberica, chorizo);
            addRelation.accept(iberica, aceiteOliva);

            // 6. Montañesa (Base blanca, Jamón Serrano, Rúcula, Parmesano)
            addRelation.accept(montanhesa, mozzarella);
            addRelation.accept(montanhesa, jamonSerrano);
            addRelation.accept(montanhesa, rucula);
            addRelation.accept(montanhesa, parmesano);
            addRelation.accept(montanhesa, tomateCherry);

            // 7. Pollo Trufado (Pollo, Champiñón, Espárragos)
            addRelation.accept(trufflePollo, mozzarella);
            addRelation.accept(trufflePollo, pollo);
            addRelation.accept(trufflePollo, champinon);
            addRelation.accept(trufflePollo, esparragos);

            // 8. Del Bosque (Base Blanca, Champiñón, Espárragos, Huevo)
            addRelation.accept(delBosque, mozzarella);
            addRelation.accept(delBosque, champinon);
            addRelation.accept(delBosque, esparragos);
            addRelation.accept(delBosque, huevo);
            
            // 9. Cabra, Bacon y Miel (Queso Cabra, Miel, Bacon)
            addRelation.accept(cabraMielPremium, quesoCabra);
            addRelation.accept(cabraMielPremium, miel);
            addRelation.accept(cabraMielPremium, bacon); 
            
            // 10. Rústica (Tomate, Mozza, Alcachofas, Olivas Negras, Jamón York)
            addRelation.accept(rustica, tomateBase);
            addRelation.accept(rustica, mozzarella);
            addRelation.accept(rustica, alcachofas);
            addRelation.accept(rustica, olivasNegras);
            addRelation.accept(rustica, jamonYork);

            // 11. Vegana del Huerto (Tomate, Pimiento Rojo, Cebolla, Alcachofas, Aceite Oliva)
            addRelation.accept(veganaHuerto, tomateBase);
            addRelation.accept(veganaHuerto, pimientoRojo);
            addRelation.accept(veganaHuerto, cebolla);
            addRelation.accept(veganaHuerto, alcachofas);
            addRelation.accept(veganaHuerto, aceiteOliva);

            // 12. Del Mar (Tomate, Mozza, Atún, Olivas Negras)
            addRelation.accept(delMar, tomateBase);
            addRelation.accept(delMar, mozzarella);
            addRelation.accept(delMar, atun);
            addRelation.accept(delMar, olivasNegras);
            
            // 13. Campestre (Tomate, Mozza, Champiñón, Bacon, Tomate Cherry)
            addRelation.accept(campestre, tomateBase);
            addRelation.accept(campestre, mozzarella);
            addRelation.accept(campestre, champinon);
            addRelation.accept(campestre, bacon);
            addRelation.accept(campestre, tomateCherry);

            // 14. El Fuego (Tomate, Mozza, Carne Picada, Jalapeños, Queso Azul)
            addRelation.accept(picante, tomateBase);
            addRelation.accept(picante, mozzarella);
            addRelation.accept(picante, carnePicada);
            addRelation.accept(picante, jalapeños);
            addRelation.accept(picante, quesoAzul);

            // 15. El Capricho del Chef (Combinación)
            addRelation.accept(especialidadChef, tomateBase);
            addRelation.accept(especialidadChef, mozzarella);
            addRelation.accept(especialidadChef, chorizo);
            addRelation.accept(especialidadChef, pollo);
            addRelation.accept(especialidadChef, champinon);
            addRelation.accept(especialidadChef, esparragos);


            // GUARDAR TODAS LAS RELACIONES
            piRepo.saveAll(relaciones);
            

            System.out.println("Datos iniciales (30 Ingredientes, 15 Platos Gourmet y Relaciones) creados ✔️");
        };
    }
}