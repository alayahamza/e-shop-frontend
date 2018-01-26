import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from '../cart';
import {LocalStorageService} from 'angular-web-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  minNumCartProduct: number;
  maxNumCartProduct: number;
  cartArrayHolder: number[] = [];

  constructor(public local: LocalStorageService) {
  }

  ngOnInit() {
    this.minNumCartProduct = 1;
    this.maxNumCartProduct = 10;
    this.cart = this.local.get('cart');
    if (this.cart === null || this.cart === undefined) {
      this.cart = new Cart();
      this.cart.products = [];
      this.cart.total = 0;
    }
  }

  clearCart() {
    this.local.set('cart', {products: [], total: 0}, 3600, 's');
    this.cart = this.local.get('cart');
  }

  deleteCartItem(cartItem: CartItem) {
    const productIndexInCart = this.cart.products.indexOf(cartItem);
    this.cart.products.splice(productIndexInCart, 1);
    this.updateCart();
    this.persistCartLocally();
  }

  updateCart() {
    let total = 0;
    this.cart.products.forEach(function (cartItem) {
      total += cartItem.quantity * cartItem.item.price;
    });
    this.cart.total = total;
    this.persistCartLocally();
  }

  persistCartLocally() {
    this.local.set('cart', this.cart, 3600, 's');
    this.cart = this.local.get('cart');
  }
}
