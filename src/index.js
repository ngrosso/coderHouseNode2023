
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import productsRouter from "./presentation/routes/products.route.js";
import cartRouter from "./presentation/routes/carts.route.js";
import sessionRouter from "./presentation/routes/session.route.js";
import usersRoute from "./presentation/routes/user.route.js";

import config from "./config/index.js";

void (async () => {
  const PORT = config.port || 8080;

  if (Number(config.persistanceType)) {
    try {
      await mongoose.connect(config.mongoAtlasUri, {
        dbName: config.mongoDBName,
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
  app.use(cookieParser());

  app.use('/api/sessions', sessionRouter);
  app.use('/api/users', usersRoute);
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartRouter);

  app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
  });
})();