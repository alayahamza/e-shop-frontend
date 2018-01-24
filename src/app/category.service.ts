import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Category} from './category';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CategoryService {
  private API_URL = environment.API_URL;
  private categoriesUrl: string;
  private currentCategory: Category;

  constructor(private http: HttpClient) {
    this.categoriesUrl = this.API_URL + '/categories';
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(catchError(this.handleError('GET Categories', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
