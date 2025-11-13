const mongoose = require('mongoose')
const pedidoSchema = new mongoose.Schema(
    {
        precioTotal: { type: Number, required: true }
    },
    { versionKey: false }
);
const Pedido = mongoose.model("Pedidos", pedidoSchema);