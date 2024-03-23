import { GridsterConfig, Resizable, Draggable, PushDirections, DisplayGrid, GridType, CompactType } from '../gridster2/gridsterConfig.interface';
import { GridsterItem } from '../gridster2/gridsterItem.interface'

export interface IDashboardConfig extends GridsterConfig {
  draggable?: Draggable;
  resizable?: Resizable;
  pushDirections?: PushDirections;
}

export interface IDashboardWidget {
  id: string;
  label?: string;
  defaultComponent?: any;
  settingsComponent?: any;
  config: GridsterItem;
}

export interface IDashboard {
  id: string;
  label?: string;
  config: IDashboardConfig
  widgets: IDashboardWidget[];
  toggleEditMode?(): void;
  optionsChanged?(): void;
}

export const defaultDashboardConfig: IDashboardConfig = {
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
