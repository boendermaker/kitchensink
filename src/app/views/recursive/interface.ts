export interface ITreeData {
    id?: string,
    level?: number,
    collapsed?: boolean,
    type?: 'group'|'item',
    label: string,
    children: any[]
}
