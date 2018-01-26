import {Product} from './product';

export class Cart {
  products: CartItem[];
  total: number;
}

export class CartItem {
  item: Product;
  quantity: number;
}
