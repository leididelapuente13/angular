import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
    static mapRestCountryToCountry(restCountry: RESTCountry): Country {
        const { cca2, flag, flags, capital, population, translations } = restCountry;
        return {
            cca2,
            flag,
            population,
            flagSvg: flags.svg,
            name: translations['spa'].common ?? 'No Spanish Name',
            capital: capital ? capital[0] : '',
        }
    }

    static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
        return restCountries.map(restCountry => this.mapRestCountryToCountry(restCountry));
    }
}