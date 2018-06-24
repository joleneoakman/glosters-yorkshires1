import {Component} from '@angular/core';
import {LoginService} from '../login.service';
import {PM} from '../../../shared/util/pm';
import {AbstractUI} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-login-form',
  styles: [`
    .fa-lock {
      padding-left: 2px;
    }
  `],
  template: `
    <form (submit)="login()">
      <p class="h4 text-center mb-4">Log in</p>

      <div class="md-form">
        <i class="fa fa-envelope prefix grey-text"></i>
        <input type="text"
               id="loginUser"
               name="loginUser"
               class="form-control"
               [ngModel]="(ui$ | async).username"
               (ngModelChange)="this.pm.update({username: $event})">
        <label for="loginUser">Uw gebruikersnaam</label>
      </div>

      <div class="md-form">
        <i class="fa fa-lock prefix grey-text"></i>
        <input type="password"
               id="loginPassword"
               name="loginPassword"
               class="form-control"
               [ngModel]="(ui$ | async).password"
               (ngModelChange)="this.pm.update({password: $event})">
        <label for="loginPassword">Uw wachtwoord</label>
      </div>

      <div class="text-center mt-4">
        <button class="btn btn-secondary" type="submit">Inloggen</button>
      </div>
    </form>
  `
})
export class LoginFormComponent extends AbstractUI<UI.State> {

  constructor(private loginService: LoginService) {
    super(PM.create<UI.State>());
  }

  login() {
    this.pm.invoke(state => {
      this.loginService.login(state.username, state.password);
    })
  }
}

namespace UI {
  export interface State {
    username: string;
    password: string;
  }
}
