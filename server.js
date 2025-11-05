const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();

// Variables de entorno
const mongoUsuario = process.env.MONGO_USUARIO;
const mongoContrasena = process.env.MONGO_CONTRASENA;
const PUERTO = process.env.PUERTO || 3000;

// Base de datos y colección
const database = "TacoPaco";
const collection = "Mesas";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://${mongoUsuario}:${mongoContrasena}@cluster0.fgumghx.mongodb.net/${database}`)
    .then(() => {
        app.listen(PUERTO, "0.0.0.0", () => {
            console.clear();
            console.log(`Servidor y Mongo corriendo en http://localhost:${PUERTO}`);
        });
    })
    .catch((err) => console.log(`Error de conexión a MongoDB: ${err}`));

const mesaSchema = new mongoose.Schema(
    { nombre: String },
    { versionKey: false }
);

const Mesa = mongoose.model(collection, mesaSchema);

// Ocupar mesa
app.get('/ocuparmesa', async (req, res) => {
    try {
        const mesas = await Mesa.find().sort({ nombre: 1 });
        res.json(mesas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






