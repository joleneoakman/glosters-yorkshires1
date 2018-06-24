import {Component, ElementRef, ViewChild} from '@angular/core';
import {PM} from '../util/pm';
import {LoginService} from '../../modules/login/login.service';
import {AbstractUI} from '../util/abstract-ui';

@Component({
  selector: 'app-navbar',
  styles: [`
    .navbar {
      background-color: rgba(255, 255, 255, 0.9);
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

    @media (max-width: 991px) {
      .nav-link {
        box-sizing: border-box;
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .active {
        background-color: rgba(170, 102, 204, 0.2);
        border-left: 3px rgb(170, 102, 204) solid !important;
        border-bottom: 0px rgba(0, 0, 0, 0) solid !important;
      }

      .logout {
        text-align: center;
        margin: 5px;
        text-transform: uppercase;
      }
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
            <li class="nav-item ml-lg-3" *ngIf="!(ui$ | async).loggedIn">
              <a (click)="collapseNav()" class="nav-link" routerLinkActive="active"
                 routerLink="/login">Inloggen</a>
            </li>
            <ng-container *ngIf="(ui$ | async).loggedIn">
              <li class="nav-item ml-lg-3">
                <a (click)="collapseNav()" class="nav-link" routerLinkActive="active"
                   routerLink="/admin">Admin</a>
              </li>
              <li class="nav-item ml-lg-3 d-none d-lg-block">
                <a (click)="logout()" class="btn btn-warning">
                  <i class="fa fa-sign-out-alt prefix white-text"></i>
                  Uitloggen
                </a>
              </li>
              <li class="nav-item d-block d-lg-none">
                <a (click)="logout()" class="nav-link logout bg-warning white-text" routerLinkActive="active2">
                  <i class="fa fa-sign-out-alt prefix white-text"></i>
                  Uitloggen
                </a>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>

    </nav>
  `
})
export class NavbarComponent extends AbstractUI<UI.State> {

  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  constructor(private loginService: LoginService) {
    super(PM.create<UI.State>()
      .setInitializer(UI.initializer)
    );
  }

  onInit(): void {
    this.pm.handleSubscription('login', this.loginService.observeLoggedIn()
      .subscribe(loggedIn => {
        this.pm.update({loggedIn: loggedIn});
      })
    );
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  logout() {
    this.loginService.logout();
    this.collapseNav();
  }
}

namespace UI {
  export interface State {
    loggedIn: boolean;
  }

  export function initializer(): State {
    return {
      loggedIn: false
    };
  }
}
