import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductContainerComponent } from './product-container/product-container.component';
import { CategoryContainerComponent } from './category-container/category-container.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductContainerComponent,
    CategoryContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
