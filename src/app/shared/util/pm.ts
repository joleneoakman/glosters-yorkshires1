import {BehaviorSubject, Observable} from 'rxjs';
import {EventEmitter} from '@angular/core';

/**
 * Very basic presentation model for local UI state management
 */
export class PM<V, S> {

  //
  // Fields
  //

  private readonly logic: ((current: S, candidate: S) => S);
  private readonly initializer: (value: V) => S;
  private readonly composer: (state: S) => V;
  private readonly valueEmitter: EventEmitter<V>;
  private readonly subject: BehaviorSubject<S>;
  private currentValue: V;

  //
  // Builder methods
  //

  /**
   * Create a PM where the public value and private state is the same object. This value is expected to be immutable.
   */
  static createSimplePM<V>(): PMBuilder<V, V> {
    return new PMBuilder<V, V>()
      .setInitializer((val) => val)
      .setComposer((state) => state)
      .setLogic((current, candidate) => candidate);
  }

  /**
   * Create a 'complex' PM where the public value is converted to (initializer) and from (composer) the inner UI state.
   * Both value and state are expected to be immutable.
   */
  static createComplexPM<V, S>(): PMBuilder<V, S> {
    return new PMBuilder<V, S>()
      .setInitializer(() => null)
      .setComposer(() => null)
      .setLogic((current, candidate) => candidate);
  }

  //
  // Constructor
  //

  constructor(initializer: (V) => S,
              composer: (S) => V,
              logic: ((current: S, candidate: S) => S),
              valueEmitter: EventEmitter<V>) {
    // Initializer is required (value => state)
    if (!initializer) {
      throw new Error('Specify a valid initializer (value => state)');
    }

    // Composer is required (state => value)
    if (!composer) {
      throw new Error('Specify a valid composer (state => value)');
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
    this.composer = composer;
    this.valueEmitter = valueEmitter;
    this.subject = new BehaviorSubject<S>(null);
    this.reset(null); // Initializer should be able to handle null state
  }

  //
  // Public API
  //

  public observe(): Observable<S> {
    return this.subject.asObservable();
  }

  public invoke(callback: (state: S) => void) {
    callback(this.subject.getValue());
  }

  public reset(newValue: V) {
    if (JSON.stringify(newValue) !== JSON.stringify(this.currentValue)) {
      this.currentValue = newValue;
      this.update(this.initializer(newValue));
    }
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

      // Emit new value (if available)
      if (this.valueEmitter && this.composer) {
        const newValue = this.composer(newState);
        if (JSON.stringify(newValue) !== JSON.stringify(this.currentValue)) {
          this.currentValue = newValue;
          this.valueEmitter.emit(newValue);
        }
      }
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
}

export class PMBuilder<V, S> {

  private logic: ((current: S, candidate: S) => S);
  private initializer: (value: V) => S;
  private composer: (staet: S) => V;
  private valueEmitter: EventEmitter<V>;

  constructor() {
  }

  public build(): PM<V, S> {
    return new PM<V, S>(this.initializer, this.composer, this.logic, this.valueEmitter);
  }

  //
  // Setters
  //

  public setLogic(logic: ((current: S, candidate: S) => S)): PMBuilder<V, S> {
    this.logic = logic;
    return this;
  }

  public setInitializer(initializer: (value: V) => S): PMBuilder<V, S> {
    this.initializer = initializer;
    return this;
  }

  public setComposer(composer: (state: S) => V): PMBuilder<V, S> {
    this.composer = composer;
    return this;
  }

  public setValueEmitter(valueEmitter: EventEmitter<V>): PMBuilder<V, S> {
    this.valueEmitter = valueEmitter;
    return this;
  }
}
