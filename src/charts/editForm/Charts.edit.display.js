function getEndComponents(componentsArray) {
  let endComponents = [];

  componentsArray.forEach(component => {
    // Check if the component itself has a `key`
    if (component.key) {
      // Check if this component doesn't have any nested components arrays directly or within nested structures
      const hasNestedComponents = Object.keys(component).some(key => {
        if (Array.isArray(component[key])) {
          return component[key].some(nestedItem => nestedItem && nestedItem.components && nestedItem.components.length > 0);
        }
        return false;
      });

      // Add the component if it doesn't have nested components
      if (!hasNestedComponents && (!component.components || component.components.length === 0)) {
        endComponents.push(component);
      }
    }

    // If the component has a `components` key, recurse into it
    if (component.components && Array.isArray(component.components)) {
      endComponents = endComponents.concat(getEndComponents(component.components));
    }

    // Check if the component has nested arrays that could contain components (e.g., columns)
    Object.keys(component).forEach(key => {
      if (Array.isArray(component[key])) {
        component[key].forEach(nestedItem => {
          if (nestedItem && nestedItem.components && Array.isArray(nestedItem.components)) {
            endComponents = endComponents.concat(getEndComponents(nestedItem.components));
          }
        });
      }
    });
  });

  return endComponents;
}

export default [
  {
    type: 'checkbox',
    key: 'showChartTitle',
    label: 'Show Chart Title',
    weight: 0,
    input: true,
    defaultValue: '100%',
  },
  {
    type: 'select',
    key: 'chartType',
    label: 'Chart Type',
    input: true,
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Bar', value: 'bar' },
        { label: 'Line', value: 'line' },
        { label: 'Pie', value: 'pie' },
      ]
    },
    defaultValue: 'bar',
    weight: 0
  },
  {
    type: 'textfield',
    key: 'title',
    label: 'Chart Title',
    weight: 1,
    input: true
  },
  {
    type: 'textfield',
    key: 'titleFontSize',
    label: 'Title Font Size',
    weight: 1,
    input: true
  },
  {
    type: 'colorpicker',
    key: 'titleFontColor',
    label: 'Title Font Color',
    weight: 1,
    input: true
  },
  {
    type: 'textfield',
    key: 'titleFontFamily',
    label: 'Title Font Family',
    weight: 1,
    input: true
  },
  {
    type: 'checkbox',
    key: 'showGrid',
    label: 'Show Grid',
    weight: 1,
    input: true
  },
  {
    type: 'colorpicker',
    key: 'gridColor',
    label: 'Grid Color',
    weight: 1,
    input: true,
    conditional: { json: { "===": [{ var: 'data.showGrid' }, true] } }
  },
  {
    type: 'checkbox',
    key: 'showLegend',
    label: 'Show Legend',
    weight: 1,
    input: true
  },
  {
    type: 'textfield',
    key: 'legendPosition',
    label: 'Legend Position',
    weight: 1,
    input: true,
    conditional: {
      json: { "===": [{ var: 'data.showLegend' }, true] }
    },
  },
  {
    type: 'number',
    key: 'legendFontSize',
    label: 'Legend Font Size',
    weight: 1,
    input: true,
    conditional: {
      json: { "===": [{ var: 'data.showLegend' }, true] }
    },
  },
  {
    type: 'colorpicker',
    key: 'legendFontColor',
    label: 'Legend Font Color',
    weight: 1,
    input: true,
    conditional: {
      json: { "===": [{ var: 'data.showLegend' }, true] }
    },
  },
  {
    type: 'textfield',
    key: 'titleFontWeight',
    label: 'Title Font Weight',
    weight: 1,
    input: true
  },
  {
    type: 'colorpicker',
    key: 'backgroundColor',
    label: 'Background Color',
    weight: 1,
    input: true,
    inputType: 'color',
    defaultValue: '#FFFFFF'
  },
  {
    type: 'checkbox',
    key: 'donut',
    label: 'Donut Style',
    input: true,
    conditional: {
      json: { "===": [{ var: 'data.chartType' }, 'pie'] }
    },
    weight: 0
  },
  {
    type: 'checkbox',
    key: 'stacked',
    label: 'Stacked Bar Chart',
    input: true,
    conditional: {
      json: { "===": [{ var: 'data.chartType' }, 'bar'] }
    },
    weight: 0
  },
  {
    type: 'textarea',
    input: true,
    key: 'chartOptions',
    label: "Chart Options",
    defaultValue: "",
    weight: 20,
  },
  {
    type: 'textarea',
    input: true,
    key: 'seriesOptions',
    label: "Series Options",
    defaultValue: "",
    weight: 20,
  },
];