import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {GlostersYorkshiresModule} from './modules/glosters-yorkshires/glosters-yorkshires.module';
import {LoginModule} from './modules/login/login.module';
import {HomePageComponent} from './modules/glosters-yorkshires/pages/home-page.component';
import {ArticlePageComponent} from './modules/glosters-yorkshires/pages/article-page.component';
import {AdminPageComponent} from './modules/login/pages/admin-page.component';
import {NavbarComponent} from './shared/components/navbar.component';
import {FooterComponent} from './shared/components/footer.component';

const appRoutes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'article/:id', component: ArticlePageComponent},
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
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
