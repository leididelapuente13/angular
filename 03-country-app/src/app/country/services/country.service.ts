import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Query } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { Country, Region } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);
    private API_URL = 'https://restcountries.com/v3.1'

    private queryCacheCapital = new Map<string, Country[]>;
    private queryCacheCountry = new Map<string, Country[]>;
    private queryCacheRegion = new Map<string, Country[]>;

    searchByCapital(query: string): Observable<Country[]> {

        if (this.queryCacheCapital.has(query)) {
            return of(this.queryCacheCapital.get(query) ?? []);
        }

        return this.http.get<RESTCountry[]>(`${this.API_URL}/capital/${query}`).pipe(
            map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
            tap((countries) => this.queryCacheCapital.set(query, countries)),
            catchError((error) => {
                console.log('error fetching', error)
                return throwError(() => new Error(`Error fetching capital ${query}`));
            })
        );
    }

    searchByCountry(query: string): Observable<Country[]> {

        if(this.queryCacheCountry.has(query)){
            return of(this.queryCacheCountry.get(query) ?? []);
        }

        return this.http.get<RESTCountry[]>(`${this.API_URL}/name/${query}`).pipe(
            map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
            tap((countries)=> this.queryCacheCountry.set(query, countries)),
            catchError((error) => {
                console.log('error fetching', error)
                return throwError(() => new Error(`Error fetching country ${query}`));
            })
        )
    }

    searchCountryByAlphaCode(code: string): Observable<Country> {
        return this.http.get<RESTCountry[]>(`${this.API_URL}/alpha/${code}`).pipe(
            map(restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
            map(countries => countries[0]),
            catchError((error) => {
                console.log(error);
                return throwError(() => new Error(`There's not a country with the code ${code}`))
            })
        )
    }

    searchCountryByRegion(region: Region): Observable<Country[]>{
        if(this.queryCacheRegion.has(region)){
            return of(this.queryCacheRegion.get(region) ?? [])
        }

        return this.http.get<RESTCountry[]>(`${this.API_URL}/region/${region}`).pipe(
            map(restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
            tap(countries => this.queryCacheRegion.set(region, countries)),
            catchError((error)=>{
                console.log(error);
                return throwError(()=> new Error(`There are not a countries in the region ${region}`))
            })
        )
    }

}
