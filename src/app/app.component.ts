import {Component} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {current} from "codelyzer/util/syntaxKind";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eShop';
  route: string;
  adminViewPath = '/admin';
  isAdminView: boolean;
  private currentRoute: string;

  constructor(location: Location, router: Router, private activatedRoute: ActivatedRoute) {

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects
        if (this.currentRoute === this.adminViewPath) {
          this.isAdminView = true;
        } else {
          this.isAdminView = false;
        }
      }
    });
  }


}
