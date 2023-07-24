import { Injectable } from '@angular/core';
import { ITreeData, INodeData } from './interface';

@Injectable({
  providedIn: 'root'
})
export class RecursiveLazyDataService {

  nodeDataArray: INodeData[] = [];

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
    this.createRoot(undefined);
    console.log('TREEDATA ', this.treeData)
  }

  createRoot(parentid: string) {
    this.nodeData.filter(f => f.parentid == parentid)?.forEach((nodeItem: INodeData) => {
      const treeItem: ITreeData = { id: nodeItem?.id, type: nodeItem?.type, level: 1, label: nodeItem?.label, children: [] };
      this.treeData.push(treeItem);
    })
  }

  deepFind(id: string, treeData: ITreeData[]) {

    for(let i=0; i < treeData.length; i++) {

      if(treeData[i]?.id == id) {
        return treeData[i];
      }

      if(treeData[i]?.children?.length > 0) {
        return this.deepFind(id, treeData[i]?.children);
      }

    }

  }

  getChildren(parentid: string): Promise<INodeData[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.nodeData.filter(f => f.parentid == parentid));
      }, 1000);
    });
  }

  async addChildren(id: string) {
    const treeNode: ITreeData = this.deepFind(id, this.treeData);
    console.log(treeNode);
    const children: INodeData[] = await this.getChildren(id);

    if(children && children?.length > 0) {
      if(treeNode?.hasOwnProperty('children')) {
        treeNode.children = children;
      }else {
        treeNode['children'] = children;
      }
      console.log('CHILDREN ', children)
    }

  }

}
