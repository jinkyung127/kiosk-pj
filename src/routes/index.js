import express from "express";
const router = express.Router();

import itemsRouter from "./items.routes";
import orderItemsRouter from "./orderItems.routes";
import orderCustomersRouter from "./orderCustomers.routes";
import optionsRouter from "./options.routes";

router.use("/items", itemsRouter);
router.use("/orderItems", orderItemsRouter);
router.use("/orderCustomers", orderCustomersRouter);
router.use("/options", optionsRouter);

export default router;
