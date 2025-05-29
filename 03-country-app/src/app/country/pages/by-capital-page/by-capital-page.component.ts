import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';

@Component({
    selector: 'app-by-capital-page',
    imports: [SearchInputComponent, ListComponent],
    templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

    countryService = inject(CountryService);
    query = signal('')

    resource = this.rxResource({
        request: () => ({ query: this.query() }),
        loader: ({ request }) => {

            if (!request.query) return of([]);

            return this.countryService.searchByCapital(request.query);
        }
    })

    // countryResource = resource({
    //     request: () => ({ query: this.query() }),
    //     loader: async ({ request }) => {
    //         const queryValue = request.query;
    //         if (!queryValue) return [];
    //         return await firstValueFrom(this.countryService.searchByCapital(queryValue))
    //     }
    // })

    // isLoading = signal<boolean>(false);
    // isError = signal<string | null>(null);
    // countries = signal<Country[]>([]);

    // onSearch(query: string) {

    //     this.isLoading.set(true);
    //     this.isError.set(null);

    //     this.countryService.serachByCapital(query).subscribe({
    //         next: (countries)=>{
    //             this.countries.set(countries);
    //             this.isLoading.set(false);
    //         },
    //         error: (error)=>{
    //             this.isLoading.set(false);
    //             this.countries.set([]);
    //             this.isError.set(error);
    //         }
    //     })
    // }
}
