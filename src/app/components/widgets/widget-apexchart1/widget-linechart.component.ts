import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IDashboardWidget } from '@app/components/dashboard/dashboard.interface';
import { DashboardService } from '@app/components/dashboard/dashboard-service/dashboard.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexAnnotations,
  NgApexchartsModule,
} from "ng-apexcharts";
import {series} from './data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  labels: string[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@UntilDestroy()
@Component({
  selector: 'app-widget-linechart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './widget-linechart.component.html',
  styleUrl: './widget-linechart.component.scss'
})
export class WidgetLinechartComponent implements OnInit{

  widgetId: string;
  widget: IDashboardWidget;
  chartOptions: Partial<ChartOptions>;
  series = series;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
    ) {
      this.setChartOptions();
  }

//##################################################################

  setChartOptions(): void {

    this.chartOptions = {
      series: [
        {
          name: "series",
          data: series.monthDataSeries1.prices
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      annotations: {
        yaxis: [
          {
            y: 8200,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396"
              },
              text: "Support"
            }
          },
          {
            y: 8600,
            y2: 9000,
            borderColor: "#000",
            fillColor: "#FEB019",
            opacity: 0.2,
            label: {
              borderColor: "#333",
              style: {
                fontSize: "10px",
                color: "#333",
                background: "#FEB019"
              },
              text: "Y-axis range"
            }
          }
        ],
        xaxis: [
          {
            x: new Date("23 Nov 2017").getTime(),
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "Anno Test"
            }
          },
          {
            x: new Date("26 Nov 2017").getTime(),
            x2: new Date("28 Nov 2017").getTime(),
            fillColor: "#B3F7CA",
            opacity: 0.4,
            label: {
              borderColor: "#B3F7CA",
              style: {
                fontSize: "10px",
                color: "#fff",
                background: "#00E396"
              },
              offsetY: -10,
              text: "X-axis range"
            }
          }
        ],
        points: [
          {
            x: new Date("01 Dec 2017").getTime(),
            y: 8607.55,
            marker: {
              size: 8,
              fillColor: "#fff",
              strokeColor: "red",
              cssClass: "apexcharts-custom-class"
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560"
              },

              text: "Point Annotation"
            }
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      grid: {
        padding: {
          right: 30,
          left: 20
        }
      },
      title: {
        text: "Line with Annotations",
        align: "left"
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "datetime"
      }
    };

  }

//##################################################################

  ngOnInit(): void {
    this.getWidget();
    this.handleStateChanged();
  }

//##################################################################

  getWidget(): void {
    this.widget = this.dashboardService.widgetUtils.getById(this.widgetId);
  }

//##################################################################

  handleStateChanged(): void {
    this.dashboardService.stateChanged_.pipe(untilDestroyed(this)).subscribe({
      next: () => {
        this.cdr.markForCheck();
      }
    })
  }

//##################################################################

}



