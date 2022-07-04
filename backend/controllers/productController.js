import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        nome: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.count({ ...keyword });
  const produtos = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ produtos, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const produto = await Product.findById(req.params.id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete a product
// @route GET /api/products/:id
// @access Public
const deleteProduct = asyncHandler(async (req, res) => {
  const produto = await Product.findById(req.params.id);
  if (produto) {
    await produto.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create a product
// @route POST /api/products/
// @access Public
const createProduct = asyncHandler(async (req, res) => {
  const produto = new Product({
    nome: "Sample name",
    preco: 0,
    user: req.user._id,
    imagem: "/images/sample.jpg",
    marca: "Sample brand",
    categoria: "Sample categoria",
    quantidadeEmEstoque: 0,
    numAvaliacoes: 0,
    descricao: "Sample description",
  });

  const createdProduct = await produto.save();
  res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Public
const updateProduct = asyncHandler(async (req, res) => {
  const {
    nome,
    preco,
    user,
    imagem,
    descricao,
    marca,
    categoria,
    quantidadeEmEstoque,
    numAvaliacoes,
  } = req.body;

  const produto = await Product.findById(req.params.id);

  if (produto) {
    produto.nome = nome;
    produto.preco = preco;
    produto.user = user;
    produto.imagem = imagem;
    produto.marca = marca;
    produto.categoria = categoria;
    produto.quantidadeEmEstoque = quantidadeEmEstoque;
    produto.numAvaliacoes = numAvaliacoes || 0;
    produto.descricao = descricao;

    const updatedProduct = await produto.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Produto não encontrado");
  }
});

// @desc Create a product
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { avaliacao, comentario } = req.body;

  const produto = await Product.findById(req.params.id);

  if (produto) {
    const alreadyReviewed = produto.comentarios.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Produto já avaliado");
    }

    const review = {
      nome: req.user.nome,
      avaliacao: Number(avaliacao),
      comentario,
      user: req.user._id,
    };

    produto.comentarios.push(review);
    produto.numAvaliacoes = produto.comentarios.length;

    produto.avaliacao =
      produto.comentarios.reduce((acc, item) => item.avaliacao + acc, 0) /
      produto.comentarios.length;

    await produto.save();
    res.status(201).json({ message: "Review adicionado" });
  } else {
    res.status(404);
    throw new Error("Produto já avaliado");
  }
});

// @desc Get top rated products
// @route POST /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const produtos = await Product.find({}).sort({ avaliacao: -1 }).limit(3);
  res.json(produtos);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
