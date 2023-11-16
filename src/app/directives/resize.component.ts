import { Component, HostBinding } from "@angular/core";

@Component({
  selector: 'th[resizable]',
  standalone: true,
  styleUrls: ['./resize.component.scss'],
  templateUrl: './resize.component.html',
})
export class ResizeComponent {
  constructor() {}
  //@HostBinding('style.width.px') width: number | null = null;

  tester(width: any) {
    console.log('WIDTH ', width);
    //this.width = width;
  }

}
