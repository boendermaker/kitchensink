import { DatagridTableColumnComponent } from "../column/column.component";
import { IDatagridTableColumnFilterComponent } from "./columnfiltercomponent.interface";

export interface IDatagridTableColumnFilter {
  dbFilterCallback: (dataRow: unknown) => boolean;
  filterCallBack: (dataRow: unknown) => boolean;
  filterComponentRef: unknown;
  columnName: string;
}
