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
