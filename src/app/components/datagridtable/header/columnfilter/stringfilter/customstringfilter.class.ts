import { IDatagridTableColumnFilterComponent } from "@app/components/datagridtable/interfaces/columnfilter.interface";
import { IDatagridTableCustomColumnFilter } from "@app/components/datagridtable/interfaces/customfilter.inteface";
import { DatagridTableStringfilterComponent } from "./stringcolumnfilter.component";
import { DatagridTableService } from "@app/components/datagridtable/datagridtable.service";

export class ColumnFilterCallBack implements IDatagridTableCustomColumnFilter {

  filterComponentRef: IDatagridTableColumnFilterComponent = null;
  dataRow: unknown = null;
  columnName: string = null;

  constructor(
    private datagridTableService: DatagridTableService,
  ) {
  }

  filterCallBack(dataRow: unknown): boolean {
    const columnValue: string = dataRow?.[this.columnName].value.toString().toLowerCase();
    const filterValue: string = (<DatagridTableStringfilterComponent>this.filterComponentRef).filterControl.value.toString().toLowerCase();
    return columnValue.includes(filterValue);
  }

}
