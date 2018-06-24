import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AutoresizeDirective} from './directives/autoresize.directive';
import {SimpleTextPipe} from './pipes/simpleText.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AutoresizeDirective,
    SimpleTextPipe
  ],
  exports: [
    AutoresizeDirective,
    SimpleTextPipe
  ],
  providers: [
  ]
})
export class SharedModule {
}
