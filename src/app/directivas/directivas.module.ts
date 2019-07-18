import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorsDirective } from './show-errors.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ShowErrorsDirective
  ],
  exports: [
    ShowErrorsDirective
  ]
})
export class DirectivasModule { }
