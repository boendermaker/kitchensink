import { IDashboardWidgetComponent } from "./dashboard.interface";

export const dashboardWidgets: Record<string, IDashboardWidgetComponent> = {
  linechart1: {
    label: 'XY Chart',
    displayComponent: () => import('@app/components/widgets/widget-linechart/widget-linechart.component').then(component => component),
    settingsComponent: () => import('@app/components/widgets/widget-linechart/settings/widget-settings.component').then(component => component)
  },
  linechart2: {
    label: 'XY Chart 2',
    displayComponent: () => import('@app/components/widgets/widget-linechart/widget-linechart.component').then(component => component),
    settingsComponent: () => import('@app/components/widgets/widget-linechart/settings/widget-settings.component').then(component => component)
  }
};
