import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-virtualscroll',
  templateUrl: './virtualscroll.component.html',
  styleUrls: ['./virtualscroll.component.scss'],
  standalone: false,
})
export class VirtualscrollComponent {

  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport: CdkVirtualScrollViewport | undefined;

  items: {name: string, id: number; age: number}[] = []
  rows: {name: string, id: number; age: number}[] = Array(200).fill(0).map((x, i) => {
    return {name: 'name' + i, id: i, age: 27};
  });
  itemSize = 48;

  constructor() {
    this.items = this.rows;
    console.log(this.items);
  }


}
