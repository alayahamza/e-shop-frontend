import {Pipe, PipeTransform} from '@angular/core';
import {Product} from './product';

@Pipe({
  name: 'filterCategoryAndTitleAndDescription'
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: Product[], searchText: string, categoryId: number): any[] {
    if (!products) {
      return [];
    }
    if (!searchText) {
      searchText = '';
    }
    searchText = searchText.toLowerCase();
    return products.filter(it => {
      return (it.title.toLowerCase().includes(searchText)
        || it.description.toLowerCase().includes(searchText))
        && it.categoryId === categoryId;
    });
  }
}
