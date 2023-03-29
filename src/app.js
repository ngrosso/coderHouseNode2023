import express from "express";
import routerProducts from "./routes/products.route.js";
//import { routerCart } from "./routes/cart/cart.route.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
//app.use("/api/carts", routerCart);

app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});