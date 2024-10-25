(function (Formio, echarts) {
  if (!Formio || !echarts) {
    console.error("Formio.js and ECharts are required for the Charts component to work.");
    return;
  }

  console.log("Successfully loaded Formio ECharts Component");

  class ChartsComponent extends Formio.Components.components.field {
    static schema(...extend) {
      return Formio.Components.components.field.schema({
        type: 'charts',
        label: 'Charts',
        chartType: 'bar',
        datasets: [],
        chartOptions: {
          title: '',
          legend: true,
          xAxisLabel: '',
          yAxisLabel: '',
          dynamicUpdate: false,
          dynamicFields: [],
          donutOptions: {
            holeSize: '50%',
            centerContent: '',
            centerFontAttributes: { font: 'Arial', size: 12, bold: false }
          }
        },
        ...extend,
      });
    }

    static builderInfo = {
      title: 'Charts',
      group: 'basic',
      icon: 'chart-bar',
      documentation: '',
      weight: 100,
      schema: ChartsComponent.schema(),
    };

    render() {
      return super.render('<div ref="chartContainer" style="width: 100%; height: 300px;"></div>');
    }

    attach(element) {
      super.attach(element);

      // Clear any existing content
      element.innerHTML = '';

      // Create and append the chart container div
      const chartContainer = document.createElement('div');
      chartContainer.style.width = '100%';
      chartContainer.style.height = '300px';
      element.appendChild(chartContainer);

      // Initialize the chart after a small delay
      setTimeout(() => {
        this.initChart(chartContainer);
      }, 100);

      return element;
    }

    initChart(chartContainer) {
      this.chart = echarts.init(chartContainer, null, {
        renderer: this.component.renderer || 'canvas',
      });

      console.log("ECharts initialized");

      // Set initial options based on chart type
      const options = this.generateChartOptions(this.component.chartType || 'bar');
      this.chart.setOption(options);
    }

    generateChartOptions(type) {
      const chartOptions = this.component.chartOptions || {
        title: '',
        legend: true,
        xAxisLabel: '',
        yAxisLabel: '',
        donutOptions: {
          holeSize: '50%',
          centerContent: '',
          centerFontAttributes: { font: 'Arial', size: 12, bold: false }
        }
      };

      const baseOptions = {
        title: { text: chartOptions.title || '' },
        tooltip: {},
        legend: { show: chartOptions.legend },
        xAxis: { type: 'category', name: chartOptions.xAxisLabel, data: this.getDatasetLabels() },
        yAxis: { type: 'value', name: chartOptions.yAxisLabel },
        series: this.getSeriesData(type)
      };

      return baseOptions;
    }

    getDatasetLabels() {
      return this.component.datasets.map(dataset => dataset.label);
    }

    getSeriesData(type) {
      return this.component.datasets.map(dataset => ({
        name: dataset.label,
        type,
        data: [dataset.value],
        itemStyle: { color: dataset.color || '#3398DB' },
      }));
    }

    detach() {
      if (this.chart) {
        this.chart.dispose();
      }
      super.detach();
    }
  }

  Formio.Components.addComponent('charts', ChartsComponent);
})(window.Formio, window.echarts);
