import {Component, Input, SimpleChanges} from '@angular/core';
import {Article} from '../../articles/models/article';
import {ArticleService} from '../../articles/services/article.service';
import {PM} from '../../../shared/util/pm';
import {AbstractUI} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-snippet',
  styles: [`
    .bg-snippet {
      background-color: #dafaec;
    }

    .card {
      min-height: 260px;
    }
    
    .fas {
      font-size: 100px;
    }
  `],
  template: `
    <section [class.bg-snippet]="showBackground">
      <div class="container">
        <div class="row align-items-center" *ngIf="(ui$ | async)">
          <div class="p-2 p-lg-5" [ngClass]="cardClasses()">
            <div [class.card]="showBorder">
              <div class="card-body">
                <h2 class="card-title mb-4" *ngIf="showTitle">
                  {{(ui$ | async).title}}
                </h2>
                <div class="card-text text-justify" [innerHTML]="(ui$ | async).snippetText"></div>
                <a *ngIf="showReadMore" class="pt-4 d-block" [routerLink]="['/article/' + (ui$ | async).id]">Meer lezen &rarr;</a>
              </div>
            </div>
          </div>
          <ng-container *ngIf="showReadMore">
            <div class="col-6 d-none d-lg-block text-center" [class.order-first]="!showTextLeft">
              <button *ngIf="!(ui$ | async).icon" class="btn btn-secondary d-inline-block px-auto" [routerLink]="['/article/' + (ui$ | async).id]">Meer lezen &rarr;</button>
              <a *ngIf="(ui$ | async).icon" [routerLink]="['/article/' + (ui$ | async).id]"><i class="text-secondary" [ngClass]="iconClass(ui$ | async)"></i></a>
            </div>
          </ng-container>
        </div>
      </div>
    </section>
  `
})
export class SnippetComponent extends AbstractUI<Article> {

  @Input() articleId: string;
  @Input() showBackground: boolean = false;
  @Input() showTextLeft: boolean = false;
  @Input() showReadMore: boolean = true;
  @Input() showBorder: boolean = true;
  @Input() showTitle: boolean = true;

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

  cardClasses() {
    if (this.showReadMore) {
      return {
        'col-lg-6': true
      };
    } else {
      return {
        'mx-auto': true,
        'col-lg-8': true
      };
    }
  }

  iconClass(article: Article) {
    if (article.icon) {
      return {
        [article.icon]: true
      };
    }
    return {};
  }
}
