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

export interface ICustomDashboardItem {
  componentDefaultPath?: string;
  componentDefaultFile?: string;
  componentDefaultClass?: string;
  componentSettingsPath?: string;
  componentSettingsfile?: string;
  componentSettingsclass?: string;
  widgetSettings: GridsterItem;
}

export interface ICustomDashboardConfig extends GridsterConfig {
  draggable?: Draggable;
  resizable?: Resizable;
  pushDirections?: PushDirections;
}
