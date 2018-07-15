import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, OperatorFunction} from 'rxjs';
import {Action} from './action';
import {Segment} from './segment';
import {SegmentSubject} from './segment-subject';

/**
 * This store, containing the global app state, should only be used by service implementations.
 */
@Injectable()
export class Store {

  // This represents the app state (initially an empty object)
  private appStateSubject = new BehaviorSubject({});

  constructor() {
    // Todo: log to debug tool (e.g. local storage)
    this.appStateSubject.subscribe(appState => {
      console.log({
        date: new Date(),
        state: appState
      });
    });
  }

  /**
   * Initialize a new segment of the app state, given a (globally) unique module key and an initial state.
   */
  public initialize<S>(module: string, initialState: S): Segment<S> {
    return new Segment<S>(new SegmentSubject<S>(this.appStateSubject, module, initialState));
  }
}
