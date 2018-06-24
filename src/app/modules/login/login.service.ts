import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

@Injectable()
export class LoginService {

  private loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  login(username: string,
        password: string): Observable<boolean> {
    this.loggedIn.next(true);
    return this.loggedIn;
  }

  logout() {
    this.loggedIn.next(false);
  }

  observeLoggedIn(): Observable<boolean> {
    return this.loggedIn;
  }

  changePassword(currentPassword: string,
                 newPassword1: string,
                 newPassword2: string): Observable<void> {
    return of();
  }
}
