import {Component, OnInit} from '@angular/core';
import {Product} from '../product';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {
  products: Product[] = [];

  product: Product = {
    id: 1,
    title: 'Product',
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    price: 1
  };

  constructor() {
  }

  ngOnInit() {
    for (let counter = 0; counter < 10; counter++) {
      this.products.push(this.product);
    }
  }

}
