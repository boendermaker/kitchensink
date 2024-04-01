import { IDashboardWidget, IDashboardWidgetContentSettings, IDashboardWidgetConfig, defaultWidgetConfig } from "./dashboard.interface";

export class Widget implements IDashboardWidget {

  id: string;
  config?: IDashboardWidgetConfig;
  contentId?: string;
  contentSettings?: IDashboardWidgetContentSettings;

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

  setContentSettings(contentSettings: IDashboardWidgetContentSettings) {
    this.contentSettings = contentSettings;
  }

  getContentSettings(): IDashboardWidgetContentSettings {
    return this.contentSettings;
  }

  private setState(widgetState: IDashboardWidget) {
    console.log('WIDGETSTATECONFIG ', widgetState.config)
    this.id = widgetState.id ? widgetState.id : this.createUUID();
    this.config = widgetState.config ? widgetState.config : defaultWidgetConfig;
    this.contentId = widgetState.contentId;
    this.contentSettings = widgetState.contentSettings;
  }

  private createUUID(): string {
    return crypto.randomUUID();
  }

}
