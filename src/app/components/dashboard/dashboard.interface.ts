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

export interface ICustomDashboardItem extends GridsterItem {
  componentDefaultPath?: string;
  componentDefaultFile?: string;
  componentDefaultClass?: string;
  componentSettingsPath?: string;
  componentSettingsFile?: string;
  componentSettingsClass?: string;
}

export interface ICustomDashboardConfig extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}
