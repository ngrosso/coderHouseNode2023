import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/carts.route.js";
import mongoose from "mongoose";


void (async () => {
  const PORT = process.env.PORT || 8080;

  if (Number(process.env.PERSISTANCE_TYPE)) {
    try {
      await mongoose.connect(process.env.MONGO_ATLAS_URI, {
        dbName: process.env.MONGO_DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Base de datos Mongo Atlas conectada");
    } catch (e) {
      throw new Error(e);
    }
  }

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartRouter);

  app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
  });
})();