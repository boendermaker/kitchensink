import { GridsterConfig, Resizable, Draggable, PushDirections } from '../gridster2/gridsterConfig.interface';
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
