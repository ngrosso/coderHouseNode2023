import express from "express";
import productsRouter from "./routes/products.route.js";
import cartRouter from "./routes/carts.route.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});