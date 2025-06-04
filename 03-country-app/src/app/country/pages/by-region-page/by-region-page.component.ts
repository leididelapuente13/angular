import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Region } from '../../interfaces/country.interface';
import { NgClass } from '@angular/common';
import { of } from 'rxjs';

@Component({
    selector: 'app-by-region-page',
    imports: [ListComponent, NgClass],
    templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
    countryService = inject(CountryService);

    regions: Region[] = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic'
    ]

    selectedRegion = signal<Region | null>(null);

    regionResource = rxResource({
        request: () => ({ region: this.selectedRegion() }),
        loader: ({ request }) => {
            if (!request.region) return of([]);
            return this.countryService.searchCountryByRegion(request.region);
        }
    })
}
