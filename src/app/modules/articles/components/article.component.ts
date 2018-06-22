import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PM} from '../../../shared/util/pm';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-article',
  styles: [`

  `],
  template: `
    <app-article-view *ngIf="!(state$ | async).loggedIn"
                      [articleId]="(state$ | async).articleId"></app-article-view>
    <app-article-editor *ngIf="(state$ | async).loggedIn"
                        [articleId]="(state$ | async).articleId"></app-article-editor>
  `
})
export class ArticleComponent implements OnInit, OnChanges, OnDestroy {

  @Input() articleId: string;

  protected pm: PM<UI.State> = PM.create<UI.State>()
    .setInitializer(() => {
      return {
        articleId: null,
        loggedIn: false
      };
    })
    .build();
  protected state$: Observable<UI.State> = this.pm.observe();
  private loginSubscription: Subscription;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.observeLoggedIn()
      .subscribe(loggedIn => this.pm.update({loggedIn: loggedIn}));
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pm.update({articleId: this.articleId});
  }
}

namespace UI {
  export interface State {
    articleId: string;
    loggedIn: boolean;
  }
}

