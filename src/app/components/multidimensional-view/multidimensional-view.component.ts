import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multidimensional-view',
  templateUrl: './multidimensional-view.component.html',
  styleUrls: ['./multidimensional-view.component.scss']
})
export class MultidimensionalViewComponent {

  @Input() value: any = [];

  isArray(obj : any ) {
    return Array.isArray(obj);
  }

}
