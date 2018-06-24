import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {EventEmitter} from '@angular/core';

/**
 * Very basic presentation model for local UI state management
 */
export class PM<S> {

  //
  // Fields
  //

  private readonly initializer: () => S;
  private readonly logic: ((current: S, candidate: S) => S);
  // Todo: observable value emitter ...
  private readonly subject: BehaviorSubject<S>;
  private subscriptions = {};

  //
  // Builder methods
  //

  /**
   * Create a PM where the public value and private state is the same object. This value is expected to be immutable.
   */
  static create<S>(): PMBuilder<S> {
    return new PMBuilder<S>()
      .setInitializer(() => null)
      .setLogic((current, candidate) => candidate);
  }

  //
  // Constructor
  //

  constructor(initializer: () => S,
              logic: ((current: S, candidate: S) => S)) {
    // Initializer is required (value => state)
    if (!initializer) {
      throw new Error('Specify a valid initializer (() => S)');
    }

    // Logic is required ((current, candidate) => state)
    if (!logic) {
      throw new Error('Specify a valid logic function ((current: S, candidate: S) => S)');
    }

    // Initialize only once!
    if (this.logic) {
      throw new Error('You can only initialize a presentation model once!');
    }

    this.logic = logic;
    this.initializer = initializer;
    this.subject = new BehaviorSubject<S>(<S>{});
    this.reset(); // Initializer should be able to handle null state
  }

  //
  // State changes
  //

  public observe(): Observable<S> {
    return this.subject.asObservable();
  }

  public invoke(callback: (state: S) => void) {
    callback(this.subject.getValue());
  }

  public reset() {
    this.update(this.initializer());
  }

  public update(partialCandidate: Partial<S>) {
    // Check if initialized (falsy logic is bad, mkay)
    if (!this.logic) {
      throw new Error('You should initialize your presentation model before using it!');
    }

    // Calculate new state
    const current = this.subject.getValue();
    const candidate = current === null && partialCandidate === null ? null : Object.assign({}, current, partialCandidate);
    const newState = this.logic(current, candidate);

    // Publish new state (only if changed)
    if (JSON.stringify(current) !== JSON.stringify(newState)) {
      this.subject.next(newState);
    }
  }

  public addListItem(field: string, value: any) {
    const copy = [...this.subject.getValue()[field]];
    copy.push(value);
    this.update(Object.assign({}, this.subject.getValue(), {[field]: copy}));
  }

  public updateListItem(field: string, index: number, value: any) {
    const copy = [...this.subject.getValue()[field]];
    copy[index] = value;
    this.update(Object.assign({}, this.subject.getValue(), {[field]: copy}));
  }

  public removeListItem(field: string, index: number) {
    const copy = [...this.subject.getValue()[field]];
    copy.splice(index, 1);
    this.update(Object.assign({}, this.subject.getValue(), {[field]: copy}));
  }

  //
  // Subscriptions
  //

  public handleSubscription(id: string, subscription: Subscription) {
    this.unsubscribe(id);
    this.subscriptions[id] = subscription;
  }

  public unsubscribe(id: string) {
    const currentSubscription: Subscription = this.subscriptions[id];
    if (currentSubscription) {
      currentSubscription.unsubscribe();
      delete this.subscriptions[id];
    }
  }

  public unsubscribeAll() {
    for (let id in this.subscriptions) {
      this.unsubscribe(id);
    }
  }
}

export class PMBuilder<S> {

  private logic: ((current: S, candidate: S) => S);
  private initializer: () => S;

  constructor() {
  }

  public build(): PM<S> {
    return new PM<S>(this.initializer, this.logic);
  }

  //
  // Setters
  //

  public setInitialState(initialState: S): PMBuilder<S> {
    this.initializer = () => {
      return initialState;
    };
    return this;
  }

  public setInitializer(initializer: () => S): PMBuilder<S> {
    this.initializer = initializer;
    return this;
  }

  public setLogic(logic: ((current: S, candidate: S) => S)): PMBuilder<S> {
    this.logic = logic;
    return this;
  }
}
