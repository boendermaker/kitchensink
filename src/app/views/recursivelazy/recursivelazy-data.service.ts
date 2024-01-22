import { Injectable } from '@angular/core';
import { ITreeData, INodeData } from './interface';
import { BehaviorSubject } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class RecursiveLazyDataService {

  nodeData$: BehaviorSubject<INodeData> = new BehaviorSubject(null);
  treeData$: BehaviorSubject<INodeData> = new BehaviorSubject(null);

  nodeData: INodeData[] = [];
  treeData: ITreeData[] = [];
  selectedItem: ITreeData;
  collapseNodes: boolean = true;

  //Parent / Child relationship data, where rootnodes are without parentid
  fakeDataBase: INodeData[] = [
    {id: '1ad3a', parentid: undefined, type: 'group', label: 'GroupA' },
      {id: 'kughf', parentid: '1ad3a', type: 'item', label: 'ItemA1' },
      {id: 'xsdcr', parentid: '1ad3a', type: 'item', label: 'ItemA2' },
    {id: 'sf43a', parentid: undefined, type: 'group', label: 'GroupB' },
      {id: 'asdve', parentid: 'sf43a', type: 'item', label: 'ItemB1' },
      {id: 'r2rew', parentid: 'sf43a', type: 'group', label: 'GroupC' },
        {id: 'cxdfe', parentid: 'r2rew', type: 'item', label: 'ItemC1' },
        {id: 'wxyas', parentid: 'r2rew', type: 'item', label: 'ItemC2' },
      {id: 'jfgh6', parentid: 'sf43a', type: 'item', label: 'ItemB2' }
  ];

  constructor() {
  }

//###########################################################################

  fetchNodes(parentid: string): Promise<boolean> {
    return new Promise((resolve) => {

      setTimeout(() => {

        this.fakeDataBase.filter(f => f.parentid === parentid)?.forEach((dataItem: INodeData) => {

          const nodeItem: INodeData = {
            id: dataItem?.id,
            parentid: dataItem?.parentid,
            type: dataItem?.type,
            label: dataItem?.label
          };

          //Check if node already exist
          if(this.nodeData.findIndex(f => f.id === nodeItem.id) < 0) {
            this.nodeData.push(nodeItem);
          }

        })

        resolve(true);

      }, 1000)

    })

  }

//###########################################################################

  addTreeRootNodes() {
    this.nodeData.filter(f => f.parentid === undefined)?.forEach((nodeItem: INodeData) => {

      const treeItem: ITreeData = {
        id: nodeItem?.id,
        type: nodeItem?.type,
        level: 1,
        loading: false,
        label: nodeItem?.label,
        children: []
      };

      this.treeData.push(treeItem);

    })
  }

//###########################################################################

  /*addTreeChildrenNodes(id: string) {

    const treeNode: ITreeData = this.deepFind(id, this.treeData);
    const children: INodeData[] = this.getChildrenNodes(id);

    console.log('TREENODE ', treeNode);

    if(treeNode && children && children?.length > 0) {
      treeNode['children'] = children;
    }

  }*/

//###########################################################################

  addTreeChildrenNodes(selectedTreeNode: ITreeData) {

    const treeNode: ITreeData = selectedTreeNode;
    const children: INodeData[] = this.getChildrenNodes(treeNode?.id);

    console.log('TREENODE ', treeNode);

    if(treeNode && children && children?.length > 0) {
      treeNode['children'] = children;
    }

  }

//###########################################################################

  getChildrenNodes(id: string): INodeData[] {
    return this.nodeData.filter(f => f.parentid === id);
  }

//###########################################################################

  async selectItem(item: ITreeData, index: number, e) {
    //Only collapse all when clicked on first level items
    item['level'] === 1 ? this.setAllCollapsed(0) : null;
    this.selectedItem = item;
    item['collapsed'] = !item['collapsed'];

    //Only load if current treenode has no children
    item['loading'] = true;
    item['children'] === undefined || item['children'].length === 0 ? await this.fetchNodes(item['id']) : null;
    item['loading'] = false;

    this.addTreeChildrenNodes(item);
    this.updateTreeDataItems(this.treeData, 0);
  }

//###########################################################################

  //Collapse all items except root level
  setAllCollapsed(level): void {

    level++;

    for(let i=0; i < this.treeData.length; i++) {
      this.collapseNodes ? level === 1 ? this.treeData[i].collapsed = false : null : null;
      this.treeData[i].level = level;
    }

  }

//###########################################################################

  updateTreeDataItems(treeData: ITreeData[], level): void {

    level++;

    for(let i=0; i < treeData.length; i++) {
      //treeData[i].collapsed = false;
      treeData[i].level = level;
      if(treeData[i]?.children?.length > 0) {
        this.updateTreeDataItems(treeData[i].children, level);
      }
    }

  }

//###########################################################################

  deepFind(id: string, treeData: ITreeData[]) {
    let treeNode: ITreeData = undefined;

    const deepFindRecursive = (id: string, treeData: ITreeData[]) => {

      for(let i=0; i < treeData.length; i++) {
        if (treeData[i]?.id === id) {
          treeNode = treeData[i];
        }
        if(treeData[i]?.children?.length > 0) {
          deepFindRecursive(id, treeData[i]?.children);
        }
      }
    }

    if(treeData?.length > 0) {
      deepFindRecursive(id, treeData);
    }

    return treeNode;
  }

//###########################################################################

  async render(): Promise<void> {
    //create rootnodes
    this.nodeData = [];
    this.treeData = [];
    await this.fetchNodes(undefined);
    this.addTreeRootNodes();

    console.log(this.treeData);
  }

//###########################################################################

}
