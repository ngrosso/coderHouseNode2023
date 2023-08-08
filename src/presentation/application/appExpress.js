import express from "express";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { resolve } from "path";
import swaggerUIExpress from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import config from "../../config/index.js";
import sessionRouter from "../routes/session.route.js";
import usersRouter from "../routes/user.route.js";
import productsRouter from "../routes/products.route.js";
import cartRouter from "../routes/carts.route.js";
import errorHandler from "../middlewares/errorHandler.middleware.js";
import { addLogger, logger } from "../../utils/logger.js";
import loggerTestRouter from "../routes/loggerTest.js";

class AppExpress {
  init() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static('public'));
    this.app.use(addLogger);

    const viewsPath = resolve('src/public/views');
    this.app.engine('handlebars', engine({
      layoutsDir: `${viewsPath}/layouts`,
      defaultLayout: `${viewsPath}/layouts/main.handlebars`,
    }));
    this.app.set('view engine', 'handlebars');
    this.app.set('views', viewsPath);

    const docsPath = resolve("docs");
    this.swaggerOptions = {
      definition: {
        openapi: "3.0.1",
        info: {
          title: "Coderhouse Ecommerce API",
          version: "1.0.0",
          description: "API de Ecommerce",
          contact: {
            name: "Nicolás Grosso",
            email: "nzgrosso@gmail.com",
          }
        }
      },
      apis: [`${docsPath}/**/*.yaml`]
    }
  }


  build() {
    this.app.use('/api/sessions', sessionRouter);
    this.app.use('/api/users', usersRouter);
    this.app.use("/api/products", productsRouter);
    this.app.use("/api/carts", cartRouter);
    this.app.use("/api/docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerJsdoc(this.swaggerOptions)));
    this.app.use("/api/loggerTest", loggerTestRouter);
    this.app.use(errorHandler);
  }

  listen() {
    const PORT = config.PORT || 8080;
    this.app.listen(PORT, () => {
      logger.info(`Servidor http escuchando en el puerto ${PORT}`);
    });
  }


  callback() {
    return this.app;
  }

  close() {
    this.server.close();
  }

}

export default AppExpress