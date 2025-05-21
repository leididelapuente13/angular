import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
    selector: 'app-by-capital-page',
    imports: [SearchInputComponent, ListComponent],
    templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

    countryService = inject(CountryService);

    isLoading = signal<boolean>(false);
    isError = signal<string | null>(null);
    countries = signal<Country[]>([]);

    onSearch(query: string) {

        this.isLoading.set(true);
        this.isError.set(null);

        this.countryService.serachByCapital(query).subscribe({
            next: (countries)=>{
                this.countries.set(countries);
                this.isLoading.set(false);
            },
            error: (error)=>{
                this.isLoading.set(false);
                this.countries.set([]);
                this.isError.set(`No se encontro un país con la capital ${query}`);
            }
        })
    }
}
