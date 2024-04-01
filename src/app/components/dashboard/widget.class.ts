import { IDashboardWidget, IDashboardWidgetContentConfig, IDashboardWidgetConfig, defaultDashboardConfig, defaultWidgetConfig } from "./dashboard.interface";

export class Widget implements IDashboardWidget {

  id: string;
  config?: IDashboardWidgetConfig;
  contentId?: string;
  contentConfig?: IDashboardWidgetContentConfig;

  constructor(widgetState: IDashboardWidget) {
    if(widgetState) {
      this.setState(widgetState);
    }
  }

  getId(): string {
    return this.id;
  }

  getContentId(): string {
    return this.contentId;
  }

  setContentConfig(contentConfig: IDashboardWidgetContentConfig) {
    this.contentConfig = contentConfig;
  }

  getContentConfig(): IDashboardWidgetContentConfig {
    return this.contentConfig;
  }

  private setState(widgetState: IDashboardWidget) {
    this.id = widgetState.id ? widgetState.id : this.createUUID();
    this.config = widgetState.config ? widgetState.config : defaultWidgetConfig;
    this.contentId = widgetState.contentId;
    this.contentConfig = widgetState.contentConfig;
  }

  private createUUID(): string {
    return crypto.randomUUID();
  }

}
