import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ArticleService} from './services/article.service';
import {ArticleComponent} from './components/article.component';
import {ArticleEditorComponent} from './components/article-editor.component';
import {LoginModule} from '../login/login.module';
import {ArticleViewComponent} from './components/article-view.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleViewComponent,
    ArticleEditorComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    LoginModule
  ],
  exports: [
    ArticleComponent
  ],
  providers: [
    ArticleService
  ]
})
export class ArticlesModule {
}
