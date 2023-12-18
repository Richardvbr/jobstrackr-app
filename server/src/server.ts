import express, { Request, Response, type Express } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";

import { appRouter } from "./trpc/router";
import { createContext } from "./trpc";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT ?? 4000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server running, hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
