import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

@Injectable()
export class LoginService {

  private loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  login(username: string,
        password: string) {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }

  observeLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }
}
