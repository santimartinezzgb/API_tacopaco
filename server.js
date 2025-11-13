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


app.get('/mesas', async (req, res) => {
    try {
        const mesas = await Mesa.find().sort({ nombre: 1 });
        res.json(mesas);
    } catch (err) {
        res.json({ error: err.message });
    }
});


app.put('/mesas/:nombre', async (req, res) => {
    try {
        console.log("Mesa ocupada:", req.body);

        const nombreMesa = req.params.nombre;
        const { ocupada } = req.body;

        const mesa = await Mesa.findOneAndUpdate(
            { nombre: nombreMesa },
            { ocupada },
            { new: true, upsert: true }
        );

        res.json(mesa);
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.post('/pedidos', async (req, res) => {
    try {
        const { precioTotal } = req.body;
        const nuevoPedido = new Pedido({ precioTotal });
        const pedidoGuardado = await nuevoPedido.save();

        console.log("Pedido guardado:", pedidoGuardado);
        res.json(pedidoGuardado);
    } catch (err) {
        console.error("Error al guardar pedido:", err);
        res.json({ error: err.message });
    }
});

