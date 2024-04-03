import { GridsterConfig, Resizable, Draggable, PushDirections, DisplayGrid, GridType, CompactType } from '../gridster2/gridsterConfig.interface';
import { GridsterItem } from '../gridster2/gridsterItem.interface'

export interface IDashboardConfig extends GridsterConfig {
  draggable?: Draggable;
  resizable?: Resizable;
  pushDirections?: PushDirections;
}

export interface IDashboardWidgetConfig extends GridsterItem {

}

export interface IDashboardWidgetContent {
  id: string;
  label: string;
  displayComponent: any;
  settingsComponent: any;
}

export interface IDashboardWidgetContentSettings {
  [p: string]: any;
}

export interface IDashboardWidget {
  id?: string;
  config?: IDashboardWidgetConfig;
  contentId?: string;
  contentSettings?: IDashboardWidgetContentSettings;
}

export interface IDashboard {
  id: string;
  label: string;
  config: IDashboardConfig
  widgets: IDashboardWidget[];
  toggleEditMode?(): void;
  optionsChanged?(): void;
}

export interface IDashboardDialogSize {
  small?: { width: string, height: string};
  medium?: { width: string, height: string};
  large?: { width: string, height: string};
}

export const defaultDashboardConfig: IDashboardConfig = {
  //setGridSize: true,
  gridType: GridType.ScrollVertical,
  compactType: CompactType.None,
  margin: 12,
  outerMargin: true,
  outerMarginTop: null,
  outerMarginRight: null,
  outerMarginBottom: null,
  outerMarginLeft: null,
  useTransformPositioning: true,
  mobileBreakpoint: 640,
  useBodyForBreakpoint: false,
  minCols: 8,
  maxCols: 100,
  minRows: 8,
  maxRows: 100,
  maxItemCols: 100,
  minItemCols: 1,
  maxItemRows: 100,
  minItemRows: 1,
  maxItemArea: 2500,
  minItemArea: 1,
  defaultItemCols: 2,
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
  pushItems: false,
  disablePushOnDrag: false,
  disablePushOnResize: false,
  pushDirections: { north: true, east: true, south: true, west: true },
  pushResizeItems: false,
  displayGrid: DisplayGrid.OnDragAndResize,
  disableWindowResize: false,
  disableWarnings: false,
  scrollToNewItems: false
};

export const defaultWidgetConfig = {
  x: 0,
  y: 0,
  rows: 3,
  cols: 4,
  hasContent: true
}

export const dashboardDialogSize: IDashboardDialogSize = {
  small: {
    width: '20vw',
    height: '30vh'
  },
  medium: {
    width: '60vw',
    height: '40vh'
  },
  large: {
    width: '90vw',
    height: '90vh'
  },
}
