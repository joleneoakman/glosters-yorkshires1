import {Component} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {PM} from '../../../shared/util/pm';
import {AbstractUI} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-home-page',
  template: `
    <main class="bg-white">
      <app-header articleId="about-us"></app-header>
      <app-article articleId="about-us" [showShortText]="false"></app-article>
      
      <ng-container *ngIf="!(ui$ | async).loggedIn">
        <app-snippet articleId="glosters" [showBackground]="true" [showTextLeft]="true"></app-snippet>
        <app-snippet articleId="yorkshires"></app-snippet>
        <app-snippet articleId="competition" [showBackground]="true" [showTextLeft]="true"></app-snippet>
        <app-snippet articleId="contact"></app-snippet>
      </ng-container>
    </main>
  `
})
export class HomePageComponent extends AbstractUI<UI.State> {

  constructor(private loginService: LoginService) {
    super(PM.create<UI.State>());
  }

  onInit(): void {
    this.pm.handleSubscription('login', this.loginService.observeLoggedIn()
      .subscribe(loggedIn => this.pm.update({loggedIn: loggedIn}))
    );
  }
}

namespace UI {
  export interface State {
    loggedIn: boolean;
  }
}
