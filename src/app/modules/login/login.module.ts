import {NgModule} from '@angular/core';
import {LoginFormComponent} from './components/login-form.component';
import {AdminPageComponent} from './pages/admin-page.component';
import {LoginService} from './login.service';

@NgModule({
  declarations: [
    LoginFormComponent,
    AdminPageComponent
  ],
  imports: [
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {
}
