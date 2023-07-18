import { Component } from '@angular/core';

@Component({
  selector: 'app-recursive',
  templateUrl: './recursive.component.html',
  styleUrls: ['./recursive.component.scss']
})

export class RecursiveComponent {

  selectedItem: any = null;

  treeData: any = [
    { label: 'A', 
      children: [
        { label: 'A1', children: []},
        { label: 'A2', children: []},
        { label: 'A3', children: [
          { label: 'A3-1', children: []},
          { label: 'A3-2', children: []}
        ]}
      ]
    },
    { label: 'B', 
      children: [
        { label: 'B1', children: []},
        { label: 'B2', children: [
          { label: 'B2-1', children: []},
          { label: 'B2-2', children: []},
          { label: 'B2-3', children: []}
        ]},
        { label: 'B3', children: []}
      ]
    }
  ]

  constructor() {
    console.log('DATA ', this.treeData);
  }

  log(value) {
    console.log(value);
  }

  selectItem(item) {
    this.selectedItem = item;
    console.log(this.selectedItem)
  }

}
