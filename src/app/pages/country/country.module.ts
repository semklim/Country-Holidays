import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountryComponent } from './country.component';

@NgModule({
  declarations: [CountryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CountryComponent }]),
  ],
})
export class CountryModule {}
