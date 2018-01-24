import {Product} from './product';

export class Cart {
  products: CartElement[];
  total: number;
}

export class CartElement {
  item: Product;
  quantity: number;
}
