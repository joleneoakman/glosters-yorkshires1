import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbstractUi} from '../../../shared/util/abstract-ui';
import {PM} from '../../../shared/util/pm';

@Component({
  selector: 'app-article-page',
  template: `
    <main class="bg-white">
      <app-header [articleId]="(ui$ | async).articleId"></app-header>
      <app-article [articleId]="(ui$ | async).articleId"></app-article>
    </main>
  `
})
export class ArticlePageComponent extends AbstractUi<UI.State> {

  constructor(private route: ActivatedRoute) {
    super(PM.create<UI.State>());
  }

  onInit() {
    this.route.params.subscribe((data: { id: string }) => this.pm.update({articleId: data.id}));
  }
}

namespace UI {
  export interface State {
    articleId: string;
  }
}
