import { IDatagridTableColumnFilter } from "@app/components/datagridtable/interfaces/columnfilter.inteface";
import { DatagridTableStringfilterComponent } from "./stringcolumnfilter.component";
import _ from 'lodash';

export class DatagridTableCustomColumnStringFilter implements IDatagridTableColumnFilter {
  
  filterComponentRef: DatagridTableStringfilterComponent = null;
  columnName: string = null;

  //############################

  dbFilterCallback(dataRow: unknown): any {
    const regexFilter = {$regex: `.*(?i)${this.filterComponentRef.filterControl?.value}.*`};
    const filterBuildArray = [];

    if(this.filterComponentRef.propPath.length > 0) {
      this.filterComponentRef.propPath.forEach((propPathDestination: string) => {
          filterBuildArray.push({[`${propPathDestination}`]: regexFilter});
      });
    }

    const filter = {
      $or: filterBuildArray,
    };

    return this.filterComponentRef.filterControl?.value ? filter : null;
  }
  
  //############################

  filterCallBack(dataRow: unknown): boolean {
    const results: boolean[] = [];
    const filterValue: string = this.filterComponentRef?.filterControl?.value.toString().toLowerCase();

    if(this.filterComponentRef.propPath.length > 0) {
      this.filterComponentRef.propPath.forEach((propPathDestination: string) => {
        if(dataRow && _.has(dataRow, propPathDestination)) {
          const propValue: string = _.get(dataRow, propPathDestination).toString().toLowerCase();
          results.push(propValue.includes(filterValue));
        }
      });
    }

    return results.every((result: boolean) => result === true);
  }

  //############################


}
