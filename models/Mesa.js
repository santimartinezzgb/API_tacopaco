const mongoose = require('mongoose')
const mesaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, unique: true },
        ocupada: { type: Boolean, default: false }
    },
    { versionKey: false }
);
const Mesa = mongoose.model("Mesas", mesaSchema);