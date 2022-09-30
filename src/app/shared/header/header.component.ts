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
      icon: 'group',
      routerLink: '/dashboard',
      toolTipText: 'Dashboard',
    },
  ];
}
