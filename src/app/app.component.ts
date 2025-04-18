import { Component, ViewChild } from '@angular/core';
import { ISideNavItem } from './components/sidenav/sidenav.interface';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
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

  constructor(
    private matIconRegistry: MatIconRegistry
  ) {
    this.setMatIconFont();
  }

  setMatIconFont(): void {
    this.matIconRegistry.classNameForFontAlias('material-icons-filled');
    this.matIconRegistry.setDefaultFontSetClass('material-icons-filled');
    this.matIconRegistry.registerFontClassAlias('material-icons-filled', 'material-icons-outlined');
  }

}
