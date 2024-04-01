import { IDashboard, IDashboardWidget, IDashboardWidgetContent, IDashboardWidgetConfig, defaultWidgetConfig, IDashboardWidgetContentSettings } from "../dashboard.interface";
import { DashboardService } from "./dashboard.service";
import { Widget } from "../widget.class";

export class DashboardServiceWidgetUtils {

  ref: DashboardService;

  constructor(ref: DashboardService) {
    this.ref = ref;
  }

//##################################################################

  add(contentId: string) {
    const dashboard = this.ref.dashboardUtils.getRendered();
    const config: IDashboardWidgetConfig = dashboard.config.api.getFirstPossiblePosition(defaultWidgetConfig);
    const newWidgetState: IDashboardWidget = {
      id: this.ref.createUUID(),
      config: config,
      contentId: contentId,
      contentSettings: {}
    }

    const newWidget: IDashboardWidget = new Widget(newWidgetState);

    dashboard?.widgets.push(newWidget);
    this.ref.renderDashboardById(this.ref.renderedDashboardId);
  }

//##################################################################

  removeById(widtgId: string): void {
    const dashboard: IDashboard = this.ref.dashboardUtils.getRendered();
    dashboard.widgets = dashboard.widgets.filter(f => f.id !== widtgId);
    this.ref.stateChanged();
  }

//##################################################################

  removeByIndex(widgetIndex: number): void {
    const dashboard: IDashboard = this.ref.dashboardUtils.getRendered();
    dashboard.widgets = dashboard.widgets.splice(widgetIndex, 1);
    this.ref.stateChanged();
  }

//##################################################################

  getById(widgetId: string): IDashboardWidget {
    if(widgetId) {
      const dashboard = this.ref.dashboardUtils.getRendered();
      return dashboard.widgets.find(f => f.id === widgetId);
    }
  }

//##################################################################

  getByIndex(widgetIndex: number): IDashboardWidget {
    if(widgetIndex) {
      const dashboard = this.ref.dashboardUtils.getRendered();
      return dashboard.widgets[widgetIndex];
    }
  }

//##################################################################

  getAllContent(): IDashboardWidgetContent[] {
    return this.ref.widgetContent;
  }

//##################################################################

  getContentById(contentId: string): IDashboardWidgetContent {
    if(contentId) {
      return this.ref.widgetContent.find(f => f.id === contentId);
    }
  }

//##################################################################

  setContentSettings(widgetId: string, state: any): void {
    if(state && widgetId) {
      const widget = this.getById(widgetId);
      widget.contentSettings = state;
      this.ref.stateChanged();
    }
  }

//##################################################################

  getContentSettings(widgetId: string): IDashboardWidgetContentSettings {
    if(widgetId) {
      const widget = this.getById(widgetId);
      return widget.contentSettings;
    }
  }

//##################################################################

}
