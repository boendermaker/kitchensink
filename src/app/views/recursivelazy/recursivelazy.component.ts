import { Component } from '@angular/core';
import { ITreeData, INodeData } from './interface';
import { rndID } from '@app/shared/util/rndid'
import { RecursiveLazyDataService } from './recursivelazy-data.service';

@Component({
  selector: 'app-recursive-lazy',
  templateUrl: './recursivelazy.component.html',
  styleUrls: ['./recursivelazy.component.scss']
})

export class RecursiveLazyComponent {

  selectedItem: any = null;
  treePath: any[] = [];
  treeData: ITreeData[] = [];

  constructor(private recursiveLazyDataService: RecursiveLazyDataService) {
    this.treeData = recursiveLazyDataService.treeData;
  }

  //###################################################

  selectItem(item, index, e) {
    //Only collapse all when clicked on first level items
    item?.level === 1 ? this.setAllCollapsed(this.treeData, 0) : null;
    this.selectedItem = item;
    item['collapsed'] = !item['collapsed'];
    this.recursiveLazyDataService.addChildren(item['id']);
    console.log(this.recursiveLazyDataService.treeData);
  }

  //###################################################

  setupTreeData(treeData: ITreeData[], level): void {

    level++;

    for(let i=0; i < treeData.length; i++) {
      treeData[i].collapsed = false;
      treeData[i].level = level;
      if(treeData[i]?.children?.length > 0) {
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
      if(treeData[i]?.children?.length > 0) {
        this.setupTreeData(treeData[i].children, level);
      }
    }
  }

  //###################################################

}
