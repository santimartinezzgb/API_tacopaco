const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Variables de entorno
const mongoUsuario = process.env.MONGO_USUARIO;
const mongoContrasena = process.env.MONGO_CONTRASENA;
const PUERTO = process.env.PUERTO || 3000;

const database = "TacoPaco";


// Middleware: 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión con mongo atlas
mongoose.connect(`mongodb+srv://${mongoUsuario}:${mongoContrasena}@cluster0.fgumghx.mongodb.net/${database}`)
    .then(() => { console.log(`Conexión a MongoDB exitosa`) })
    .catch((err) => console.log(`Error de conexión a MongoDB: ${err}`));

// Conectar el servidor
app.listen(PUERTO, "0.0.0.0", () => {
    console.clear();
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});

// Importar los modelos mesa y pedido
const Mesa = require('./models/Mesa.js');
const Pedido = require('./models/Pedido.js');


// ENDPOINTS SOBRE LAS MESAS
app.get('/mesas', async (req, res) => {

    // try/catch para mostrar las mesas en la app
    try {
        const mesas = await Mesa.find();
        res.json(mesas);
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.put('/mesas/:nombre', async (req, res) => {

    // try/catch para actualizar los atributos 'ocupada' y 'a_pagar' según el procedimiento (ambos booleanos)
    try {

        // Recoge los datos de la mesa
        const nombreMesa = req.params.nombre;
        const { ocupada, a_pagar } = req.body;

        // Modificar los atributos de la mesa en la que se está trabajando
        const mesa = await Mesa.findOneAndUpdate(
            { nombre: nombreMesa },
            { ocupada, a_pagar },
            { new: true }
        );

        if (!mesa) {// Si mesa es False, envía error de no encontrada
            return res.json({ error: `Mesa '${nombreMesa}' no encontrada` });
        }

        // Muestra en terminal la mesa editada y el valor actual de sus atributos
        console.log(`Mesa '${nombreMesa}' actualizada: ocupada=${ocupada}, a_pagar=${a_pagar}`);
        res.json(mesa);

    } catch (err) {
        res.json({ error: err.message });
    }
});




// ENDPOINT SOBRE LOS PEDIDOS
app.post('/pedidos', async (req, res) => {

    // try/catch para crear los pedidos en la colección pedidos de Mongo
    try {

        // Localiza valores
        const { precioTotal } = req.body;

        // Crea el nuevo pedido
        const nuevoPedido = new Pedido({ precioTotal });

        // Guarda el pedido en la base de datos
        const pedidoGuardado = await nuevoPedido.save();

        // Mensaje por terminal de pedido guardado
        console.log("Pedido guardado:", pedidoGuardado);
        res.json(pedidoGuardado);
    } catch (err) {
        console.error("Error al guardar pedido:", err);
        res.json({ error: err.message });
    }
});

