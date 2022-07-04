import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    itemsPedido: [
      {
        nome: { type: String, required: true },
        qtd: { type: Number, required: true },
        imagem: { type: String, required: true },
        preco: { type: Number, required: true },
        produto: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    enderecoEntrega: {
      endereco: {
        type: String,
        required: true,
      },
      cidade: {
        type: String,
        required: true,
      },
      cep: {
        type: String,
        required: true,
      },
      pais: {
        type: String,
        required: true,
      },
    },
    formaPagamento: {
      type: String,
      required: true,
    },
    resultadoPagamento: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    valorItems: {
      type: Number,
      required: true,
      default: 0.0,
    },
    valorImposto: {
      type: Number,
      required: true,
      default: 0.0,
    },
    valorFrete: {
      type: Number,
      required: true,
      default: 0.0,
    },
    valorTotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
