import {BehaviorSubject, Observable, OperatorFunction} from 'rxjs';
import {s} from '@angular/core/src/render3';
import {promise} from 'selenium-webdriver';
import {map} from 'rxjs/operators';

export class SegmentSubject<S> {

  constructor(private appStateSubject: BehaviorSubject<any>,
              private module: string,
              private initialState: S) {
    this.next(initialState);
  }

  getValue(): S {
    return this.appStateSubject.getValue()[this.module];
  }

  next(newSliceState: S) {
    const currentState = this.appStateSubject.getValue();
    const newState = Object.assign(
      currentState,
      {[this.module]: newSliceState}
    );
    this.appStateSubject.next(newState);
  }

  pipe<T>(operatorFunc: OperatorFunction<S, T>): Observable<T> {
    const key = this.module;
    return this.appStateSubject.pipe(
      map(appState => <S>appState[key]),
      operatorFunc
    );
  }
}
