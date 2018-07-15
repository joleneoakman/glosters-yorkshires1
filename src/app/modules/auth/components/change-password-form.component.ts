import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {PM} from '../../../shared/util/pm';
import {AbstractUI} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-change-password-form',
  template: `
    <form (submit)="login()">
      <div class="alert alert-info" *ngIf="(ui$ | async).successMessage">{{(ui$ | async).successMessage}}</div>

      <p class="h4 text-center mb-4">Wachtwoord wijzigen</p>

      <div class="md-form">
        <input type="password"
               id="currentPassword"
               name="currentPassword"
               class="form-control"
               [ngModel]="(ui$ | async).currentPassword"
               (ngModelChange)="this.pm.update({currentPassword: $event})">
        <label for="currentPassword">Huidig wachtwoord</label>
      </div>

      <div class="md-form">
        <input type="password"
               id="newPassword1"
               name="newPassword1"
               class="form-control"
               [ngModel]="(ui$ | async).newPassword1"
               (ngModelChange)="this.pm.update({newPassword1: $event})">
        <label for="newPassword1">Nieuw wachtwoord</label>
      </div>

      <div class="md-form">
        <input type="password"
               id="newPassword2"
               name="newPassword2"
               class="form-control"
               [ngModel]="(ui$ | async).newPassword2"
               (ngModelChange)="this.pm.update({newPassword2: $event})">
        <label for="newPassword2">Nieuw wachtwoord herhalen</label>
      </div>

      <div class="text-center mt-4">
        <button class="btn btn-secondary" type="submit">Wijzigingen opslaan</button>
      </div>
    </form>
  `
})
export class ChangePasswordFormComponent extends AbstractUI<UI.State> {

  constructor(private loginService: AuthService) {
    super(PM.create<UI.State>())
  }

  login() {
    this.pm.invoke(state => {
      this.pm.handleSubscription('passwordSuccess', this.loginService.changePassword(state.currentPassword, state.newPassword1, state.newPassword2)
        .subscribe(() => {
          this.pm.update({successMessage: 'Het wachtwoord is gewijzigd'});
        })
      );
    });
  }
}

namespace UI {
  export interface State {
    currentPassword: string;
    newPassword1: string;
    newPassword2: string;
    successMessage: string;
  }
}
