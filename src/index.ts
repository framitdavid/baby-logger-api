import "reflect-metadata";
import express, { Express } from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();
const PORT = process.env.PORT || 3001;

createConnection()
  .then(async () => {
    const app: Express = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api/v1", routes);

    app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
  })
  .catch((err) => console.log(`TypeORM connection error`, err));
