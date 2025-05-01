import { IDatagridTableColumnFilterComponent } from "./columnfilter.interface";

export interface IDatagridTableCustomColumnFilter {
  filterCallBack: (dataRow: unknown) => boolean;
  filterComponentRef: IDatagridTableColumnFilterComponent;
  dataRow: unknown;
  columnName: string;
}
