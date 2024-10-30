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
      dynamicUpdate: true, // Enable dynamic update by default
      refreshOnChange: true, // Enable Refresh On Change option
      refreshOnFields: [], // Fields to refresh on change
      options: {},
      events: [],
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
    const height = this.component.height || '300px';

    return super.render(`
      <div ref="chartContainer" style="width: ${width}; height: ${height}; min-height: 300px; position: relative;"></div>
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
      this.chartContainer.style.height = this.component.height || '300px';
      this.initChart();
    } else {
      console.error("Chart container not found. Cannot initialize chart.");
    }

    // Add center content if donut pie chart
    this.addCenterContent();

    console.log("ATTACH", this.component.dataSource);

    // Set up dynamic updating if enabled
    if (this.component.refreshOnChange && this.component.refreshOnFields.length) {
      console.log("REFRESH SETUP");
      this.setupDynamicFieldListeners(this.component.refreshOnFields);
    } else if (this.component.dynamicUpdate && this.component.dataSource) {
      // Fallback to basic data source update if no specific fields are selected
      this.setupDataGridListener(this.component.dataSource);
    }


    return element;
  }

  addCenterContent() {
    const existingCenterContent = this.chartContainer.querySelector('.center-content');
    if (existingCenterContent) {
      this.chartContainer.removeChild(existingCenterContent);
    }

    if (this.component.chartType === 'pie' && this.component.donut) {
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

      // Initial content setup
      this.updateCenterContent(centerContent);
    }
  }

  // Helper function to update the center content with dynamic data
  updateCenterContent(centerContentElement) {
    const data = this.root.data || {}; // Get the form data
    const utils = Formio.Utils; // Access utils for currency formatting, etc.
    const centerContentTemplate = this.component.centerContent;

    const processedContent = this.evaluateExpression(centerContentTemplate, { data, utils });
    centerContentElement.innerHTML = processedContent;
  }

  evaluateExpression(expression, context = {}) {
    if (!expression) return expression;

    const extendedContext = {
      ...context,
      t, // Include translation function
    };
  
    try {
      // Use Formio's interpolate function to evaluate the expression with context
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

    // Set the initial chart options
    this.updateChartWithDataSource();

    // Set up event handling
    this.setupEvents();
  }

  translate(text) {
    return Formio.i18next ? Formio.i18next.t(text) : text;
  }

  updateChartWithDataSource() {
    console.log("updateChartWithDataSource called!");
    const { chartType, dataSource } = this.component;

    // Check if the chart is initialized, if not, initialize it
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
      value: parseFloat(this.evaluateExpression(row.value, data)) || 0,
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
    const baseOptions = {
      title: {
        text: this.translate(this.component.title || 'Chart')
      },
      backgroundColor: this.component.backgroundColor || '#FFFFFF',
      // legend: {
      //   data: datasets.map((dataset) => this.translate(dataset.label)),
      // },
      xAxis: type !== 'pie' ? {
        type: 'category',
        name: this.translate(this.component.xAxisLabel || ''),
        data: datasets.map((dataset) => this.translate(dataset.label)),
      } : null,
      yAxis: type !== 'pie' ? {
        type: 'value',
        name: this.translate(this.component.yAxisLabel || ''),
      } : null,
      tooltip: { trigger: type === 'pie' ? 'item' : 'axis' },
      series: []
    };

    switch (type) {
      case 'line':
        baseOptions.series = [{
          name: 'Line Series',
          type: 'line',
          data: datasets.map(dataset => dataset.value),
          itemStyle: {
            color: (params) => datasets[params.dataIndex].color || '#000000' // Default to black if color is missing
          }
        }];
        break;

      case 'pie':
        baseOptions.series = [
          {
            type: 'pie',
            radius: this.component.donut
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
        baseOptions.series = [{
          name: 'Bar Series',
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

    console.log("FIELD KEYS", fieldKeys);

    // Loop through each field key and attach individual listeners
    fieldKeys.forEach((fieldKey) => {
      if (this.root.getComponent(fieldKey.field)) this.root.getComponent(fieldKey.field).on('change', () => {
        console.log("Field changed:", fieldKey.field);
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

    // Listen for changes in the DataGrid component's value
    sourceComponent.on('change', () => {
      this.updateChartWithDataSource();
    });
  }

  setupEvents() {
    if (!this.chart) return;

    this.component.events.forEach(({ eventId, eventScript }) => {
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
