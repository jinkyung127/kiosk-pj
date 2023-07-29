import express from "express";
const router = express.Router();
import { getOptionData } from "../routeCache";

import OptionsController from "../controllers/options.controller";
const optionsController = new OptionsController();

router.post("/", optionsController.createOption);
router.get("/", async (req, res) => {
  try {
    const optionData = await getOptionData();
    res.json(optionData);
  } catch (error) {
    res.status(500).json({ message: "서버 에러" });
  }
});
router.delete("/:id", optionsController.deleteOption);

export default router;
