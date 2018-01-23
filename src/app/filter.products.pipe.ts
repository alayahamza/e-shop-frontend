import {Pipe, PipeTransform} from '@angular/core';
import {Product} from './product';

@Pipe({
  name: 'filter'
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: Product[], searchText: string): any[] {
    if (!products) {
      return [];
    }
    if (!searchText) {
      return products;
    }
    searchText = searchText.toLowerCase();
    return products.filter(it => {
      return it.title.toLowerCase().includes(searchText) || it.description.toLowerCase().includes(searchText);
    });
  }
}
