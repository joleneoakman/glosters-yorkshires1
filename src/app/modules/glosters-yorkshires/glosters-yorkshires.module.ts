import {NgModule} from '@angular/core';
import {HomePageComponent} from './pages/home-page.component';
import {SnippetComponent} from './components/snippet.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header.component';
import {CommonModule} from '@angular/common';
import {ArticlesModule} from '../articles/articles.module';
import {ArticlePageComponent} from './pages/article-page.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SnippetComponent,
    ArticlePageComponent,
    HomePageComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    ArticlesModule
  ],
  providers: [
  ]
})
export class GlostersYorkshiresModule {
}
