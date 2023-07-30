export interface INodeData {
  id: string,
  parentid: string,
  type: 'group'|'item',
  label: string
}

export interface ITreeData {
    id?: string,
    level?: number,
    collapsed?: boolean,
    loading?: boolean,
    type?: 'group'|'item',
    label?: string,
    children?: any[]
}
