import ProductManager from "./classes/ProductManager.js";
import express from "express";

const app = express();
const port = 8080;
const productManager = new ProductManager;


app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const productList = await productManager.getProducts();
  if(limit){
    res.send({data:productList.slice(0, limit)});
  }else{
    res.send({data:productList});
  }
});

app.get("/products/:id", async (req, res) => {
  const id = +req.params.id;
  const product = await productManager.getProductById(id);
  if(product){
    res.send({data:product});
  }else{
    res.send({error:"Producto no encontrado"});
  }
});

app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});