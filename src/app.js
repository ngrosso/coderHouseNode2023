import express from "express";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import { resolve } from 'path';

import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/carts.route.js";
import viewsRouter from "./routes/views.route.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = resolve('src/public');
app.use(express.static(publicPath));

const viewsPath = resolve('src/views');
app.engine('handlebars', engine({
  layoutsDir: `${viewsPath}/layouts`,
  defaultLayout: `${viewsPath}/layouts/main.handlebars`,
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);


app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});

const socketServer = new Server(httpServer);
app.set("socketio", socketServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
});

