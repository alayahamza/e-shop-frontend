import {Component, OnInit} from '@angular/core';
import {Category} from '../category';

@Component({
  selector: 'app-category-container',
  templateUrl: './category-container.component.html',
  styleUrls: ['./category-container.component.css']
})
export class CategoryContainerComponent implements OnInit {

  constructor() {
  }

  categories: Category[] = [];

  ngOnInit() {
    for (let counter = 0; counter < 6; counter++) {
      const category: Category = {
        id: counter,
        name: 'category ' + counter,
        description: '',
        products: counter * 10
      };
      this.categories.push(category);
    }
  }

}
