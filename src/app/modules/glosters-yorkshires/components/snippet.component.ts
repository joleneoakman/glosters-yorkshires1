import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Article} from '../../articles/models/article';
import {ArticleService} from '../../articles/services/article.service';
import {PM} from '../../../shared/util/pm';

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
        <div class="row align-items-center" *ngIf="(state$ | async)">
          <div class="p-2 p-lg-5" [ngClass]="cardClasses()">
            <div [class.card]="showBorder">
              <div class="card-body">
                <h2 class="card-title mb-4" *ngIf="showTitle">
                  {{(state$ | async).title}}
                </h2>
                <div class="card-text text-justify" [innerHTML]="(state$ | async).snippetText"></div>
                <a *ngIf="showReadMore" class="pt-4 d-block" [routerLink]="['/article/' + (state$ | async).id]">Meer lezen &rarr;</a>
              </div>
            </div>
          </div>
          <ng-container *ngIf="showReadMore">
            <div class="col-6 d-none d-lg-block text-center" [class.order-first]="!showTextLeft">
              <button *ngIf="!(state$ | async).icon" class="btn btn-secondary d-inline-block px-auto" [routerLink]="['/article/' + (state$ | async).id]">Meer lezen &rarr;</button>
              <a *ngIf="(state$ | async).icon" [routerLink]="['/article/' + (state$ | async).id]"><i class="text-secondary" [ngClass]="iconClass(state$ | async)"></i></a>
            </div>
          </ng-container>
        </div>
      </div>
    </section>
  `
})
export class SnippetComponent implements OnChanges {

  @Input() articleId: string;
  @Input() showBackground: boolean = false;
  @Input() showTextLeft: boolean = false;
  @Input() showReadMore: boolean = true;
  @Input() showBorder: boolean = true;
  @Input() showTitle: boolean = true;

  protected pm: PM<void, Article> = PM.createComplexPM<void, Article>().build();
  protected state$ = this.pm.observe();

  constructor(private articleService: ArticleService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.articleService.getArticle(this.articleId)
      .subscribe(article => {
        this.pm.update(article);
      });
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
