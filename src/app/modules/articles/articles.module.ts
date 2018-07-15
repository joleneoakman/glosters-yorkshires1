import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ArticleService} from './services/article.service';
import {ArticleComponent} from './components/article.component';
import {ArticleEditorComponent} from './components/article-editor.component';
import {AuthModule} from '../auth/auth.module';
import {ArticleViewComponent} from './components/article-view.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleViewComponent,
    ArticleEditorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    SharedModule,
    AuthModule
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
