import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ISideNavItem } from './components/sidenav/sidenav.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isExpanded: boolean = true;
  navDataArray: ISideNavItem[] = [
    {title: 'Start', path: '/index'},
    {title: 'TableForm', path: '/tableform'},
    {title: 'Drawer modal dialog', path: '/drawermodal'},
    {title: 'Data Table', path: '/datatable'},
    {title: 'Virtual Scroll', path: '/virtualscroll'},
  ];

  constructor() {

  }

}
