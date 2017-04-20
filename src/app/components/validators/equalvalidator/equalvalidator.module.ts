import { EqualValidatorDirective } from '../equal.validator.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EqualValidatorDirective],
  exports:[EqualValidatorDirective]
})
export class EqualvalidatorModule { }
