import {Component, OnInit} from '@angular/core';
import {Product} from "../product";
import {CategoryService} from "../category.service";
import {Category} from "../category";
import {ProductService} from "../product.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs/Subject";
import {debounceTime} from "rxjs/operator/debounceTime";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayAddForm: boolean;
  displayEditForm: boolean;
  displayDeleteForm: boolean;
  productToAdd: Product;
  productToEdit: Product;
  productToDelete: Product;
  categories: Category[];
  disableAddBtn: boolean;
  displayRequiredFieldsMsg = false;
  products: Product[];
  productTitles = [];
  productTitleToSearchEdit: any;
  productTitleToSearchDelete: any;
  closeResult: string;
  displayAddProductSpinner = false;
  displayEditProductSpinner = false;
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  constructor(private productService: ProductService, private categoryService: CategoryService, private modalService: NgbModal) {
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.products.forEach((product) => {
        this.productTitles.push(product.title);
      })
    });
    this.displayAddForm = true;
    this.displayEditForm = false;
    this.displayDeleteForm = false;
    this.productToAdd = new Product();
    this.disableAddBtn = true;
  }

  displaySuccessMessage(successMsg: string) {
    this._success.next(successMsg);
  }

  displayAdd() {
    this.displayAddForm = true;
    this.displayEditForm = false;
    this.displayDeleteForm = false;
  }

  displayEdit() {
    this.displayAddForm = false;
    this.displayEditForm = true;
    this.displayDeleteForm = false;
  }

  displayDelete() {
    this.displayAddForm = false;
    this.displayEditForm = false;
    this.displayDeleteForm = true;
  }

  addProduct() {
    if (this.productToAdd.title === '' || this.productToAdd.description === '' || this.productToAdd.price <= 0 || this.productToAdd.categoryId === undefined || this.productToAdd.categoryId === null) {
      this.displayRequiredFieldsMsg = true;
    } else {
      this.displayRequiredFieldsMsg = false;
      this.displayAddProductSpinner = true;
      this.productService.addProduct(this.productToAdd).subscribe(() => {
          this.displaySuccessMessage('Product successfully added');
          this.displayAddProductSpinner = false;
          this.productToAdd = new Product();
        }
      )
      ;
    }
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.productTitles.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 15));

  editProduct() {
    this.products.forEach((product) => {
      if (product.title === this.productTitleToSearchEdit) {
        this.productToEdit = product;
      }
    });
  }

  saveEditedProduct() {
    this.displayEditProductSpinner = true;
    this.productService.editProduct(this.productToEdit).subscribe(() => {
      this.displaySuccessMessage('Product successfully edited');
      this.displayEditProductSpinner = false;
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productToDelete).subscribe(() => {
      this.products.splice(this.products.indexOf(this.productToDelete), 1);
      this.productTitles.splice(this.productTitles.indexOf(this.productToDelete.title), 1);
      this.productToDelete = new Product();
      this.productTitleToSearchDelete = '';
      this.displaySuccessMessage('Product deleted successfully');
      setTimeout(() => this.displayDeleteForm = true, 2000);
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'delete') {
        this.deleteProduct();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  searchProductToDelete() {
    this.products.forEach((product) => {
      if (product.title === this.productTitleToSearchDelete) {
        this.productToDelete = product;
      }
    });
  }
}
