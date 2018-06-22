import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PM} from '../../../shared/util/pm';
import {Article} from '../models/article';
import {ArticleService} from '../services/article.service';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-article',
  styles: [`
    
  `],
  template: `
    <app-article-view *ngIf="!(state$ | async).loggedIn"
                      [article]="(state$ | async).article"></app-article-view>
    <app-article-editor *ngIf="(state$ | async).loggedIn"
                        [article]="(state$ | async).article"
                        (articleChanged)="this.pm.update({article: $event})"></app-article-editor>
  `
})
export class ArticleComponent implements OnInit, OnChanges, OnDestroy {

  @Input() articleId: string;

  protected pm: PM<void, ArticleUI.State> = PM.createComplexPM<void, ArticleUI.State>()
    .setInitializer(() => {
      return {
        article: null,
        loggedIn: false
      };
    })
    .build();
  protected state$: Observable<ArticleUI.State> = this.pm.observe();
  private loginSubscription: Subscription;

  constructor(private articleService: ArticleService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.observeLoggedIn()
      .subscribe(loggedIn => this.pm.update({loggedIn: loggedIn}));
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.articleService.getArticle(this.articleId)
      .subscribe(article => {
        this.pm.update({article: article});
      });
  }
}

namespace ArticleUI {
  export interface State {
    article: Article;
    loggedIn: boolean;
  }
}
