import { Component } from '@angular/core';
import { ITreeData } from './interface';
import { rndID } from '@app/shared/util/rndid'

@Component({
  selector: 'app-recursive',
  templateUrl: './recursive.component.html',
  styleUrls: ['./recursive.component.scss'],
  standalone: false,
})

export class RecursiveComponent {

  selectedItem: any = null;
  treePath: any[] = [];

  treeData: ITreeData[] = [
    { label: 'A',
      type: 'group',
      children: [
        { label: 'A1', type: 'item', children: []},
        { label: 'A2', type: 'item', children: []},
        { label: 'A3', type: 'group', children: [
          { label: 'A3-1', children: []},
          { label: 'A3-2', children: []}
        ]}
      ]
    },
    { label: 'B',
      type: 'group',
      children: [
        { label: 'B1', type: 'item', children: []},
        { label: 'B2', type: 'group', children: [
          { label: 'B2-1', children: []},
          { label: 'B2-2', children: []},
          { label: 'B2-3', children: []}
        ]},
        { label: 'B3', type: 'item', children: []}
      ]
    }
  ]

  constructor() {
    console.log('DATA ', this.treeData);
  }

  //###################################################

  ngOnInit(): void {
    this.setupTreeData(this.treeData, 0);
  }

  //###################################################

  selectItem(item, index, e) {
    //Only collapse all when clicked on first level items
    item?.level === 1 ? this.setAllCollapsed(this.treeData, 0) : null;
    this.selectedItem = item;
    item['collapsed'] = !item['collapsed'];
    console.log(item);
    console.log(this.selectedItem, index, (<HTMLElement>e.target.nextSibling));
  }

  //###################################################

  setupTreeData(treeData: ITreeData[], level): void {

    level++;

    for(let i=0; i < treeData.length; i++) {
      treeData[i].id = rndID();
      treeData[i].collapsed = false;
      treeData[i].level = level;
      if(treeData[i].children.length > 0) {
        this.setupTreeData(treeData[i].children, level);
      }
    }

  }

  //###################################################
  //Collapse all items except the one who was clicked
  setAllCollapsed(treeData: ITreeData[], level): void {

    level++;

    for(let i=0; i < treeData.length; i++) {
      level === 1 ? treeData[i].collapsed = false : null;
      treeData[i].level = level;
      if(treeData[i].children.length > 0) {
        this.setupTreeData(treeData[i].children, level);
      }
    }
  }

  //###################################################

}
