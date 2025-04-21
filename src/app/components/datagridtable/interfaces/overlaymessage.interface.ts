export interface IDatagridTableMessageOverlay {
  showMessages: boolean;
  messages: IDatagridTableMessageOverlayMessageItem[];
}

export interface IDatagridTableMessageOverlayMessageItem {
  type: TDatagridTableMessageTypes;
  content: string;
}

export type TDatagridTableMessageTypes = 'info' | 'error' | 'warning' | 'success';
