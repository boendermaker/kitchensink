import { Injectable } from '@angular/core';
import { IDashboard, IDashboardConfig, IDashboardWidget } from './dashboard.interface';
import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType,
  PushDirections,
  Resizable
} from 'angular-gridster2';
import { BehaviorSubject, Observable, empty } from 'rxjs';

@Injectable()
export class DashboardService {

  dashboards$: BehaviorSubject<IDashboard[]> = new BehaviorSubject([]);
  dashboards_: Observable<IDashboard[]> = this.dashboards$.asObservable();
  dashboards: IDashboard[] = [];

  selectedDashboard$: BehaviorSubject<IDashboard> = new BehaviorSubject(null);
  selectedDashboard_: Observable<IDashboard> = this.selectedDashboard$.asObservable();
  selectedDashboardId: string = '';

  defaultConfig: IDashboardConfig = {
    setGridSize: true,
    gridType: GridType.ScrollVertical,
    compactType: CompactType.None,
    margin: 24,
    outerMargin: true,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    mobileBreakpoint: 640,
    useBodyForBreakpoint: false,
    minCols: 8,
    maxCols: 8,
    minRows: 4,
    maxRows: 100,
    maxItemCols: 100,
    minItemCols: 1,
    maxItemRows: 100,
    minItemRows: 1,
    maxItemArea: 2500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 105,
    fixedRowHeight: 105,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    enableOccupiedCellDrop: false,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    ignoreMarginInRow: false,
    draggable: {
      enabled: false
    },
    resizable: {
      enabled: false
    },
    swap: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: { north: true, east: true, south: true, west: true },
    pushResizeItems: false,
    displayGrid: DisplayGrid.OnDragAndResize,
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false
  };

  teststate: IDashboard[] = [
    {
      id: '81c8b79c-394b-48b1-a659-9ebe158fc031',
      label: 'Dashboard 1',
      config: this.defaultConfig,
      widgets: [
        {
          id: 'b5b320be-1176-449d-8d53-07e92f9e093c',
          defaultComponent: null,
          settingsComponent: null,
          config: { x: 0, y: 0, rows: 1, cols: 2, hasContent: true }
        },
        {
          id: 'f7617421-618f-40c1-b4ef-59b07943a58d',
          defaultComponent: null,
          settingsComponent: null,
          config: { x: 0, y: 0, rows: 1, cols: 2, hasContent: true }
        },
      ]
    }
  ]

  constructor() { }

  //##################################################################

  getEmptyDashboard(label: string): IDashboard {
    return {
      id: self.crypto.randomUUID(),
      label: label,
      config: this.defaultConfig,
      widgets: []
    }
  }

  //##################################################################

  getEmptyWidget(): IDashboardWidget {
    return         {
      id: self.crypto.randomUUID(),
      defaultComponent: null,
      settingsComponent: null,
      config: { x: 0, y: 0, rows: 1, cols: 1, hasContent: true }
    }
  }

  //##################################################################

  updateDashboardConfig(id: string, config: IDashboardConfig): void {
    this.dashboards$.next([...this.dashboards$.value.map((dashboardItem: IDashboard) => {
      if(dashboardItem.id === id) {
        dashboardItem.config = config;
      }
      return dashboardItem;
    })])

    this.selectDashboard(id);

  }

  //##################################################################

  toggleEditMode(): void {
    const newConfig: Partial<IDashboardConfig> = {
      resizable: {
        enabled: !this.selectedDashboard$.value.config.resizable.enabled
      },
      draggable: {
        enabled: !this.selectedDashboard$.value.config.draggable.enabled
      }
    }
    this.updateDashboardConfig(this.selectedDashboardId, newConfig);
  }

  //##################################################################

  selectDashboard(id: string): void {
    this.selectedDashboardId = id;
    const selectDashboard = this.dashboards$.value.find(f => f.id === id);
    this.selectedDashboard$.next(selectDashboard);
    console.log('SELECTED ', selectDashboard)
  }

  //##################################################################

  selectDashboardByIndex(index: number): void {
    const selectDashboard = this.dashboards$.value[index];
    this.selectedDashboard$.next(selectDashboard);
    console.log('SELECTED BY ID ', selectDashboard)
  }

  //##################################################################

  addEmptyDashboard(label: string): void {
    const emptyDashboard = this.getEmptyDashboard(label);
    if(emptyDashboard) {
      this.dashboards$.next([...this.dashboards$.value, emptyDashboard]);
    }
  }

  //##################################################################

  removeDashboard(id: string): void {
    if(id) {
      this.dashboards$.next(this.dashboards$.value.filter(r => r.id !== id));
    }
  }

  //##################################################################

  addEmptyWidget(): void {

  }

  //##################################################################


}
