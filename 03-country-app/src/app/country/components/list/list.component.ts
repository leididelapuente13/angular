import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './list.component.html',
})
export class ListComponent {
    countries = input.required<Country[]>();
 }
