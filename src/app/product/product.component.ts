import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product';
import {Category} from '../category';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [NgbRatingConfig]
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() currentCategory: Category;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
  }

}
