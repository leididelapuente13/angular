import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-by-country-page',
    imports: [SearchInputComponent, ListComponent],
    templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

    countryService = inject(CountryService);
    query = signal('');

    countryResource = rxResource({
        request: () => ({ query: this.query() }),
        loader: ({ request }) => {
            const queryValue = request.query;
            if (!queryValue) return of([]);
            return this.countryService.searchByCountry(queryValue)
        },
    })
}
