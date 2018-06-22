import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Article} from '../models/article';
import {Observable} from 'rxjs';
import {PM} from '../../../shared/util/pm';

@Component({
  selector: 'app-article-editor',
  styles: [`
  `],
  template: `
    <div>This is the article editor</div>
  `
})
export class ArticleEditorComponent implements OnChanges {

  @Input() article: Article;
  @Output() articleChanged: EventEmitter<Article> = new EventEmitter<Article>();

  protected pm: PM<Article, Article> = PM.createSimplePM<Article>()
    .build();
  protected state$: Observable<Article> = this.pm.observe();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pm.reset(this.article);
  }
}
