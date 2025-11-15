const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ocupada: { type: Boolean, default: false },
    a_pagar: { type: Boolean, default: false }
});

module.exports = mongoose.models.Mesa || mongoose.model('Mesa', MesaSchema);
