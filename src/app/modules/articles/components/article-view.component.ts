import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from '../models/article';

@Component({
  selector: 'app-article-view',
  styles: [`
    .mb-5 {
      margin-bottom: 90px !important;
    }
  `],
  template: `
    <div class="container mb-5">
      <div class="row">
        <div class="mx-auto col-md-8 text-justify mt-4" [innerHTML]="article?.fullText"></div>
      </div>
    </div>
  `
})
export class ArticleViewComponent {

  @Input() article: Article;
  @Output() articleChanged: EventEmitter<Article> = new EventEmitter<Article>();

  constructor() {
  }
}
