import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  styles: [`
    .navbar {
      background-color: rgba(255, 255, 255, 0.8);
      padding: 0;
    }
    
    .nav-link {
      box-sizing: border-box;
      border-bottom: 3px rgba(0, 0, 0, 0) solid;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    
    .active {
      border-bottom: 3px rgb(170, 102, 204) solid !important;
      background-color: rgba(170, 102, 204, 0.2);
    }
  `],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">

      <div class="container">
        <!-- Navbar brand -->
        <a class="navbar-brand" routerLink="/">Glosters-Yorkshires.be</a>

        <!-- Collapse button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
                aria-expanded="false" aria-label="Toggle navigation" #navbarToggler>
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible content -->
        <div class="collapse navbar-collapse" id="basicExampleNav">

          <!-- Links -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a (click)="collapseNav()" class="nav-link" routerLinkActive="active" routerLink="/home">Over ons</a>
            </li>
            <li class="nav-item">
              <a (click)="collapseNav()" class="nav-link" routerLinkActive="active" routerLink="/article/glosters">Glosters</a>
            </li>
            <li class="nav-item">
              <a (click)="collapseNav()" class="nav-link" routerLinkActive="active" routerLink="/article/yorkshires">Yorkshires</a>
            </li>
            <li class="nav-item">
              <a (click)="collapseNav()" class="nav-link" routerLinkActive="active" routerLink="/article/competition">Wedstrijden</a>
            </li>
            <li class="nav-item">
              <a (click)="collapseNav()" class="nav-link" routerLinkActive="active" routerLink="/article/contact">Contact</a>
            </li>
            <li class="nav-item ml-lg-3">
              <a (click)="collapseNav()" class="nav-link" routerLinkActive="active" routerLink="/admin">Inloggen</a>
            </li>
          </ul>
        </div>
        
      </div>

    </nav>
  `
})
export class NavbarComponent {

  @ViewChild('navbarToggler') navbarToggler:ElementRef;

  constructor() {}

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }
}
