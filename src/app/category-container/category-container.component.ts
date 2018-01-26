import {Component, OnInit} from '@angular/core';
import {Category} from '../category';
import {CategoryService} from '../category.service';
import {ComponentConnectorService} from '../component-connector.service';

@Component({
  selector: 'app-category-container',
  templateUrl: './category-container.component.html',
  styleUrls: ['./category-container.component.css']
})
export class CategoryContainerComponent implements OnInit {
  displayCategoryContainerSpinner: boolean;

  constructor(private categoryService: CategoryService, private componentConnectorService: ComponentConnectorService) {
  }

  categories: Category[] = [];
  currentCategory: Category;

  ngOnInit() {
    this.displayCategoryContainerSpinner = true;
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.currentCategory = categories[0];
      this.sendMessage();
      if (this.categories.length !== 0) {
        this.displayCategoryContainerSpinner = false;
      }
    });
  }

  sendMessage(): void {
    this.componentConnectorService.sendMessage(this.currentCategory);
  }

  updateCategory(category: Category) {
    this.currentCategory = category;
    this.sendMessage();
  }

}
