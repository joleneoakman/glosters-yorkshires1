import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Article} from '../models/article';
import {Observable} from 'rxjs';
import {PM} from '../../../shared/util/pm';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ArticleService} from '../services/article.service';
import reset = UI.reset;

@Component({
  selector: 'app-article-editor',
  styles: [`
    .label {
      text-align: end;
      padding-top: 7px;
    }

    .row {
      margin-bottom: 10px;
    }

    .toolbar {
      border-top: 1px solid #ff924d;
      background-color: #fff5a7;
      z-index: 1000;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
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
    <section>
      <div class="container">

        <div class="row">
          <div class="col-2 label text-dark">Icoon</div>
          <div class="col-10">
            <input class="form-control"
                   disabled type="text"
                   [ngModel]="(state$ | async).icon">
          </div>
        </div>

        <div class="row">
          <div class="col-2 label text-dark">Titel</div>
          <div class="col-10">
            <textarea class="form-control"
                      autoresize
                      [ngModel]="(state$ | async).title"
                      (ngModelChange)="this.pm.update({title: $event})"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-2 label text-dark">Korte versie</div>
          <div class="col-10">
            <textarea id="snippetText"
                      autoresize
                      class="form-control"
                      [ngModel]="(state$ | async).snippetText"
                      (ngModelChange)="this.pm.update({snippetText: $event})"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-2 label text-dark">Volledige versie</div>
          <div class="col-10">
            <textarea id="fullText"
                      autoresize
                      class="form-control"
                      [ngModel]="(state$ | async).fullText"
                      (ngModelChange)="this.pm.update({fullText: $event})"></textarea>
          </div>
        </div>
      </div>
    </section>
    <section class="toolbar"
             *ngIf="!(state$ | async).pristine"
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
export class ArticleEditorComponent implements OnChanges {

  @Input() articleId: string;

  protected pm = PM.create<UI.State>()
    .setInitializer(UI.initalizer)
    .setLogic(UI.logic)
    .build();
  protected state$: Observable<UI.State> = this.pm.observe();

  constructor(private articleService: ArticleService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.articleService.getArticle(this.articleId)
      .subscribe(article => {
        this.pm.update({orig: article});
      });
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
      this.articleService.updateArticle(candidate)
        .subscribe(article => {
          this.pm.update(UI.reset(article));
        });
    })
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
  };

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
