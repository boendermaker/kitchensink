/* eslint-disable prettier/prettier */
import {DatagridTableBaseColumnFilterModel} from '../basecolumnfilter.model';
import {DateTime, Interval} from 'luxon';
import * as _ from 'lodash';

export class DatagridTableDateColumnFilterModel extends DatagridTableBaseColumnFilterModel {

  //###########################

  filterLocal(dataRow: unknown): boolean {
    const filterValues = this.getFilterValues();
    const fromDate: Date = filterValues?.fromDate;
    const fromHours: number = Number(filterValues.fromTime?.split(':')[0]);
    const fromMinutes: number = Number(filterValues.fromTime?.split(':')[1]);
    const toDate: Date = filterValues?.toDate;
    const toHours: number = Number(filterValues.toTime?.split(':')[0]);
    const toMinutes: number = Number(filterValues.toTime?.split(':')[1]);

    if(filterValues.fromDate && filterValues.toDate) {
      const fromTimestamp: number = DateTime.fromJSDate(fromDate).set({hour: fromHours, minute: fromMinutes, second: 0}).toMillis();
      const toTimestamp: number = DateTime.fromJSDate(toDate).set({hour: toHours, minute: toMinutes, second: 0}).toMillis();

      return this.propPath.some((propPathDestination) => {
        const sourceTimestamp: number = DateTime.fromISO(dataRow[propPathDestination]).toMillis();

        if (sourceTimestamp) {
          console.log(sourceTimestamp, fromTimestamp, toTimestamp);
          return _.inRange(sourceTimestamp, fromTimestamp, toTimestamp);
        }
      })

    }
    return true;
  }

  //###########################

  getMongoDbFilterObj() {
    if (this.filterValues[0].value) {
      const regexFilter = {$regex: `.*(?i)${this.filterValues[0].value}.*`};
      const filterBuildArray = [];

      this.propPath.forEach((propPathDestination) => {
        filterBuildArray.push({[`${propPathDestination}`]: regexFilter});
      });

      const filter = {
        $or: filterBuildArray,
      };

      return filter;
    }
  }

  //###########################

  private getFilterValues(): { fromDate: Date | null, toDate: Date | null, fromTime: string, toTime: string } {
    return {
        fromDate: <Date>this.filterValues.find(value => value.id === 'fromDate')?.value,
        toDate: <Date>this.filterValues.find(value => value.id === 'toDate')?.value,
        fromTime: <string>this.filterValues.find(value => value.id === 'fromTime')?.value,
        toTime: <string>this.filterValues.find(value => value.id === 'toTime')?.value,
    }
  }

  //###########################

}
