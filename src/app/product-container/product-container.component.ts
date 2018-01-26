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
  displayProductContainerSpinner: boolean;

  constructor(private productService: ProductService, private componentConnectorService: ComponentConnectorService) {
    this.subscription = this.componentConnectorService.getMessage().subscribe(category => {
      this.currentCategory = category;
    });
  }

  ngOnInit() {
    this.displayProductContainerSpinner = true;
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      if (this.products.length !== 0) {
        this.displayProductContainerSpinner = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
