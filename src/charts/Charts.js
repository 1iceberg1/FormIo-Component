import { Formio } from 'formiojs';
import * as echarts from 'echarts';
import chartsEditForm from './Charts.form.js';
import { debounce } from 'lodash';

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
      debug: true,
      dataUrl: '',
      jsonRawData: [], // JSON data source
      xAxisKey: '', // key of the json object that represents xAxis
      dynamicUpdate: true, // Enable dynamic update by default
      redrawDelay: 300,
      redrawOn: [], // Fields that trigger a redraw when changed
      options: {},
      events: [],
      showChartTitle: false,
      stacked: false,
      donut: false,
      innerRadius: '40%',
      outerRadius: '70%',
      tooltipValueFormatter: '', // Custom JavaScript code for tooltip formatting
      labelFormatter: '',
      labelTextStyle: '',
      chartOptions: '',
      seriesOptions: '',
      centerContent: 'Center Content Here',
      centerFontSize: '16px',
      centerFontColor: '#333333',
      centerFontFamily: 'Arial, sans-serif',
      centerFontWeight: 'normal',
      centerBackgroundColor: '#ffffff',
      title: 'Charts',
      titleFontSize: '16px',
      titleFontColor: '#333333',
      titleFontFamily: 'Arial, sans-serif',
      titleFontWeight: 'normal',
      showGrid: false,
      gridColor: '#E0E0E0',
      showLegend: false,
      legendPosition: 'top',
      legendFontSize: 12,
      legendFontColor: '#000',

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
    this.debounceInterval = null; // Store the interval ID
  }

  render(content) {
    // Set the width and height from the component settings
    const width = this.component.width || '100%';
    const aspectRatio = this.component.aspectRatio || 1;

    return super.render(`
      <div ref="chartContainer" style="width: ${width}; aspect-ratio: ${aspectRatio}; position: relative;"></div>
    `);
  }

  redraw() {
    // Ensure chartContainer is available and component is visible before attempting to redraw
    if (!this.chartContainer || !this.visible) {
      return;
    }

    const debouncedUpdate = () => {
      // Clear the existing interval if it's already set
      if (this.debounceInterval) {
        clearInterval(this.debounceInterval);
      }

      // Set a new interval to wait for changes
      this.debounceInterval = setInterval(() => {
        clearInterval(this.debounceInterval); // Clear the interval after execution
        this.debounceInterval = null; // Reset the interval ID
        this.updateChartWithDataSource(); // Perform the chart update
      }, this.component.redrawDelay || 300);
    };

    this.debouncedUpdate();
  }


  attach(element) {
    // Load the DOM references
    this.loadRefs(element, {
      chartContainer: 'single'
    });

    super.attach(element);

    this.chartContainer = this.refs.chartContainer;

    // Initial visibility check
    if (!this.visible) {
      // If the component is not visible, ensure the chartContainer is hidden
      if (this.chartContainer) {
        this.chartContainer.style.display = 'none';
      }
    } else {
      // If the component is visible, make sure to initialize the chart
      this.initializeChartContainer();
    }

    // Add an event listener to handle visibility updates
    this.root.on('change', () => {
      const isVisible = this.checkConditions(); // Check if conditions are met
      if (isVisible) {
        // If the component becomes visible
        this.showChartContainer();
      } else {
        // If the component should be hidden
        this.hideChartContainer();
      }
    });

    return element;
  }

  // Method to initialize and show the chart container
  initializeChartContainer() {
    if (!this.chartContainer) {
      // Create the chartContainer div if it doesn't exist
      this.chartContainer = document.createElement('div');
      this.chartContainer.style.width = this.component.width || '100%';
      this.chartContainer.style.height = this.component.height || '300px';
      this.chartContainer.style.aspectRatio = this.component.aspectRatio || 1;
      this.chartContainer.style.position = 'relative';
      this.element.appendChild(this.chartContainer);
    }

    // Make sure the chart container is visible
    this.chartContainer.style.display = 'block';
    this.initChart(); // Initialize the chart

    this.addCenterContent();

    // console.log("REDRAW ON", this.component.redrawOn);
    if (this.component.redrawOn && Array.isArray(this.component.redrawOn)) {
      this.setupDynamicFieldListeners(this.component.redrawOn);
    } else if (this.component.dynamicUpdate && this.component.dataSource) {
      this.setupDataGridListener(this.component.dataSource);
    }

  }

  // Method to hide the chart container
  hideChartContainer() {
    if (this.chartContainer) {
      this.chartContainer.style.display = 'none';
    }
  }

  // Method to show the chart container and update the chart
  showChartContainer() {
    if (!this.chartContainer) {
      // If the chart container doesn't exist, initialize it
      this.initializeChartContainer();
    } else {
      // If it exists, just make it visible
      this.chartContainer.style.display = 'block';
      // this.updateChartWithDataSource(); // Update the chart with data
    }
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

    const t = (text) => {
      if (this.root && this.root.language) {
        return this.root.i18next ? this.root.i18next.t(text) : text;
      }
      return text;
    }

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

    // console.log("T result", t('Monthly Payment'));
  }

  async fetchDataFromUrl(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
      const data = await response.json();
      return data;
    } catch (error) {
      // console.error("Failed to fetch data from URL:", error);
      return [];
    }
  }

  async updateChartWithDataSource() {
    // console.log("updateChartWithDataSource called!");
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

    // console.log("DATA", data);

    // Retrieve data from the specified DataGrid component, or fallback to this.component.datasets
    const sourceComponent = this.root.components.find(c => c.component.key === dataSource);
    const utils = Formio.Utils;
    const datasets = (sourceComponent ? sourceComponent.dataValue : this.component.datasets || []).map(row => {
      // console.log("Data Value", this.evaluateExpression(row.value, data));
      // console.log("Data Color", this.evaluateExpression(row.color, data) || '#000000');
      return {
        label: this.evaluateExpression(row.label, { data, utils }),
        value: (chartType === 'line' || (chartType === 'bar' && stacked)) ? row.value : parseFloat(this.evaluateExpression(row.value, { data, utils })) || 0,
        color: this.evaluateExpression(row.color, { data, utils }) || '#000000' // Default color if missing
      }
    });

    // console.log("DataSets", datasets);

    // Generate chart options based on the data and update the chart
    const options = await this.generateChartOptions(chartType, datasets);
    this.chart.setOption(options, true); // `true` allows for dynamic updating

    // Update center content dynamically based on data changes
    const centerContentElement = this.chartContainer.querySelector('.center-content');
    if (centerContentElement) {
      this.updateCenterContent(centerContentElement);
    }
  }

  convertString2Json(jsonRawData) {
    const jsonString = jsonRawData;
    const cleanedString = jsonString.replace(/[\n\t]/g, '').replace(/\s+/g, ' ').trim();
    const formattedString = cleanedString.replace(/(\w+):/g, '"$1":').replace(/'/g, '"').trim().replace(/,\s*]$/, ']');
    try {
      const result = JSON.parse(formattedString);
      // console.log("JSON RESULT", result);
      return result;
    } catch (error) {
    }
    return {};
  }

  async generateChartOptions(type, datasets) {
    let jsonData = [];
    const { xAxisKey, jsonRawData, stacked, donut, dataUrl, darkMode, tooltipValueFormatter, labelFormatter, labelTextStyle, showLegend, chartOptions, seriesOptions, debug } = this.component;
    const utils = Formio.Utils;
    let xAxisData = [];
    let sOptions;

    if (type === 'line' || (type === 'bar' && stacked)) {
      try {
        // Parse JSON data from `jsonRawData` if available
        if (dataUrl) {
          jsonData = await this.fetchDataFromUrl(dataUrl);
        } else if (Array.isArray(jsonRawData)) {
          jsonData = jsonRawData;
        } else if (typeof jsonRawData === 'string') {
          jsonData = this.convertString2Json(jsonRawData);
        }

        if ((!xAxisKey || !jsonData || !Array.isArray(jsonData) || jsonData.length === 0)) {
          console.warn('No JSON data provided.');
          return {};
        }
        // console.log("JSON KEYS", Object.keys(jsonData));
        xAxisData = jsonData.map((item) => item[xAxisKey] || '');
        // console.log("XAXIS DATA", xAxisData);
      } catch (error) {
        console.error("Invalid JSON format in jsonRawData:", error);
        return {};
      }
    }

    const baseOptions = {
      ...(this.component.showChartTitle && {
        title: {
          text: this.component.title || 'Chart',
          textStyle: {
            color: this.component.titleFontColor || '#000',
            fontSize: this.component.titleFontSize || 18,
            fontFamily: this.component.titleFontFamily || 'Arial, sans-serif',
            fontWeight: this.component.titleFontWeight || 'normal'
          }
        }
      }),
      backgroundColor: this.component.backgroundColor || '#FFFFFF',
      ...(showLegend && {
        legend: {
          data: datasets.map((dataset) => dataset.label),
          show: showLegend !== false,
          orient: 'horizontal',
          top: showLegend ? (this.component.legendPosition || 'top') : -9999,
          textStyle: {
            fontSize: this.component.legendFontSize || 12,
            color: this.component.legendFontColor || '#000'
          }
        }
      }),
      grid: {
        show: this.component.showGrid !== false,
        borderColor: this.component.gridColor || '#E0E0E0',
        top: 0,  // Adjust to reduce space at the top
        bottom: 0, // Adjust to reduce space at the bottom
        containLabel: true
      },
      ...(type !== 'pie' && {
        xAxis: {
          type: 'category',
          name: this.component.xAxisLabel || '',
          data: (type === 'line' || (type === 'bar' && stacked)) ? xAxisData : datasets.map((dataset) => dataset.label),
        },
        yAxis: {
          type: 'value',
          name: this.component.yAxisLabel || '',
        },
      }),
      tooltip: {
        trigger: type === 'pie' ? 'item' : 'axis',

        valueFormatter: (value) => {
          // Use the evaluateExpression to evaluate the provided expression dynamically
          const context = { value, utils };
          const formattedValue = this.evaluateExpression(tooltipValueFormatter, context);
          return formattedValue;
        },
        ...((type === 'line' || (type === 'bar' && stacked)) ? {
          formatter: (params) => {
            let tooltip = `${params[0].name}<br/>`;
            params.forEach((item) => {
              const value = item.value;
              const context = { value, utils };
              const formattedValue = this.evaluateExpression(tooltipValueFormatter, context);
              tooltip += `${item.marker} ${item.seriesName}: ${formattedValue}<br/>`;
            });
            return tooltip;
          },
        } : {
          formatter: (params) => {
            const value = params.value;
            const percent = params.percent;
            const context = { value, percent, utils };
            const formattedValue = this.evaluateExpression(tooltipValueFormatter, context);
            return `${params.marker} ${params.name}: ${formattedValue}`;
          },
        })
      },
      series: [],
    };

    if (chartOptions && typeof chartOptions === 'string') {
      const cOptions = this.convertString2Json(chartOptions);
      for (const key in cOptions) {
        if (cOptions.hasOwnProperty(key)) {
          // If the key does not already exist in baseOptions, add it
          if (!baseOptions.hasOwnProperty(key)) {
            baseOptions[key] = cOptions[key];
          }
        }
      }
    }

    if (seriesOptions && typeof seriesOptions === 'string') {
      sOptions = this.convertString2Json(seriesOptions);
    }

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
          },
          ...sOptions
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
                if (labelFormatter) {
                  // Process the custom labelFormatter expression
                  const processedFormatter = this.evaluateExpression(
                    labelFormatter,
                    { params }
                  );

                  // Replace placeholders with corresponding values from params
                  try {
                    return processedFormatter
                      .replace(/{d}/g, params.percent)   // Replace {d} with percentage
                      .replace(/{c}/g, params.value)     // Replace {c} with value
                      .replace(/{b}/g, params.name)      // Replace {b} with name
                      .replace(/{a}/g, params.seriesName) // Replace {a} with series name
                      .replace(/{e}/g, params.marker);   // Replace {e} with marker or other custom property
                  } catch (error) {
                    return '';
                  }
                }

                // Default behavior: hide label if the value is 0 or less
                return '';
              },
              ...(labelTextStyle && typeof labelTextStyle === 'string' &&
                this.convertString2Json(labelTextStyle) || {
                fontSize: 14,
                color: '#FFFFFF'
              }
              ),
            },
            ...sOptions
          },
        ];
        if (donut) {
          baseOptions.series.push({
            type: 'pie',
            radius: ['0%', this.component.innerRadius || '40%'], // Adjusts to match the inner radius of the donut
            data: [{ value: 100, itemStyle: { color: this.component.centerBackgroundColor || '#ffffff' } }], // This fills the hole
            label: {
              show: false // Hide the label for the inner part
            },
            silent: true // Prevents interactions on this series
          });
        }
        break;

      case 'bar':
      default:
        // console.log("JSON DATA!!!", jsonData);
        // console.log("Data Sets!!!", datasets);
        // console.log("SERIES!!!", datasets.map(dataset => ({
        //   name: dataset.label,
        //   type: 'bar',
        //   stack: 'total',
        //   data: jsonData.filter(item => item[dataset.value]).map((item) => item[dataset.value]),
        //   itemStyle: {
        //     color: dataset.color || '#000000' // Default to black if color is missing
        //   }
        // })));
        baseOptions.series = stacked ? datasets.map(dataset => ({
          name: dataset.label,
          type: 'bar',
          stack: 'total',
          data: jsonData.filter(item => item[dataset.value]).map((item) => item[dataset.value]),
          itemStyle: {
            color: dataset.color || '#000000' // Default to black if color is missing
          },
          ...sOptions
        })) : [{
          name: datasets.map(dataset => dataset.label),
          type: 'bar',
          data: datasets.map(dataset => ({
            value: dataset.value,
            itemStyle: { color: dataset.color || '#000000' } // Default to black if color is missing
          })),
          ...sOptions
        }];
        break;
    }

    // Log options if debug is enabled
    if (debug) {
      console.log('DEBUG: ECharts options:', baseOptions);
    }

    return baseOptions;
  }

  setupDynamicFieldListeners(fieldKeys) {
    // const onFormChange = () => {
    //   this.updateChartWithDataSource();
    // };

    const { redrawDelay } = this.component;
    const delay = redrawDelay ?? 300;

    const debouncedUpdateChart = debounce(() => {
      this.updateChartWithDataSource();
    }, delay);

    if (fieldKeys.includes('data')) {
      this.root.on('change', () => {
        debouncedUpdateChart();
      })
      return;
    }

    fieldKeys.forEach((fieldKey) => {
      if (this.root.getComponent(fieldKey)) this.root.getComponent(fieldKey).on('change', (event) => {
        if (event.changed?.component?.key && fieldKeys.includes(event.changed.component.key)) {
          // onFormChange();
          debouncedUpdateChart();
        }
      });
    });
  }

  debouncedUpdate = () => {
    // Clear the existing interval if it's already set
    if (this.debounceInterval) {
      clearInterval(this.debounceInterval);
    }

    // Set a new interval to wait for changes
    this.debounceInterval = setInterval(() => {
      clearInterval(this.debounceInterval); // Clear the interval after execution
      this.debounceInterval = null; // Reset the interval ID
      this.updateChartWithDataSource(); // Perform the chart update
    }, this.component.redrawDelay || 300);
  };

  setupDataGridListener(dataSourceKey) {
    // console.log("Listener", dataSourceKey);
    // console.log("root components", this.root.components);
    const sourceComponent = this.root.components.find(c => c.component.key === dataSourceKey);

    if (!sourceComponent) {
      console.error(`DataGrid with key "${dataSourceKey}" not found.`);
      return;
    }

    sourceComponent.on('change', () => {
      this.debouncedUpdate();
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
