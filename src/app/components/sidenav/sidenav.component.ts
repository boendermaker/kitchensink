import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ISideNavItem } from './sidenav.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: false,
})
export class SidenavComponent {

  @Input() opened: boolean = true;
  @Input() openfirst: boolean = false;
  @Input() mode: 'side'|'over' = 'side';
  @Input() data: ISideNavItem[] = [];

  constructor(
    public router: Router
  ) {

  }

  ngOnInit(): void {
  }

//#################################################################################################

  navigate(path: string): void {
    this.router.navigate([path]);
  }

//#################################################################################################


}
