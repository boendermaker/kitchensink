import { Component } from '@angular/core';
import { ITreeData, INodeData } from './interface';
import { rndID } from '@app/shared/util/rndid'

@Component({
  selector: 'app-recursive-lazy',
  templateUrl: './recursivelazy.component.html',
  styleUrls: ['./recursivelazy.component.scss']
})

export class RecursiveLazyComponent {

  selectedItem: any = null;
  treePath: any[] = [];

  /*treeData: ITreeData[] = [
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
  ]*/

  nodeData: INodeData[] = [
    {id: '1ad3a', parentid: undefined, type: 'group', label: 'GroupA' },
      {id: 'kughf', parentid: '1ad3a', type: 'item', label: 'ItemA1' },
      {id: 'xsdcr', parentid: '1ad3a', type: 'item', label: 'ItemA2' },
    {id: 'sf43a', parentid: undefined, type: 'group', label: 'GroupB' },
      {id: 'asdve', parentid: 'sf43a', type: 'item', label: 'ItemB1' },
      {id: 'r2rew', parentid: 'sf43a', type: 'group', label: 'GroupC' },
        {id: 'cxdfe', parentid: 'r2rew', type: 'item', label: 'ItemC1' },
        {id: 'wxyas', parentid: 'r2rew', type: 'item', label: 'ItemC2' },
      {id: 'jfgh6', parentid: 'sf43a', type: 'item', label: 'ItemB2' }
  ]

  treeData: ITreeData[] = [];

  constructor() {
    console.log('DATA ', this.treeData);
  }

  //###################################################

  ngOnInit(): void {
    this.setupTreeData(this.treeData, 0);
  }

  //###################################################



  //###################################################

  selectItem(item, index, e) {
    //Only collapse all when clicked on first level items
    item?.level === 1 ? this.setAllCollapsed(this.treeData, 0) : null;
    this.selectedItem = item;
    item['collapsed'] = !item['collapsed'];
    console.log(item)
    console.log(this.selectedItem, index, (<HTMLElement>e.target.nextSibling))
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
  //Collapse all items except root level
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
