import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    nome: { type: String, required: true },
    avaliacao: { type: Number, required: true },
    comentario: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    nome: {
      type: String,
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    comentarios: [reviewSchema],
    avaliacao: {
      type: Number,
      required: true,
      default: 0,
    },
    numAvaliacoes: {
      type: Number,
      required: true,
      default: 0,
    },
    preco: {
      type: Number,
      required: true,
      default: 0,
    },
    quantidadeEmEstoque: {
      type: Number,
      required: true,
      default: 0,
    },
    isAdmin: {
      type: String,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
