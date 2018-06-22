import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ArticleService} from './services/article.service';
import {ArticleComponent} from './components/article.component';
import {ArticleEditorComponent} from './components/article-editor.component';
import {LoginModule} from '../login/login.module';
import {ArticleViewComponent} from './components/article-view.component';
import {FormsModule} from '@angular/forms';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {AutoresizeDirective} from './directives/autoresize.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleViewComponent,
    ArticleEditorComponent,
    AutoresizeDirective
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    LoginModule,
    TextareaAutosizeModule
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
