import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);
    private API_URL = 'https://restcountries.com/v3.1/capital'

    serachByCapital(query: string): Observable<Country[]> {
        return this.http.get<RESTCountry[]>(`${this.API_URL}/${query}`).pipe(
            map(restCountries =>CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
            catchError((error) => {
                console.log('error fetching', error)
            })
        );
    }

}
