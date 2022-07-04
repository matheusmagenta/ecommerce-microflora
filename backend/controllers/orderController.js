import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    itemsPedido,
    enderecoEntrega,
    formaPagamento,
    valorItems,
    valorImposto,
    valorFrete,
    valorTotal,
    user,
  } = req.body;

  if (itemsPedido && itemsPedido.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      itemsPedido,
      user,
      enderecoEntrega,
      formaPagamento,
      valorItems,
      valorImposto,
      valorFrete,
      valorTotal,
    });

    const createdOrder = await order.save();
    console.log("createdOrder: ", createdOrder);

    res.status(201).json();
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "nome email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.resultadoPagamento = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  // console.log("req.user", req.user);
  const orders = await Order.find({ user: req.user._id });
  //console.log("orders: ", orders);
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc get all orders
// @route GET /api/orders/
// @access Private
const getOrders = asyncHandler(async (req, res) => {
  // console.log("req.user", req.user);
  const orders = await Order.find({}).populate("user", "nome");
  //console.log("orders: ", orders);
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};