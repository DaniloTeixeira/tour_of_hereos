import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/core/models/MenuItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = 'Tour Of Heroes';
  menuItems: MenuItem[] = [
    {
      icon: 'dashboard',
      routerLink: '/dashboard',
      toolTipText: 'Dashboard',
    },
    {
      icon: 'sports_martial_arts',
      routerLink: '/',
      toolTipText: 'Heroes',
    },
  ];
}
