import {PM, PMBuilder} from './pm';
import {Observable} from 'rxjs';
import {OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

export abstract class AbstractUi<S> implements OnInit, OnChanges, OnDestroy {

  protected readonly pm: PM<S>;
  protected readonly ui$: Observable<S>;

  constructor(pmBuilder: PMBuilder<S>) {
    this.pm = pmBuilder.build();
    this.ui$ = this.pm.observe();
  }

  ngOnInit(): void {
    this.onInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(changes);
  }

  ngOnDestroy(): void {
    this.pm.unsubscribeAll();
    this.onDestroy();
  }

  //
  // Methods to override
  //

  onInit(): void {
  }

  onChanges(changes: SimpleChanges): void {
  }

  onDestroy(): void {
  }
}
