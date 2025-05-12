import { Component } from '@angular/core';
import { MenuItem } from '../../../../../interfaces/MenuItem.interface';
import reactiveRoutes from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import authRoutes from '../../../auth/auth.routes';

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {
  reactiveItems = reactiveRoutes[0].children ?? [];
  reactiveMenu: MenuItem[] = this.reactiveItems.filter((item) => item.path !== '**').map((item) => ({
    route: `reactive/${item.path}`,
    title: `${item.title}`
  }));

  authMenu = authRoutes[0].children ?? [];
  authItems: MenuItem[] = this.authMenu.filter((item) => item.path !== '**').map((item) => ({
    route: `auth/${item.path}`,
    title: `${item.title}`
  }));

  country : MenuItem[] = [
    {
      title: 'Paises',
      route: '/country'
    }
  ]
}
