import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../product.service';
import {Product} from '../product';
import {Cart, CartItem} from '../cart';
import {LocalStorageService} from 'angular-web-storage';
import {Subject} from 'rxjs/Subject';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [NgbRatingConfig]
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  cart: Cart;
  private _success = new Subject<string>();

  displaySuccessAlert = false;
  displayItemExistsAlert = false;
  successMessage: string;

  constructor(private route: ActivatedRoute, private productService: ProductService, public local: LocalStorageService,
              config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.getProductById();
    this.cart = this.local.get('cart');
    if (this.cart === null || this.cart === undefined) {
      this.cart = new Cart();
      this.cart.products = [];
      this.cart.total = 0;
    }
    setTimeout(() => this.displaySuccessAlert = false, 5000);
    this._success.subscribe((message) => this.successMessage = message);
  }

  getProductById() {
    const id = this.route.snapshot.paramMap.get('id');
    const productId = Number(id);
    this.productService.getProductById(productId).subscribe(product => this.product = product);

  }

  addToCart(product: Product) {
    if (this.productExistsInCart(product)) {
      this.displayItemAlreadyExistsAlert();
    } else {
      const productToAdd = new CartItem();
      productToAdd.item = product;
      productToAdd.quantity = 1;
      if (this.cart.products === null || this.cart.products === undefined) {
        this.cart.products = [];
        this.cart.total = 0;
      }
      this.cart.products.push(productToAdd);
      this.cart.total += product.price;
      this.displaySuccessAlert = true;
    }
    this.local.set('cart', this.cart, 3600, 's');
  }

  productExistsInCart(product: Product) {
    let exists = false;
    if (this.cart === null || this.cart === undefined) {
      return false;
    } else if (this.cart.products === null || this.cart.products === undefined) {
      return false;
    } else {
      let counter = 0;
      while (!exists && counter < this.cart.products.length) {
        if (this.cart.products[counter].item.id === product.id) {
          exists = true;
        }
        counter++;
      }
    }
    return exists;
  }

  displayItemAlreadyExistsAlert() {
    this.displayItemExistsAlert = true;
    setTimeout(() => this.displayItemExistsAlert = false, 5000);
  }
}
