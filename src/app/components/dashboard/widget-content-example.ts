import { IDashboardWidgetContent } from "./dashboard.interface";

export const widgetContent: IDashboardWidgetContent[] = [
  {
    id: '835c12e1-4df2-4d7b-98e1-ad0ed54ab2d7',
    label: 'XY Chart',
    displayComponent: () => import('@app/components/widgets/widget-linechart/widget-linechart.component').then(component => component.WidgetLinechartComponent),
    settingsComponent: () => import('@app/components/widgets/widget-linechart/settings/widget-settings.component').then(component => component.WidgetLinechartSettingsComponent)
  },
  {
    id: 'ae4006bc-13c7-4122-a113-368018f1cc49',
    label: 'XY Chart 2',
    displayComponent: () => import('@app/components/widgets/widget-linechart/widget-linechart.component').then(component => component.WidgetLinechartComponent),
    settingsComponent: () => import('@app/components/widgets/widget-linechart/settings/widget-settings.component').then(component => component.WidgetLinechartSettingsComponent)
  }
];
