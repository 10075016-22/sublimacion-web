// Puedes mover este tipo a otro archivo si prefieres mantenerlo separado.
export type GoogleChartType =
  | 'AreaChart'
  | 'Bar'
  | 'BarChart'
  | 'BubbleChart'
  | 'Calendar'
  | 'CandlestickChart'
  | 'ColumnChart'
  | 'ComboChart'
  | 'Gantt'
  | 'Gauge'
  | 'GeoChart'
  | 'Histogram'
  | 'Line'
  | 'LineChart'
  | 'Map'
  | 'OrgChart'
  | 'PieChart'
  | 'Sankey'
  | 'Scatter'
  | 'SteppedAreaChart'
  | 'Table'
  | 'Timeline'
  | 'TreeMap'
  | 'WaterfallChart'

// Interfaz principal para tu componente
export interface IModelChart {
  type: GoogleChartType;
  data: unknown[][] | Record<string, any> | null;
  options?: Record<string, any>;
  cols: number | undefined;
  permission: string;
}