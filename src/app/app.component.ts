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
    {title: 'Gridster dashboard', path: '/dashboard'},
    {title: 'Drag and Drop Tabs', path: '/dragdroptabs'},
    {title: 'State', path: '/state'},
    {title: 'Resize table columns', path: '/resizecolumn'},
    {title: 'Load more on Scroll', path: '/scrollload'},
    {title: 'Virtual Keyboard', path: '/virtualkeyboard'},
    {title: 'Component Composition', path: '/composition'},
    {title: 'Multirange Slider', path: '/multirangeslider'},
    {title: 'Control Container FormArray', path: '/controlcontainer'},
    {title: 'Model to Formgroup', path: '/modeltoformgroup'},
    {title: 'RXJS Playground', path: '/rxjsplayground'},
    {title: 'SVG Playground', path: '/svgplayground'},
    {title: 'Datagrid', path: '/datagrid'},
    {title: 'Automigrations', path: '/automigrations'},
    {title: 'Multilanguage Form', path: '/multilanguageform'}
  ];

  constructor() {

  }

}
