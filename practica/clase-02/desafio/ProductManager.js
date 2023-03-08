class ProductManager {
  
  id = Number;
  products = Array;

  constructor() {
    this.id = 1;
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = { title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock };
    if (this.products.find(p => p.code == product.code)) return console.log(new RepeatedCode(product.code));
    product["id"] = this.id++;
    this.products.push(product);
    console.log(`${product.title} agregado con exito`);
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product != undefined) {
      return product;
    } else {
      console.log(new ProductDoesntExist(id));
    }
  }

}

class ProductDoesntExist extends Error {
  constructor(id) {
    super(`Id:${id} Not Found!`);
  }
}

class RepeatedCode extends Error {
  constructor(code) {
    super(`Code:${code} already exists!`);
  }
}


// Se creará una instancia de la clase “ProductManager”
let productManager = new ProductManager()
// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log("=========== Get Products (Vacio) ===========");
console.log(productManager.getProducts());
// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
console.log("================ Add Product ================");
productManager.addProduct("producto Prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);
// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log("========= Get Products (1 producto) =========")
console.log(productManager.getProducts());
// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
console.log("====== Add Product (Error mismo codigo) ======");
productManager.addProduct("producto Prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);
// Se evaluará que getProductById devuelva el producto en caso de encontrarlo
console.log("============= Get Product By Id =============");
console.log(productManager.getProductById(1));
// Se evaluará que getProductById devuelva error si no encuentra el producto
console.log("===== Get Product By Id (Error not found) =====");
console.log(productManager.getProductById(2));