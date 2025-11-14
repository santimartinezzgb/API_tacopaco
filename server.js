const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Variables de entorno
const mongoUsuario = process.env.MONGO_USUARIO;
const mongoContrasena = process.env.MONGO_CONTRASENA;
const PUERTO = process.env.PUERTO || 3000;

const database = "TacoPaco";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://${mongoUsuario}:${mongoContrasena}@cluster0.fgumghx.mongodb.net/${database}`)
    .then(() => { console.log(`Conexión a MongoDB exitosa`) })
    .catch((err) => console.log(`Error de conexión a MongoDB: ${err}`));

app.listen(PUERTO, "0.0.0.0", () => {
    console.clear();
    console.log(`Servidor y Mongo corriendo en http://localhost:${PUERTO}`);
});

const Mesa = require('./models/Mesa.js');
const Pedido = require('./models/Pedido.js');


// --- MESAS ---
app.get('/mesas', async (req, res) => {
    try {
        const mesas = await Mesa.find();
        res.json(mesas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/mesas/:nombre', async (req, res) => {
    try {
        const nombreMesa = req.params.nombre;
        const { ocupada } = req.body;

        const mesa = await Mesa.findOneAndUpdate(
            { nombre: nombreMesa },
            { ocupada },
            { new: true }
        );

        if (!mesa) {
            return res.status(404).json({ error: `Mesa '${nombreMesa}' no encontrada` });
        }

        console.log(`✅ Mesa '${nombreMesa}' actualizada a ocupada=${ocupada}`);
        res.json(mesa);
    } catch (err) {
        console.error("❌ Error al actualizar mesa:", err);
        res.status(500).json({ error: err.message });
    }
});



// --- PEDIDOS ---
app.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await Pedido.find().sort({ fecha: 1 });
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/pedidos', async (req, res) => {
    try {
        const { precioTotal, mesa } = req.body;
        const nuevoPedido = new Pedido({ precioTotal, mesa });
        const pedidoGuardado = await nuevoPedido.save();

        console.log("Pedido guardado:", pedidoGuardado);
        res.json(pedidoGuardado);
    } catch (err) {
        console.error("Error al guardar pedido:", err);
        res.status(500).json({ error: err.message });
    }
});

