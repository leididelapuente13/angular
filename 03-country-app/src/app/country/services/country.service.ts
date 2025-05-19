import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);
    private API_URL = 'https://restcountries.com/v3.1/capital'

    serachByCapital(query: string) {
        return this.http.get(`${this.API_URL}/${query}`);
    }

}
