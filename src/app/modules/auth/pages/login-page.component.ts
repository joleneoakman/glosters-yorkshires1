import {Component} from '@angular/core';
import {PM} from '../../../shared/util/pm';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AbstractUI} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-login-page',
  styles: [`
    .page {
      margin-top: 150px;
    }
  `],
  template: `
    <main class="page">
      <section *ngIf="!(ui$ | async).loggedIn">
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-md-auto">
              <div class="card card-body">
                <app-login-form></app-login-form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class LoginPageComponent extends AbstractUI<UI.State> {

  constructor(private loginService: AuthService,
              private router: Router) {
    super(PM.create<UI.State>());
  }

  onInit(): void {
    this.pm.handleSubscription('login', this.loginService.observeLoggedIn()
      .subscribe(loggedIn => {
        this.pm.update({loggedIn: loggedIn});
        if (loggedIn) {
          this.router.navigate(['/about-us']); // Todo: refactor to auth guard (?)
        }
      })
    );
  }
}

namespace UI {
  export interface State {
    loggedIn: boolean;
  }
}
