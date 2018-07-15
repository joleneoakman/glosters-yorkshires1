import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {User} from './models/user';
import {map} from 'rxjs/operators';
import {Store} from '../../shared/store/store.service';
import {AuthState} from './models/auth-state';
import {state} from '@angular/animations';
import {Segment} from '../../shared/store/segment';

@Injectable()
export class AuthService {

  private segment: Segment<AuthState>;

  constructor(private store: Store) {
    this.segment = store.initialize('auth', {user: null});
  }

  login(username: string,
        password: string): Observable<User> {
    // Todo: login ...
    const user = {username: username};
    this.segment.update({user: user});

    // Return the (observable) user
    return this.segment.observe(authState => authState.user);
  }

  logout() {
    // Todo: logout
    this.segment.update({user: null});
  }

  observeLoggedIn(): Observable<boolean> {
    return this.segment.observe(authState => !!authState.user);
  }

  changePassword(currentPassword: string,
                 newPassword1: string,
                 newPassword2: string): Observable<void> {
    // Todo change password
    return of();
  }
}
