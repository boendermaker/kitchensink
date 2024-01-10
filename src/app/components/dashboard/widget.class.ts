import { GridsterItem } from "@app/components/gridster2/gridsterItem.interface";
import { GridsterConfig } from "@app/components/gridster2/gridsterConfig.interface";
import { IDashboard, IDashboardWidget } from "./dashboard.interface";

export class Widget<T1,T2> implements IDashboardWidget {

  id: string;
  label: string;
  config: GridsterItem;
  defaultComponent: T1;
  settingsComponent: T2;

  constructor(config?: GridsterItem) {
    this.id = this.createUUID();
    this.label = '';
    this.config = config;
  }

  private createUUID(): string {
    return crypto.randomUUID();
  }

}
