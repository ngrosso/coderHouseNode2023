class Product {

  title = String;
  description = String;
  price = Number;
  thumbnail = Array;
  code = Number;
  stock = Number;
  status = Boolean;
  category = String;

  constructor(title, description, price, thumbnail, code, stock,status,category) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = status;
    this.category = category;
  }
}

export default Product;