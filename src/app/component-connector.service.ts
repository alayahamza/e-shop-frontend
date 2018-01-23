import {Injectable} from '@angular/core';
import {Category} from './category';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ComponentConnectorService {

  private currentCategory: Category;

  constructor() {
  }

  private subject = new Subject<any>();

  sendMessage(currentCategory: Category) {
    if (currentCategory !== null) {
      this.subject.next(currentCategory);
    }
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
