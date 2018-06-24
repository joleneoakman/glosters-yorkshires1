import {Component, Input, SimpleChanges} from '@angular/core';
import {Article} from '../models/article';
import {PM} from '../../../shared/util/pm';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ArticleService} from '../services/article.service';
import {AbstractUi} from '../../../shared/util/abstract-ui';

@Component({
  selector: 'app-article-editor',
  styles: [`
    .label {
      text-align: end;
      padding-top: 6px;
    }

    .row {
      margin-bottom: 10px;
    }

    .toolbar {
      border-top: 1px solid #ffeeba;
      background-color: #fff3cd;
      z-index: 1000;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    @media (max-width: 991px) {
      .label {
        text-align: left;
      }
    }
  `],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateY(100%)'}))
      ])
    ])
  ],
  template: `
    <section class="pb-5">
      <div class="container card card-body">

        <div class="alert alert-warning" role="alert">
          Hieronder kan u de website tekst aanpassen, en vervolgens op 'bewaren' klikken.
        </div>

        <div class="row">
          <div class="col-lg-2 label text-dark">Titel</div>
          <div class="col-lg-10">
            <textarea class="form-control"
                      autoresize
                      rows="1"
                      [ngModel]="(ui$ | async).title"
                      (ngModelChange)="this.pm.update({title: $event})"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-2 label text-dark">Korte tekst</div>
          <div class="col-lg-10">
            <textarea id="snippetText"
                      autoresize
                      rows="1"
                      class="form-control"
                      [ngModel]="(ui$ | async).snippetText"
                      (ngModelChange)="this.pm.update({snippetText: $event})"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-2 label text-dark">Volledige tekst</div>
          <div class="col-lg-10">
            <textarea id="fullText"
                      autoresize
                      rows="1"
                      class="form-control"
                      [ngModel]="(ui$ | async).fullText"
                      (ngModelChange)="this.pm.update({fullText: $event})"></textarea>
          </div>
        </div>
      </div>
    </section>
    <section class="toolbar"
             *ngIf="!(ui$ | async).pristine"
             [@flyInOut]="'in'">
      <div class="text-center">
        <button class="btn btn-danger"
                (click)="save()">Bewaren
        </button>
        <button class="btn btn-warning"
                (click)="revert()">Herstellen
        </button>
      </div>
    </section>
  `
})
export class ArticleEditorComponent extends AbstractUi<UI.State> {

  @Input() articleId: string;

  constructor(private articleService: ArticleService) {
    super(PM.create<UI.State>()
        .setInitializer(UI.initalizer)
        .setLogic(UI.logic)
    );
  }

  onChanges(changes: SimpleChanges): void {
    this.pm.handleSubscription('article', this.articleService.observeArticle(this.articleId)
      .subscribe(article => {
        this.pm.update({orig: article});
      })
    );
  }

  save() {
    this.pm.invoke(state => {
      const candidate = {
        id: state.orig.id,
        icon: state.icon,
        title: state.title,
        snippetText: state.snippetText,
        fullText: state.fullText
      };
      this.articleService.updateArticle(candidate);
    });
  }

  revert() {
    this.pm.invoke(state => {
      this.pm.update(UI.reset(state.orig));
    });
  }
}

namespace UI {

  export interface State {
    orig: Article;
    valid: boolean;
    pristine: boolean;
    title: string;
    icon: string;
    snippetText: string;
    fullText: string;
  }

  export function initalizer() {
    return reset(null);
  }

  export function reset(article): State {
    return {
      orig: article,
      valid: true,
      pristine: true,
      title: article ? article.title : null,
      icon: article ? article.icon : null,
      snippetText: article ? article.snippetText : null,
      fullText: article ? article.fullText : null
    };
  }

  export function logic(current: State, candidate: State): State {
    // Article changed? Reset!
    if (current.orig !== candidate.orig) {
      candidate = reset(candidate.orig);
    }

    // Pristine?
    const pristine = candidate.orig
      && candidate.title === candidate.orig.title
      && candidate.icon === candidate.orig.icon
      && candidate.snippetText === candidate.orig.snippetText
      && candidate.fullText === candidate.orig.fullText;
    candidate = Object.assign({}, candidate, {pristine: pristine});

    return candidate;
  }
}
