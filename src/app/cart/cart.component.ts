import {Component, OnInit} from '@angular/core';
import {Cart} from '../cart';
import {LocalStorageService} from 'angular-web-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(public local: LocalStorageService) {
  }

  ngOnInit() {
    this.cart = this.local.get('cart');
    if (this.cart === null || this.cart === undefined) {
      this.cart = new Cart();
      this.cart.products = [];
      this.cart.total = 0;
    }
    console.log(this.cart);
  }

  clearCart() {
    this.local.set('cart', {products: [], total: 0}, 3600, 's');
    this.cart = this.local.get('cart');
    console.log(this.cart);
  }
}
