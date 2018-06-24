import {Component, Input, SimpleChanges} from '@angular/core';
import {ArticleService} from '../../articles/services/article.service';
import {LoginService} from '../../login/login.service';
import {PM} from '../../../shared/util/pm';
import {AbstractUi} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-header',
  styles: [`

    .header {
      background: url('/assets/images/header.jpg') no-repeat fixed center top;
      -webkit-background-size: cover;
      background-size: cover;
    }

    .header-desktop {
      margin-bottom: 7vh;
    }

    .header-mobile {
      padding-top: 70px;
      padding-bottom: 40px;
      margin-bottom: 50px;
    }

    .spacer {
      height: 50vh;
      width: 100%;
    }

    .header-image {
      position: absolute;
      bottom: 0;
    }

    .title-container {
      background-color: rgba(0, 77, 64, 0.9);
    }

    .title {
      font-size: 80px;
      font-weight: 100;
    }

    .title-small {
      font-size: 50px;
      font-weight: 100;
    }

    .bird {
      width: 260px;
      height: 248px;
      margin-bottom: -25px;
    }
  `],
  template: `
    <header class="header">
      <!-- Desktop header -->
      <div class="header-desktop d-none d-lg-block">
        <div class="header-overlay">
          <div class="spacer">&nbsp;</div>
          <div class="title-container card text-white text-right">
            <div class="container">
              <div class="header-image">
                <img [src]="'/assets/images/bird.png'" alt="Overlay" class="bird">
              </div>
              <h1 class="title ml-auto d-none d-lg-block pr-4" [innerHTML]="(ui$ | async).title | simpleText"></h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile header -->
      <div class="header-mobile title-container d-block d-lg-none">
        <div class="container">
          <h1 class="title-small text-white text-center" [innerHTML]="(ui$ | async).title | simpleText"></h1>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent extends AbstractUi<UI.State> {

  @Input() articleId: string;

  constructor(private articleService: ArticleService,
              private loginService: LoginService) {
    super(PM.create<UI.State>());
  }

  onInit(): void {
    this.pm.handleSubscription('login', this.loginService.observeLoggedIn()
      .subscribe(loggedIn => this.pm.update({loggedIn: loggedIn})));
  }

  onChanges(changes: SimpleChanges): void {
    this.pm.handleSubscription('article', this.articleService.observeArticle(this.articleId)
      .subscribe(article => this.pm.update({title: article.title})));
  }
}

namespace UI {
  export interface State {
    loggedIn: boolean;
    title: string;
  }
}
