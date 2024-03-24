import { IDashboardWidget, IDashboardWidgetComponentConfig, IDashboardWidgetConfig, defaultDashboardConfig, defaultWidgetConfig } from "./dashboard.interface";

export class Widget implements IDashboardWidget {

  id: string;
  label?: string;
  widgetConfig?: IDashboardWidgetConfig;
  widgetComponentKey?: string;
  widgetComponentConfig?: IDashboardWidgetComponentConfig;

  constructor(widgetState: IDashboardWidget) {
    if(widgetState) {
      this.setState(widgetState);
    }
  }

  setComponentConfig(widgetComponentConfig: IDashboardWidgetComponentConfig) {
    this.widgetComponentConfig = widgetComponentConfig;
  }

  getComponentConfig(): IDashboardWidgetComponentConfig {
    return this.widgetComponentConfig;
  }

  getId(): string {
    return this.id;
  }

  private setState(widgetState: IDashboardWidget) {
    this.id = widgetState.id ? widgetState.id : this.createUUID();
    this.label = widgetState.label ? widgetState.label : '---';
    this.widgetConfig = widgetState.widgetConfig ? widgetState.widgetConfig : defaultWidgetConfig;
    this.widgetComponentKey = widgetState.widgetComponentKey;
    this.widgetComponentConfig = widgetState.widgetComponentConfig;
  }

  private createUUID(): string {
    return crypto.randomUUID();
  }

}
