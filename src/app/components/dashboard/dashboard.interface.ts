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
