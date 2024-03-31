import { IDashboard, IDashboardWidget, IDashboardWidgetContent, IDashboardWidgetConfig, defaultWidgetConfig } from "../dashboard.interface";
import { DashboardService } from "./dashboard.service";
import { Widget } from "../widget.class";
import { widgetContent } from "../widget-content";

export class DashboardServiceWidgetUtils {

  ref: DashboardService;

  constructor(ref: DashboardService) {
    this.ref = ref;
  }

//##################################################################

  add(contentKey: string) {
    const dashboard = this.ref.dashboardUtils.getRendered();
    const config: IDashboardWidgetConfig = dashboard.config.api.getFirstPossiblePosition(defaultWidgetConfig);
    const newWidgetState: IDashboardWidget = {
      id: this.ref.createUUID(),
      label: '---',
      config: config,
      contentId: contentKey,
      contentConfig: {}
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

  getAllWidgetContent(): IDashboardWidgetContent[] {
    return widgetContent;
  }

//##################################################################

  getWidgetContentById(contentId: string): IDashboardWidgetContent {
    if(contentId) {
      return widgetContent.find(f => f.id === contentId);
    }
  }

//##################################################################

}
