const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    precioTotal: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
},
    { versionKey: false });

module.exports = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema);

