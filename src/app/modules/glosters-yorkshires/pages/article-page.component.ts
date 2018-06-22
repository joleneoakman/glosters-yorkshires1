import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-article-page',
  template: `
    <main class="bg-white pb-5">
      <app-header [articleId]="articleId"></app-header>
      <app-article [articleId]="articleId"></app-article>
    </main>
  `
})
export class ArticlePageComponent implements OnInit {

  protected articleId: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((data: { id: string }) => {
      this.articleId = data.id;
    });
  }
}
