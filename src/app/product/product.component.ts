import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product';
import {Category} from '../category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() currentCategory: Category;

  constructor() {
  }

  ngOnInit() {
  }

}
