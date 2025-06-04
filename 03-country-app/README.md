# CountryApp

1. Rutas hijas
2. Rutas Anidadas
3. Creación y comunicación entre componentes
4. Tailwind y DaisyUI
5. Archivo de rutas por feature / module
6. Carga perezosa de módulos de rutas

## Children Routes

For having a children routes you should preferabily have a file with the children routes then in the app.routes set the path and then the children or the loadChildren (for lazy loading of the children routes).

note: export by default the router of the children routes.

```typescript
    {
        path: 'country',
        loadChildren: ()=> import('./country/country.routes')
    },
```

```typescript
const countryRoutes: Routes = [
    {
        path: "",
        component: ByCapitalPageComponent,
    },
];

export default countryRoutes;
```

## Layout

For having a layout to your routes you'll need: a layout component, this needs to import and use the outlet component in it.

```typescript
const countryRoutes: Routes = [
    {
        path: "",
        component: CountryLayoutComponent,
        children: [
            {
                path: "by-capital",
                component: ComponentPage,
            },
        ],
    },
];

export default countryRoutes;
```

```html
<header></header>
<main>
    <router-outlet></router-outlet>
</main>
```

## Handle active route

Apply styles to the router that is active. First you'll need to import RouterLink and RouterLinkActive in your component.

```html
<a routerLinkActive="btn btn-primary" routerLink="by-capital">Capital</a>
```

### Redirection

Import router link in your component

```html
<button routerLink="/country"></button>
```

### Local reference

To have a local reference for an input and access to its value directly.

```html
<input type="text" #txtName (keyup.enter)="onSearch(txtName.value)" />
```

## Mappers

Mappers are a good practice for your frontend to be adaptable to changes in the backend even if the backend is designed by you and the interfaces are the same.
To have a mapper you'll need to have an interface for the response that the backend returns and one for your entity, then you have to create a function to map what you recieve from the backend to your entity. Another function to map the array that you recieve from the backend to your entity's arrays. Then you'll need to use observables to map the response in the service.

```typescript
export class CountryMapper {
    static mapRestCountryToCountry(restCountry: RESTCountry): Country {
        const { cca2, flag, flags, name, capital, population } = restCountry;
        return {
            cca2,
            flag,
            population,
            flagSvg: flags.svg,
            name: name.common,
            capital: capital ? capital[0] : "",
        };
    }

    static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
        return restCountries.map((restCountry) => this.mapRestCountryToCountry(restCountry));
    }
}
```

```typescript
serachByCapital(query: string): Observable<Country[]> {
    return this.http.get<RESTCountry[]>(`${this.API_URL}/${query}`).pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries))
    );
}
```

## Observables

-   Observables can emit multiple values over time, whereas arrays are static and contain a fixed set of values.
-   Observables can handle asynchronous data sources like user input, network requests, and timers, whereas synchronous data structures like arrays cannot.
-   Observables can be combined, transformed, and composed in various ways to create more complex data streams.

### Types of observables

-   #### (of)
    Use it to create observables that emit a fix set of values

### Observables operators

-   ### map()

    Transforms each value emitted by an Observable by applying a function to it.

-   ### filter()

    Filters out values emitted by an Observable that do not meet a specified condition.

-   ### merge()

    Combines multiple Observables into a single stream of values.

-   ### subscribe()

    is for activating the observable and listening for emitted values.

-   ### pipe()
    is for chaining observable operators.

## Handle exceptions

with resources you can handle your request and access to the states and data of the request.

1. catch the error and handle it in the service.

```typescript
searchByCapital(query: string): Observable<Country[]> {
    return this.http.get<RESTCountry[]>(`${this.API_URL}/capital/${query}`).pipe(
         map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
    catchError((error) => {
                console.log('error fetching', error)
                return throwError(() => new Error(`Error fetching capital ${query}`));
            })
    );
}
```

2. create the resource in the component. Resources are really useful to handle asynchronous resources

```typescript
countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
        const queryValue = request.query;
        if (!queryValue) return [];
        return await firstValueFrom(this.countryService.searchByCapital(queryValue));
    },
});
```

**Note:** resource are recommended to use primarly for GET request

3. Access to the data

```html
countryResource = resource({ @if (countryResource.error()) {
<h3>{{ countryResource.error() }}</h3>
}
<!--  -->
@if(countryResource.hasValue()) {
<country-list [countries]="countryResource.value()" />
}
```

### Resource properties and functions

-   value
-   status
-   error
-   isLoading
-   has value
-   reload():

### Location

location has different methods and one of them is going back on the past route.

```typescript
import { Location } from '@angular/common';

location = inject(Location);

goBack(){
    this.location.back();
}
```

### Activated route

**snapshot:** gets the value of the route when the component loads.

```typescript
countryCode = inject(ActivatedRoute).snapshot.params["code"];
```

### Debounce search

```typescript
debounceTime = input<number>(500);
search = output<string>();
inputValue = signal<string>("");

debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
        this.search.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
        clearTimeout(timeout);
    });
});
```

```html
<section class="flex flex-row gap-2 mt-2">
    <input type="text" class="input input-bordered mt-2 w-56" [placeholder]="placeholder()" autofocus #txtSearch (keyup.enter)="search.emit(txtSearch.value)" (keyup)="inputValue.set(txtSearch.value)" />
    <button class="btn btn-primary mt-2" (click)="search.emit(txtSearch.value)">Buscar</button>
</section>
```

### Cache data

```typescript
private queryCacheCountry = new Map<string, Country[]>;


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
```

### Validate query params
```typescript
function validateQueryParams(queryParams : string): Region{
    queryParam = queryParam.toLowerCase();

    const validRegions: Record<string, Region> = {
        africa: 'Africa',
        americas: 'Americas',
        asia: 'Asia',
        europe: 'Europe',
        oceania: 'Oceania',
        antartic: 'Antartic'
    }


    return validRegions[queryParam] ?? 'Americas'
}


queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region')) ?? '';
selectedRegion = linkedSignal<Region>(()=>validateQueryParams(this.queryParams));
```
