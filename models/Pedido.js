const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    precioTotal: { type: Number, required: true }
},
    { versionKey: false });

module.exports = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema);

