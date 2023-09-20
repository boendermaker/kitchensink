import { GridsterConfig, GridsterItem } from 'angular-gridster2';

export interface ICustomDashboardItem extends GridsterItem {
  componentDefaultPath?: string;
  componentDefaultFile?: string;
  componentDefaultClass?: string;
  componentSettingsPath?: string;
  componentSettingsFile?: string;
  componentSettingsClass?: string;
}
