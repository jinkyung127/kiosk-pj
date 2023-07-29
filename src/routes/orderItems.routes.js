import express from "express";
const router = express.Router();

import OrderItemsController from "../controllers/orderItems.controller";
const orderItemsController = new OrderItemsController();

router.post("/", orderItemsController.createOrderItem);
router.put("/:id", orderItemsController.updateOrderItem);

export default router;
