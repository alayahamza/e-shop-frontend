import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    const id = this.route.snapshot.paramMap.get('id');
    const productId = Number(id);
    this.productService.getProductById(productId).subscribe(product => this.product = product);

  }
}
