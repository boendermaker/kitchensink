export interface ITreeData {
    id?: string,
    level?: number,
    collapsed?: boolean,
    type?: 'group'|'item',
    label?: string,
    children?: any[]
}

export interface INodeData {
  id: string,
  parentid: string,
  type: 'group'|'item',
  label: string
}
