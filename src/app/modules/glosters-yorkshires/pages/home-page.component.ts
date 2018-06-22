import {Component} from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
    <main class="bg-white">
      <app-header articleId="about-us"></app-header>
      <app-article articleId="about-us"></app-article>
      
      <app-snippet articleId="glosters" [showBackground]="true" [showTextLeft]="true"></app-snippet>
      <app-snippet articleId="yorkshires"></app-snippet>
      <app-snippet articleId="competition" [showBackground]="true" [showTextLeft]="true"></app-snippet>
      <app-snippet articleId="contact"></app-snippet>
    </main>
  `
})
export class HomePageComponent {
}
