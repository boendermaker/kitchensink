import { Component, ViewChild } from '@angular/core';
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
    {title: 'Dynamic Form', path: '/dynamicform'},
    {title: 'Blockly', path: '/blockly'},
    {title: 'Recursive', path: '/recursive'},
    {title: 'Recursive Lazy', path: '/recursivelazy'},
    {title: 'Chiplist', path: '/chiplist'},
    {title: 'Webcomponents', path: '/webcomponent'},
<<<<<<< HEAD
    {title: 'Gridster Dashboard', path: '/dashboard'},
=======
    {title: 'Gridster dashboard', path: '/dashboard'},
>>>>>>> d3cef95c7dce72cdda8a6026888d413202611349
  ];

  constructor() {

  }

}
