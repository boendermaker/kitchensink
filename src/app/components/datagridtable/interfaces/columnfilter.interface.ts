export interface IDatagridTableColumnFilterComponent {
  filtercolumn: string;
  filterCallback(dataRow: any): boolean;
  closeFilter(): void;
  updateFilter(): void;
  resetFilter(): void;
  addFilterCallback(): void;
}
