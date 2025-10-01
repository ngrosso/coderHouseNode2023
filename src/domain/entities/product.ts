export interface IProduct {
  id?: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string[];
  code: string;
  stock: number;
  category: string;
  owner: string;
  status: boolean;
}

class Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string[];
  code: string;
  stock: number;
  category: string;
  owner: string;
  status: boolean;

  constructor(props: IProduct) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.price = props.price;
    this.thumbnail = props.thumbnail;
    this.code = props.code;
    this.stock = props.stock;
    this.category = props.category;
    this.owner = props.owner;
    this.status = props.status;
  }
}

export default Product;
