import {Component} from '@angular/core';

@Component({
  selector: 'app-login-form',
  styles: [`
    .fa-lock {
      padding-left: 2px;
    }
  `],
  template: `
    <form>
      <p class="h4 text-center mb-4">Log in</p>

      <!-- Material input email -->
      <div class="md-form">
        <i class="fa fa-envelope prefix grey-text"></i>
        <input type="email" id="loginUser" class="form-control">
        <label for="loginUer">Uw gebruikersnaam</label>
      </div>

      <!-- Material input password -->
      <div class="md-form">
        <i class="fa fa-lock prefix grey-text"></i>
        <input type="password" id="loginPassword" class="form-control">
        <label for="loginPassword">Uw wachtwoord</label>
      </div>

      <div class="text-center mt-4">
        <button class="btn btn-secondary" type="submit">Inloggen</button>
      </div>
    </form>
  `
})
export class LoginFormComponent {
}
