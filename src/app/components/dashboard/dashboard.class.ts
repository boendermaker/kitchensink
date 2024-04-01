import { IDashboard, IDashboardConfig, IDashboardWidget, defaultDashboardConfig } from "./dashboard.interface";

export class Dashboard implements IDashboard {

  id: string;
  label: string;
  config: IDashboardConfig;
  widgets: IDashboardWidget[];
  defaultConfig: IDashboardConfig = defaultDashboardConfig;


  constructor(dashBoardState?: IDashboard, label?: string, id?: string) {
    id ? this.id = id : this.id = this.createUUID();
    label ? this.label = label : label = '---';
    this.config = this.defaultConfig;
    this.widgets = [];
    if(dashBoardState) {
      this.setState(dashBoardState);
    }
  }

  toggleEditMode(): void {
    const override: Partial<IDashboardConfig> = {
      resizable: {
        enabled: !this.config.resizable.enabled
      },
      draggable: {
        enabled: !this.config.draggable.enabled
      }
    }
    this.config = {...this.config, ...override};
  }

  optionsChanged(): void {
    if (this.config.api && this.config.api.optionsChanged) {
      this.config.api.optionsChanged();
    }
  }

  private setState(dashBoardState: IDashboard): void {
    this.id = dashBoardState.id;
    this.widgets = dashBoardState.widgets;
    //this.config = dashBoardState.config;
    this.config = defaultDashboardConfig;
    this.label = dashBoardState.label;
  }

  private createUUID?(): string {
    return crypto.randomUUID();
  }

}
