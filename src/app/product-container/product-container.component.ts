import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs/Subscription';
import {ComponentConnectorService} from '../component-connector.service';
import {Category} from '../category';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit, OnDestroy {
  @Input() searchText: string;
  products: Product[] = [];
  currentCategory: Category;
  subscription: Subscription;

  constructor(private productService: ProductService, private componentConnectorService: ComponentConnectorService) {
    this.subscription = this.componentConnectorService.getMessage().subscribe(category => {
      this.currentCategory = category;
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
