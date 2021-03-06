import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {GlostersYorkshiresModule} from './modules/glosters-yorkshires/glosters-yorkshires.module';
import {AuthModule} from './modules/auth/auth.module';
import {HomePageComponent} from './modules/glosters-yorkshires/pages/home-page.component';
import {ArticlePageComponent} from './modules/glosters-yorkshires/pages/article-page.component';
import {AdminPageComponent} from './modules/auth/pages/admin-page.component';
import {NavbarComponent} from './shared/components/navbar.component';
import {FooterComponent} from './shared/components/footer.component';
import {LoginPageComponent} from './modules/auth/pages/login-page.component';

const appRoutes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'article/:id', component: ArticlePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    GlostersYorkshiresModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
