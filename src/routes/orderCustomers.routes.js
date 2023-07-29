import express from "express";
const router = express.Router();

import OrderCustomersController from "../controllers/orderCustomers.controller";
const orderCustomersController = new OrderCustomersController();

router.post("/", orderCustomersController.createOrderCustomer);
router.put("/:id/complete", orderCustomersController.completeOrder);
router.delete("/:id/cancel", orderCustomersController.cancelOrder);

export default router;
