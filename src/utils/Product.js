class Product {

  title = String;
  description = String;
  price = Number;
  thumbnail = Array;
  code = Number;
  stock = Number;
  category = String;
  status = Boolean;

  constructor(title, description, price, thumbnail, code, stock,category,status) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.category = category;
    this.status = status;
  }
}

export default Product;