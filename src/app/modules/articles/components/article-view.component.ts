import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Article} from '../models/article';
import {ArticleService} from '../services/article.service';
import {PM} from '../../../shared/util/pm';
import {AbstractUI} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-article-view',
  styles: [`
    .container {
      padding-bottom: 90px;
    }
  `],
  template: `
    <div class="container">
      <div class="row">
        <div class="mx-auto col-md-8 text-justify mt-4" [innerHTML]="((ui$ | async)?.fullText) | simpleText"></div>
      </div>
    </div>
  `
})
export class ArticleViewComponent extends AbstractUI<Article> {

  @Input() articleId: string;
  @Output() articleChanged: EventEmitter<Article> = new EventEmitter<Article>();

  constructor(private articleService: ArticleService) {
    super(PM.create<Article>());
  }

  onChanges(changes: SimpleChanges): void {
    this.pm.handleSubscription('article', this.articleService.observeArticle(this.articleId)
      .subscribe(article => {
        this.pm.update(article);
      })
    );
  }
}
