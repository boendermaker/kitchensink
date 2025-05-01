import { IDatagridTableColumnFilterComponent } from "@app/components/datagridtable/interfaces/columnfiltercomponent.interface";
import { IDatagridTableColumnFilter } from "@app/components/datagridtable/interfaces/columnfilter.inteface";
import { DatagridTableStringfilterComponent } from "./stringcolumnfilter.component";
import { DatagridTableService } from "@app/components/datagridtable/datagridtable.service";

export class DatagridTableColumnDefaultFilter implements IDatagridTableColumnFilter {

  filterComponentRef: IDatagridTableColumnFilterComponent = null;
  columnName: string = null;

  filterCallBack(dataRow: unknown): boolean {
    const columnValue: string = dataRow?.[this.columnName].toString().toLowerCase();
    const filterValue: string = (<DatagridTableStringfilterComponent>this.filterComponentRef).filterControl.value.toString().toLowerCase();
    return columnValue.includes(filterValue);
  }

}
