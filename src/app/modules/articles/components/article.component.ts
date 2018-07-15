import {Component, Input, SimpleChanges} from '@angular/core';
import {PM} from '../../../shared/util/pm';
import {AuthService} from '../../auth/auth.service';
import {AbstractUI} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-article',
  template: `
    <app-article-view *ngIf="!(ui$ | async).loggedIn"
                      [articleId]="(ui$ | async).articleId"></app-article-view>
    <app-article-editor *ngIf="(ui$ | async).loggedIn"
                        [articleId]="(ui$ | async).articleId"
                        [showShortText]="showShortText"></app-article-editor>
  `
})
export class ArticleComponent extends AbstractUI<UI.State> {

  @Input() articleId: string;
  @Input() showShortText: boolean = true;

  constructor(private loginService: AuthService) {
    super(PM.create<UI.State>()
      .setInitializer(() => {
        return {
          articleId: null,
          loggedIn: false
        };
      })
    );
  }

  onInit(): void {
    this.pm.handleSubscription('login', this.loginService.observeLoggedIn()
      .subscribe(loggedIn => this.pm.update({loggedIn: loggedIn}))
    );
  }

  onChanges(changes: SimpleChanges): void {
    this.pm.update({articleId: this.articleId});
  }
}

namespace UI {
  export interface State {
    articleId: string;
    loggedIn: boolean;
  }
}

