import { Formio } from 'formiojs';
import * as echarts from 'echarts';
import chartsEditForm from './Charts.form.js';

const Field = Formio.Components.components.field;

const t = Formio.i18next ? Formio.i18next.t.bind(Formio.i18next) : (key) => key;

export default class Charts extends Field {
  static editForm = chartsEditForm;

  static schema(...extend) {
    return Field.schema({
      type: 'charts',
      label: 'Charts',
      key: 'charts',
      chartType: 'bar',
      dataSource: '', // Key of DataGrid component to use as data source
      datasets: [], // datasets configuration
      jsonRawData: [], // JSON data source
      xAxisKey: '', // key of the json object that represents xAxis
      dynamicUpdate: true, // Enable dynamic update by default
      refreshOnChange: true, // Enable Refresh On Change option
      refreshOnFields: [], // Fields to refresh on change
      options: {},
      events: [],
      stacked: false,
      donut: false,
      innerRadius: '40%',
      outerRadius: '70%',
      centerContent: 'Center Content Here',
      centerFontSize: '16px',
      centerFontColor: '#333333',
      centerFontFamily: 'Arial, sans-serif',
      centerFontWeight: 'normal',
      title: 'Charts',
      backgroundColor: '#FFFFFF',
      xAxisLabel: 'X Axis',
      yAxisLabel: 'Y Axis',
      width: '100%',
      height: '300px',
      aspectRatio: '1',
      ...extend
    });
  }

  static get builderInfo() {
    return {
      title: 'Charts',
      icon: 'bar-chart',
      group: 'basic',
      documentation: '',
      weight: 10,
      schema: Charts.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.chart = null;
    this.chartContainer = null;
  }

  render(content) {
    // Set the width and height from the component settings
    const width = this.component.width || '100%';
    const aspectRatio = this.component.aspectRatio || 1;

    return super.render(`
      <div ref="chartContainer" style="width: ${width}; aspect-ratio: ${aspectRatio}; position: relative;"></div>
    `);
  }

  attach(element) {
    this.loadRefs(element, {
      chartContainer: 'single'
    });
    super.attach(element);
    this.chartContainer = this.refs.chartContainer;

    if (this.chartContainer) {
      this.chartContainer.style.width = this.component.width || '100%';

      // Use aspect-ratio if specified, else fallback to height
      if (!this.component.height) {
        this.chartContainer.style.aspectRatio = `${this.component.aspectRatio}`;
      } else {
        this.chartContainer.style.height = this.component.height;
      }
      this.initChart();
    } else {
      console.error("Chart container not found. Cannot initialize chart.");
    }

    this.addCenterContent();

    if (this.component.refreshOnChange && this.component.refreshOnFields.length) {
      this.setupDynamicFieldListeners(this.component.refreshOnFields);
    } else if (this.component.dynamicUpdate && this.component.dataSource) {
      this.setupDataGridListener(this.component.dataSource);
    }

    return element;
  }

  addCenterContent() {
    const existingCenterContent = this.chartContainer.querySelector('.center-content');
    if (existingCenterContent) {
      this.chartContainer.removeChild(existingCenterContent);
    }

    const { chartType, donut } = this.component;

    if (chartType === 'pie' && donut) {
      const centerContent = document.createElement('div');
      centerContent.className = 'center-content';
      centerContent.style.position = 'absolute';
      centerContent.style.top = '50%';
      centerContent.style.left = '50%';
      centerContent.style.transform = 'translate(-50%, -50%)';
      centerContent.style.fontSize = this.component.centerFontSize || '16px';
      centerContent.style.color = this.component.centerFontColor || '#333';
      centerContent.style.fontFamily = this.component.centerFontFamily || 'Arial, sans-serif';
      centerContent.style.fontWeight = this.component.centerFontWeight || 'normal';
      this.chartContainer.appendChild(centerContent);

      this.updateCenterContent(centerContent);
    }
  }

  updateCenterContent(centerContentElement) {
    const data = this.root.data || {};
    const utils = Formio.Utils;
    const centerContentTemplate = this.component.centerContent;
    const processedContent = this.evaluateExpression(centerContentTemplate, { data, utils });
    centerContentElement.innerHTML = processedContent;
  }

  evaluateExpression(expression, context = {}) {
    if (!expression) return expression;

    const extendedContext = {
      ...context,
      t,
    };

    try {
      return Formio.Utils.interpolate(expression, extendedContext);
    } catch (error) {
      console.warn(`Failed to evaluate expression: "${expression}"`, error);
      return '';
    }
  }

  initChart() {
    if (!this.chartContainer) return;

    const { chartType, options } = this.component;
    this.chart = echarts.init(this.chartContainer);

    this.updateChartWithDataSource();
    this.setupEvents();
  }

  translate(text) {
    return Formio.i18next ? Formio.i18next.t(text) : text;
  }

  updateChartWithDataSource() {
    console.log("updateChartWithDataSource called!");
    const { chartType, dataSource, stacked } = this.component;

    if (!this.chart) {
      console.warn("Chart is not initialized. Initializing now.");
      this.initChart();
    }

    if (!this.chart) {
      console.error("Failed to initialize chart.");
      return;
    }

    const data = this.root.data || {}; // Access the form's data object

    // Retrieve data from the specified DataGrid component, or fallback to this.component.datasets
    const sourceComponent = this.root.components.find(c => c.component.key === dataSource);
    const datasets = (sourceComponent ? sourceComponent.dataValue : this.component.datasets).map(row => ({
      label: this.evaluateExpression(row.label, data),
      value: (chartType === 'line' || (chartType === 'bar' && stacked)) ? row.value : parseFloat(this.evaluateExpression(row.value, data)) || 0,
      color: this.evaluateExpression(row.color, data) || '#000000' // Default color if missing
    }));

    console.log("DataSets", datasets);

    // Generate chart options based on the data and update the chart
    const chartOptions = this.generateChartOptions(chartType, datasets);
    this.chart.setOption(chartOptions, true); // `true` allows for dynamic updating

    // Update center content dynamically based on data changes
    const centerContentElement = this.chartContainer.querySelector('.center-content');
    if (centerContentElement) {
      this.updateCenterContent(centerContentElement);
    }
  }

  generateChartOptions(type, datasets) {
    let jsonData = [];
    const { xAxisKey, jsonRawData, stacked, donut } = this.component;
    let xAxisData = [];

    if (type === 'line' || (type === 'bar' && stacked)) {
      try {
        // Parse JSON data from `jsonRawData` if available
        if (Array.isArray(jsonRawData)) {
          jsonData = jsonRawData;
        } else {
          const jsonString = jsonRawData;
          const cleanedString = jsonString.replace(/[\n\t]/g, '').replace(/\s+/g, ' ').trim();
          const formattedString = cleanedString.replace(/(\w+):/g, '"$1":').replace(/'/g, '"').trim().replace(/,\s*]$/, ']');
          jsonData = JSON.parse(formattedString);
        }

        if ((!xAxisKey || !jsonData || jsonData.length === 0)) {
          console.warn('No JSON data provided.');
          return {};
        }
        console.log("JSON KEYS", Object.keys(jsonData));
        xAxisData = jsonData.map((item) => item[xAxisKey] || '');
        console.log("XAXIS DATA", xAxisData);
      } catch (error) {
        console.error("Invalid JSON format in jsonRawData:", error);
        return {};
      }
    }

    const baseOptions = {
      title: {
        text: this.translate(this.component.title || 'Chart')
      },
      backgroundColor: this.component.backgroundColor || '#FFFFFF',
      // legend: {
      //   data: datasets.map((dataset) => this.translate(dataset.label)),
      // },
      ...(type !== 'pie' && {
        xAxis: {
          type: 'category',
          name: this.translate(this.component.xAxisLabel || ''),
          data: (type === 'line' || (type === 'bar' && stacked)) ? xAxisData : datasets.map((dataset) => this.translate(dataset.label)),
        },
        yAxis: {
          type: 'value',
          name: this.translate(this.component.yAxisLabel || ''),
        },
      }),
      tooltip: {
        trigger: type === 'pie' ? 'item' : 'axis',
        ...((type === 'line' || (type === 'bar' && stacked)) && {
          formatter: (params) => {
            let tooltip = `${params[0].name}<br/>`;
            params.forEach((item) => {
              tooltip += `${item.marker} ${item.seriesName}: ${item.value.toLocaleString()}<br/>`;
            });
            return tooltip;
          },
        })
      },
      series: []
    };

    switch (type) {
      case 'line':
        baseOptions.series = datasets.map(dataset => ({
          name: dataset.label,
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: jsonData.filter(item => item[dataset.value]).map((item) => item[dataset.value]),
          itemStyle: {
            color: dataset.color || '#000000' // Default to black if color is missing
          }
        }));
        break;

      case 'pie':
        baseOptions.series = [
          {
            type: 'pie',
            radius: donut
              ? [this.component.innerRadius || '40%', this.component.outerRadius || '70%']
              : '50%',
            data: datasets.map((dataset) => ({
              value: dataset.value,
              name: dataset.label,
              itemStyle: { color: dataset.color || '#000000' } // Default to black if color is missing
            })),
            label: {
              // formatter: '{b} : {c} ({d}%)',
              show: true,                      // Enable the labels
              position: 'inside',              // Display labels inside the pie pieces
              // formatter: '{d}%',               // Display percentage with each piece
              formatter: (params) => {
                // Only show the label if the percentage is greater than 0
                return params.percent > 0 ? `${params.percent}%` : '';
              },
              fontSize: 14,                    // Adjust font size if needed
              color: '#FFFFFF'                 // Set font color to white for better visibility
            }
          }
        ];
        break;

      case 'bar':
      default:
        console.log("JSON DATA!!!", jsonData);
        console.log("Data Sets!!!", datasets);
        console.log("SERIES!!!", datasets.map(dataset => ({
          name: dataset.label,
          type: 'bar',
          stack: 'total',
          data: jsonData.filter(item => item[dataset.value]).map((item) => item[dataset.value]),
          itemStyle: {
            color: dataset.color || '#000000' // Default to black if color is missing
          }
        })));
        baseOptions.series = stacked ? datasets.map(dataset => ({
          name: dataset.label,
          type: 'bar',
          stack: 'total',
          data: jsonData.filter(item => item[dataset.value]).map((item) => item[dataset.value]),
          itemStyle: {
            color: dataset.color || '#000000' // Default to black if color is missing
          }
        })) : [{
          name: datasets.map(dataset => dataset.label),
          type: 'bar',
          data: datasets.map(dataset => ({
            value: dataset.value,
            itemStyle: { color: dataset.color || '#000000' } // Default to black if color is missing
          }))
        }];
        break;
    }

    return baseOptions;
  }


  // setupDynamicFieldListeners(fieldKeys) {
  //   const onFormChange = () => {
  //     this.updateChartWithDataSource();
  //   };

  //   console.log("FIELD KEYS", fieldKeys);

  //   fieldKeys.forEach((fieldKey) => {
  //     this.root.on(`change`, (changed) => {
  //       console.log("CHANGED", changed);
  //       console.log("FIELD KEY", fieldKey);
  //       if (changed.changed && changed.changed.component && changed.changed.component.key === fieldKey.field) {
  //         onFormChange();
  //       }
  //     });
  //   });
  // }

  setupDynamicFieldListeners(fieldKeys) {
    const onFormChange = () => {
      this.updateChartWithDataSource();
    };

    fieldKeys.forEach((fieldKey) => {
      if (this.root.getComponent(fieldKey.field)) this.root.getComponent(fieldKey.field).on('change', () => {
        onFormChange();
      });
    });
  }

  setupDataGridListener(dataSourceKey) {
    console.log("Listener", dataSourceKey);
    console.log("root components", this.root.components);
    const sourceComponent = this.root.components.find(c => c.component.key === dataSourceKey);

    if (!sourceComponent) {
      console.error(`DataGrid with key "${dataSourceKey}" not found.`);
      return;
    }

    sourceComponent.on('change', () => {
      this.updateChartWithDataSource();
    });
  }

  setupEvents() {
    if (!this.chart) return;

    this.component.events?.forEach(({ eventId, eventScript }) => {
      this.chart.on(eventId, (event) => {
        const { chart, root: formio, component, data, submission, utils } = this;
        const func = new Function('event', 'chart', 'formio', 'data', 'component', 'submission', 'utils', eventScript);
        func.call(this, event, chart, formio, data, component, submission, Formio.Utils);
      });
    });
  }

  detach() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
    return super.detach();
  }
}

// Register the Charts component in Formio
Formio.Components.addComponent('charts', Charts);
