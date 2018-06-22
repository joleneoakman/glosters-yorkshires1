import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ArticleService} from '../../articles/services/article.service';

@Component({
  selector: 'app-header',
  styles: [`
    .header {
      margin-bottom: 10vh;
      background: no-repeat fixed center top;
      -webkit-background-size: cover;
      background-size: cover;
    }

    .container {
      position: relative;
      height: 65vh;
    }

    .header .header-image {
      position: absolute;
      left: 20px;
      bottom: 0;
    }

    .header .header-text {
      position: absolute;
      right: 30px;
      bottom: 0;
      transform: translateY(25px);
    }

    .header .header-text .card {
      background-color: rgba(0, 77, 64, 0.9);
    }

    .overlay {
      width: 260px;
      height: 248px;
      margin-bottom: -25px;
    }
    
    .header-text h1 {
      font-size: 60px;
      font-weight: 100;
    }
    
    .header-text-small {
      padding: 5vh;
      color: white;
      background-color: rgb(0, 77, 64);
      border-top: 10px white solid;
    }
    
    .header-text-small h1 {
      font-size: 40px;
      font-weight: normal;
    }
  `],
  template: `
    <header class="header" [style.background-image]="'url(/assets/images/' + imageURL + ')'">
      <div class="container">
        <div class="d-flex">
          <div class="header-image ml-lg-2" *ngIf="overlayURL">
            <img [src]="'/assets/images/' + overlayURL" alt="Overlay" class="overlay">
          </div>
          <div class="header-text ml-auto d-none d-lg-block">
            <div class="card card-body mx-auto text-white text-right">
              <h1 style="white-space: pre;">{{title}}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="header-text-small d-lg-none d-flex text-center">
        <h1 class="mx-auto" style="white-space: pre;">{{title}}</h1>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnChanges {

  @Input() articleId: string;
  @Input() imageURL: string = "header.jpg";
  @Input() overlayURL: string = "bird.png";

  protected title: string;

  constructor(private articleService: ArticleService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.articleService.getArticle(this.articleId)
      .subscribe(article => this.title = article.title);
  }
}
