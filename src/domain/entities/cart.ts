export interface ICartProduct {
  product: string;
  quantity: number;
}

export interface ICart {
  id?: string;
  products: ICartProduct[];
}

class Cart {
  id?: string;
  products: ICartProduct[];

  constructor(props: ICart) {
    this.id = props.id;
    this.products = props.products;
  }
}

export default Cart;
