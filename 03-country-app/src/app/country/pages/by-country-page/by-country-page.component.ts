import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-by-country-page',
    imports: [SearchInputComponent, ListComponent],
    templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

    countryService = inject(CountryService);
    query = signal('');

    countryResource = resource({
        request: () => ({ query: this.query() }),
        loader: async ({ request }) => {
            const queryValue = request.query;
            if (!queryValue) return [];
            return await firstValueFrom(this.countryService.searchByCountry(queryValue))
        },
    })
}
