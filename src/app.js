import express from "express";
import routes from "./routes";
import { getOptionData } from "./routeCache";

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppSettings();
    this.setAppRouter();
  }

  setAppSettings = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  };

  setAppRouter = () => {
    this.app.use("/", routes, (error, request, response) => {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    });

    this.app.get("/optionData", async (req, res) => {
      try {
        const optionData = await getOptionData();
        res.json(optionData);
      } catch (error) {
        res.status(500).json({ message: "서버 에러" });
      }
    });
  };
}
