import { Formio } from 'formiojs';
import * as echarts from 'echarts';
import chartsEditForm from './Charts.form.js';

const Field = Formio.Components.components.field;

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
      refreshOnChange: false, // Enable Refresh On Change option
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
    return super.render(`
      <div ref="chartContainer" style="width: 100%; height: 100%; min-height: 300px; position: relative;"></div>
    `);
  }

  attach(element) {
    this.loadRefs(element, {
      chartContainer: 'single'
    });
    super.attach(element);
    this.chartContainer = this.refs.chartContainer;

    if (this.chartContainer) {
      this.chartContainer.style.width = '100%';
      this.chartContainer.style.height = '300px';
      this.initChart();
    } else {
      console.error("Chart container not found. Cannot initialize chart.");
    }

    // Add center content if donut pie chart
    this.addCenterContent();

    console.log("ATTACH", this.component.dataSource);

    // Set up dynamic updating if enabled
    if (this.component.refreshOnChange && this.component.refreshOnFields.length) {
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
      centerContent.innerHTML = this.component.centerContent || 'Center Content Here';
      centerContent.style.position = 'absolute';
      centerContent.style.top = '50%';
      centerContent.style.left = '50%';
      centerContent.style.transform = 'translate(-50%, -50%)';
      centerContent.style.fontSize = this.component.centerFontSize || '16px';
      centerContent.style.color = this.component.centerFontColor || '#333';
      centerContent.style.fontFamily = this.component.centerFontFamily || 'Arial, sans-serif';
      centerContent.style.fontWeight = this.component.centerFontWeight || 'normal';
      this.chartContainer.appendChild(centerContent);
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

    // Retrieve data from the specified DataGrid component
    const sourceComponent = this.root.components.find(c => c.component.key === dataSource);
    const datasets = sourceComponent ? sourceComponent.dataValue.filter(row => (row.label && row.value && row.color)).map(row => ({
      label: row.label,
      value: row.value,
      color: row.color
    })) : this.component.datasets;

    console.log("DataSets", datasets);

    // Generate chart options based on the data and update the chart
    const chartOptions = this.generateChartOptions(chartType, datasets);
    this.chart.setOption(chartOptions);
  }


  generateChartOptions(type, datasets) {
    const baseOptions = {
      title: {
        text: this.translate(this.component.title || 'Chart')
      },
      backgroundColor: this.component.backgroundColor || '#FFFFFF',
      legend: {
        data: datasets.map((dataset) => this.translate(dataset.label)),
      },
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
          itemStyle: { color: (params) => datasets[params.dataIndex].color }
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
              itemStyle: { color: dataset.color }
            })),
            label: {
              formatter: '{b} : {c} ({d}%)'
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
            itemStyle: { color: dataset.color }
          }))
        }];
        break;
    }

    return baseOptions;
  }

  setupDynamicFieldListeners(fieldKeys) {
    const onFormChange = () => {
      this.updateChartWithDataSource();
    };

    fieldKeys.forEach((fieldKey) => {
      this.root.on(`change`, (changed) => {
        if (changed.changed && changed.changed.component && changed.changed.component.key === fieldKey) {
          onFormChange();
        }
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
