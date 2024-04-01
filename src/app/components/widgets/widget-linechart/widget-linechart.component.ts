import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { IDashboardWidget } from '@app/components/dashboard/dashboard.interface';
import { DashboardService } from '@app/components/dashboard/dashboard-service/dashboard.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-widget-linechart',
  standalone: true,
  imports: [],
  templateUrl: './widget-linechart.component.html',
  styleUrl: './widget-linechart.component.scss'
})
export class WidgetLinechartComponent implements OnInit, AfterViewInit{

  private root!: am5.Root;
  widgetId: string;
  widget: IDashboardWidget;
  series: am5xy.LineSeries;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
    ) {
  }

//##################################################################

  ngOnInit(): void {
    this.getWidget();
    this.handleStateChanged();
  }

//##################################################################

  ngAfterViewInit() {

    this.browserOnly(() => {

      let root = am5.Root.new(this.widget.id);

      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      let value = 100;

      const generateChartData = () => {
        const chartData = [];
        const firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 1000);
        firstDate.setHours(0, 0, 0, 0);

        for (var i = 0; i < 50; i++) {
          const newDate = new Date(firstDate);
          newDate.setSeconds(newDate.getSeconds() + i);

          value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10;

          chartData.push({
            date: newDate.getTime(),
            value: value
          });
        }
        return chartData;
      }

      const data = generateChartData();

      const chart = root.container.children.push(am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true,
        paddingLeft: 0
      }));

      const easing = am5.ease.linear;

      const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        groupData: false,
        extraMax:0.1, // this adds some space in front
        extraMin:-0.1,  // this removes some space form th beginning so that the line would not be cut off
        baseInterval: {
          timeUnit: "second",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 50
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));

      const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));

      let series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}"
        })
      }));

      this.series = series;

      data[data.length - 1].bullet = true;
      series.data.setAll(data);


      series.bullets.push((root, series, dataItem) => {
        if (dataItem.dataContext['bullet']) {
          var container = am5.Container.new(root, {});
          var circle0 = container.children.push(am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(this.widget.contentSettings['color'] !== '' ? this.widget.contentSettings['color'] : 0x000000 )
          }));
          var circle1 = container.children.push(am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(this.widget.contentSettings['color'] !== '' ? this.widget.contentSettings['color'] : 0x000000)
          }));

          circle1.animate({
            key: "radius",
            to: 20,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic),
            loops: Infinity
          });
          circle1.animate({
            key: "opacity",
            to: 0,
            from: 1,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic),
            loops: Infinity
          });

          return am5.Bullet.new(root, {
            locationX:undefined,
            sprite: container
          })

        }
      })

    })

  }

//##################################################################

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

//##################################################################

  getWidget(): void {
    this.widget = this.dashboardService.widgetUtils.getById(this.widgetId);
  }

//##################################################################

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
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
