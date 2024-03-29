import { IDashboard, IDashboardWidget, IDashboardWidgetComponent, IDashboardWidgetConfig, defaultWidgetConfig } from "../dashboard.interface";
import { DashboardService } from "./dashboard.service";
import { Widget } from "../widget.class";
import { dashboardWidgets } from "../widgets";

export class DashboardServiceWidgetUtils {

  ref: DashboardService;

  constructor(ref: DashboardService) {
    this.ref = ref;
  }

//##################################################################

  add(widgetComponentKey: string) {
    const dashboard = this.ref.dashboardUtils.getRendered();
    const config: IDashboardWidgetConfig = dashboard.config.api.getFirstPossiblePosition(defaultWidgetConfig);
    const newWidgetState: IDashboardWidget = {
      id: this.ref.createUUID(),
      label: '---',
      widgetConfig: config,
      widgetComponentKey: widgetComponentKey,
      widgetComponentConfig: {}
    }

    const newWidget: IDashboardWidget = new Widget(newWidgetState);

    dashboard?.widgets.push(newWidget);
    this.ref.renderDashboardById(this.ref.renderedDashboardId);
  }

//##################################################################

  removeById(widtgId: string): void {
    const dashboard: IDashboard = this.ref.dashboardUtils.getRendered();
    dashboard.widgets.filter(f => f.id !== widtgId);
    this.ref.stateChanged();
  }

//##################################################################

  removeByIndex(widgetIndex: number): void {
    const dashboard: IDashboard = this.ref.dashboardUtils.getRendered();
    dashboard.widgets.splice(widgetIndex, 1);
    this.ref.stateChanged();
  }

//##################################################################

  getAvailableWidgetKeys(): string[] {
    return Object.keys(dashboardWidgets);
  }

//##################################################################

  getAvailableWidgetByKey(widgetKey: string): IDashboardWidgetComponent {
    if(dashboardWidgets.hasOwnProperty(widgetKey)) {
      return dashboardWidgets[widgetKey];
    }
  }

//##################################################################

}
