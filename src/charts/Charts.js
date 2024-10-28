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
      chartType: 'bar', // default chart type
      datasets: [], // datasets configuration
      dynamicUpdate: false,
      refreshOnFields: [],
      options: {},
      events: [],
      donut: true, // Enable donut by default, for demonstration
      innerRadius: '40%',
      outerRadius: '70%',
      centerContent: 'Center Content Here', // Default text
      centerFontSize: '16px',
      centerFontColor: '#333333',
      centerFontFamily: 'Arial, sans-serif',
      centerFontWeight: 'normal',
      title: 'Charts',
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
      <div ref="chartContainer" style="width: 100%; height: 300px; min-height: 300px;"></div>
    `);
  }

  attach(element) {
    console.log("Attach Function called!");

    this.loadRefs(element, {
      chartContainer: 'single'
    });
    super.attach(element);
    this.chartContainer = this.refs.chartContainer;

    // Remove any previous center content overlay if it exists
    const existingCenterContent = this.chartContainer.querySelector('.center-content');
    if (existingCenterContent) {
      this.chartContainer.removeChild(existingCenterContent);
    }

    console.log("Chart Type", this.component.chartType);
    console.log("Donut Checked", this.component.donut);

    // Add an overlay div for center content only for donut pie chart
    if (this.component.chartType === 'pie' && this.component.donut) {
      console.log("Hooray!!");
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

    // Initialize the chart with ECharts
    this.initChart();

    // Set up dynamic updating based on form field changes
    if (this.component.dynamicUpdate && this.component.refreshOnFields.length) {
      this.setupDynamicUpdates();
    }

    return element;
  }

  initChart() {
    if (!this.chartContainer) return;

    const { chartType, options, datasets } = this.component;
    this.chart = echarts.init(this.chartContainer);

    // Generate and set the chart options
    const chartOptions = this.generateChartOptions(chartType, datasets, options);
    this.chart.setOption(chartOptions);
  }

  // generateChartOptions(type, datasets) {
  //   const baseOptions = {
  //     title: {
  //       text: this.component.options.title || 'Chart'
  //     },
  //     tooltip: { trigger: type === 'pie' ? 'item' : 'axis' }, // Use 'item' trigger for pie chart
  //     series: []
  //   };

  //   // Conditionally add xAxis and yAxis only for bar and line charts
  //   if (type !== 'pie') {
  //     baseOptions.xAxis = {
  //       type: 'category',
  //       data: datasets.map((d) => d.label) // Set x-axis labels only for non-pie charts
  //     };
  //     baseOptions.yAxis = { type: 'value' };
  //   }

  //   // Configure series based on chart type
  //   switch (type) {
  //     case 'line':
  //       baseOptions.series = [{
  //         name: 'Line Series',
  //         type: 'line',
  //         data: datasets.map(dataset => dataset.value),
  //         itemStyle: { color: (params) => datasets[params.dataIndex].color }
  //       }];
  //       break;

  //     case 'pie':
  //       baseOptions.series = [
  //         {
  //           type: 'pie',
  //           radius: this.component.options.donut ? ['40%', '70%'] : '50%',
  //           data: datasets.map((dataset) => ({
  //             value: dataset.value,
  //             name: dataset.label,
  //             itemStyle: { color: dataset.color }
  //           })),
  //           label: {
  //             formatter: '{b} : {c} ({d}%)'
  //           }
  //         }
  //       ];
  //       break;

  //     case 'bar':
  //     default:
  //       baseOptions.series = [
  //         {
  //           name: 'Bar Series',
  //           type: 'bar',
  //           data: datasets.map(dataset => ({
  //             value: dataset.value,
  //             itemStyle: { color: dataset.color }
  //           }))
  //         }
  //       ];
  //       break;
  //   }

  //   return baseOptions;
  // }

  generateChartOptions(type, datasets) {
    const baseOptions = {
      title: {
        text: this.component.title || 'Chart'
      },
      tooltip: { trigger: type === 'pie' ? 'item' : 'axis' },
      series: []
    };

    // Conditionally add xAxis and yAxis only for bar and line charts
    if (type !== 'pie') {
      baseOptions.xAxis = {
        type: 'category',
        data: datasets.map((d) => d.label)
      };
      baseOptions.yAxis = { type: 'value' };
    }

    // Configure series based on chart type
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
              : '50%', // Regular pie chart with no inner radius if not donut
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
        baseOptions.series = [
          {
            name: 'Bar Series',
            type: 'bar',
            data: datasets.map(dataset => ({
              value: dataset.value,
              itemStyle: { color: dataset.color }
            }))
          }
        ];
        break;
    }

    return baseOptions;
  }


  setupDynamicUpdates() {
    const { refreshOnFields } = this.component;
    const onFormChange = () => {
      const chartOptions = this.generateChartOptions(
        this.component.chartType,
        this.component.datasets
      );
      this.chart.setOption(chartOptions, { notMerge: true });
    };

    refreshOnFields.forEach((fieldKey) => {
      this.onChangeListener(fieldKey, onFormChange);
    });
  }

  onChangeListener(fieldKey, callback) {
    this.root.on(`change`, (changed) => {
      if (changed.changed && changed.changed.component && changed.changed.component.key === fieldKey) {
        callback();
      }
    });
  }

  // Handles custom events on ECharts
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