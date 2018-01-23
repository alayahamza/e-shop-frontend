import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ProductComponent} from './product/product.component';
import {ProductContainerComponent} from './product-container/product-container.component';
import {CategoryContainerComponent} from './category-container/category-container.component';
import {CategoryService} from './category.service';
import {ProductService} from './product.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ComponentConnectorService} from './component-connector.service';
import {FilterProductsPipe} from './filter.products.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductContainerComponent,
    CategoryContainerComponent,
    FilterProductsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ComponentConnectorService, CategoryService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
