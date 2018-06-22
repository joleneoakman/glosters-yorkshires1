import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Article} from '../models/article';
import {ArticleService} from '../services/article.service';
import {Subscription} from 'rxjs';
import {PM} from '../../../shared/util/pm';

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
        <div class="mx-auto col-md-8 text-justify mt-4" [innerHTML]="(state$ | async)?.fullText"></div>
      </div>
    </div>
  `
})
export class ArticleViewComponent implements OnChanges, OnDestroy {

  @Input() articleId: string;
  @Output() articleChanged: EventEmitter<Article> = new EventEmitter<Article>();

  protected pm = PM.create<Article>().build();
  protected state$ = this.pm.observe();

  private articleSubscription: Subscription;

  constructor(private articleService: ArticleService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
    this.articleService.getArticle(this.articleId)
      .subscribe(article => {
        this.pm.update(article);
      });
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }
}
