import {Component} from '@angular/core';
import {PM} from '../../../shared/util/pm';
import {LoginService} from '../login.service';
import {AbstractUI} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-admin-page',
  styles: [`
    .page {
      margin-top: 150px;
    }
  `],
  template: `
    <main class="page">
      <section *ngIf="(ui$ | async).loggedIn">
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-md-auto">
              <div class="card card-body">
                <app-change-password-form></app-change-password-form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class AdminPageComponent extends AbstractUI<UI.State> {

  constructor(private loginService: LoginService) {
    super(PM.create<UI.State>());
  }

  onInit(): void {
    this.pm.handleSubscription('login', this.loginService.observeLoggedIn()
      .subscribe(loggedIn => {
        this.pm.update({loggedIn: loggedIn});
      })
    );
  }

  onDestroy(): void {
    this.pm.unsubscribeAll();
  }
}

namespace UI {
  export interface State {
    loggedIn: boolean;
  }
}
