import express from "express";
const router = express.Router();

import ItemsController from "../controllers/items.controller";
const itemsController = new ItemsController();

router.post("/", itemsController.createItem);
router.get("/", itemsController.getItems);
router.get("/:type", itemsController.getItemsByType);
router.delete("/:id", itemsController.deleteItem);
router.put("/:id", itemsController.updateItem);

export default router;
