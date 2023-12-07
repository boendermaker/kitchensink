import { CompactType, DisplayGrid, GridType } from "angular-gridster2";
import { IDashboard, IDashboardConfig, IDashboardWidget } from "./dashboard.interface";

export class Dashboard implements IDashboard {

  id: string;
  label: string;
  config: IDashboardConfig;
  widgets: IDashboardWidget[];

  defaultConfig: IDashboardConfig = {
    setGridSize: true,
    gridType: GridType.ScrollVertical,
    compactType: CompactType.None,
    margin: 24,
    outerMargin: true,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    mobileBreakpoint: 640,
    useBodyForBreakpoint: false,
    minCols: 8,
    maxCols: 8,
    minRows: 4,
    maxRows: 100,
    maxItemCols: 100,
    minItemCols: 1,
    maxItemRows: 100,
    minItemRows: 1,
    maxItemArea: 2500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 105,
    fixedRowHeight: 105,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    enableOccupiedCellDrop: false,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    ignoreMarginInRow: false,
    draggable: {
      enabled: false
    },
    resizable: {
      enabled: false
    },
    swap: false,
    pushItems: true,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: { north: true, east: true, south: true, west: true },
    pushResizeItems: false,
    displayGrid: DisplayGrid.OnDragAndResize,
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false
  };

  constructor(label: string) {
    this.id = this.createUUID();
    this.label = label;
    this.config = this.defaultConfig;
    this.widgets = [];
  }

  toggleEditMode(): void {

    const override: Partial<IDashboardConfig> = {
      resizable: {
        enabled: !this.config.resizable.enabled
      },
      draggable: {
        enabled: !this.config.draggable.enabled
      }
    }

    this.config = {...this.config, ...override};

  }

  optionsChanged(): void {
    if (this.config.api && this.config.api.optionsChanged) {
      this.config.api.optionsChanged();
    }
  }

  private createUUID?(): string {
    return crypto.randomUUID();
  }

}
