import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page.component')
      },
      {
        path: '**',
        redirectTo: 'trending',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];


// note: to use the loadComponent without the then you need to export by default the component
