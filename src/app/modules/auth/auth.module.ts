import {NgModule} from '@angular/core';
import {LoginFormComponent} from './components/login-form.component';
import {AdminPageComponent} from './pages/admin-page.component';
import {AuthService} from './auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChangePasswordFormComponent} from './components/change-password-form.component';
import {LoginPageComponent} from './pages/login-page.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    ChangePasswordFormComponent,
    LoginPageComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
