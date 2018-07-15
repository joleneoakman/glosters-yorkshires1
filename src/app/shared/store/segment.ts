import {BehaviorSubject, Observable, OperatorFunction} from 'rxjs';
import {Store} from './store.service';
import {promise} from 'selenium-webdriver';
import {map} from 'rxjs/operators';
import {SegmentSubject} from './segment-subject';

export class Segment<S> {

  constructor(private subject: SegmentSubject<S>) {
  }

  public getState(): S {
    return this.subject.getValue();
  }

  public update(partialState: Partial<S>) {
    const newState = Object.assign(
      this.subject.getValue(),
      partialState
    );
    this.subject.next(newState);
  }

  public observe<T>(selector: (S) => T): Observable<T> {
    return this.subject.pipe(
      map(selector)
    );
  }

  public pipe(operator: OperatorFunction<S, any>): Observable<any> {
    return this.subject.pipe(operator);
  }
}
