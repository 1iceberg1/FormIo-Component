export default [
  {
    type: 'textfield',
    key: 'width',
    label: 'Width',
    weight: 0,
    input: true,
    defaultValue: '100%',
  },
  {
    type: 'textfield',
    key: 'height',
    label: 'Height',
    weight: 0,
    input: true,
    defaultValue: '300px',
  },
  {
    type: 'textfield',
    key: 'aspectRatio',
    label: 'Aspect Ratio',
    weight: 0,
    input: true,
    defaultValue: '1',
  },
  {
    type: 'textfield',
    key: 'aspectRatio',
    label: 'Aspect Ratio',
    weight: 0,
    input: true,
    defaultValue: '1',
  },
  {
    type: 'textfield',
    key: 'xAxisLabel',
    label: 'X-Axis Label',
    weight: 1,
    input: true,
    conditional: { json: { "!==": [{ var: 'data.chartType' }, 'pie'] } }
  },
  {
    type: 'textfield',
    key: 'yAxisLabel',
    label: 'Y-Axis Label',
    weight: 1,
    input: true,
    conditional: { json: { "!==": [{ var: 'data.chartType' }, 'pie'] } }
  },
  {
    type: 'textfield',
    key: 'innerRadius',
    label: 'Inner Radius (e.g., 40%)',
    input: true,
    defaultValue: '40%',
    conditional: {
      json: {
        and: [
          { "===": [{ var: 'data.chartType' }, 'pie'] },
          { "===": [{ var: 'data.donut' }, true] }
        ]
      }
    },
    weight: 2
  },
  {
    type: 'textfield',
    key: 'tooltipValueFormatter',
    label: 'Tooltip Value Formatter',
    input: true,
    defaultValue: '',
    weight: 2
  },
  {
    type: 'textfield',
    key: 'labelFormatter',
    label: 'Label Formatter',
    input: true,
    defaultValue: '',
    weight: 2,
    conditional: { json: { "===": [{ var: 'data.chartType' }, 'pie'] } }
  },
  {
    type: 'textarea',
    key: 'labelTextStyle',
    label: "Label Text Style",
    input: true,
    defaultValue: '',
    weight: 2,
    placeholder: `Enter JSON data here e.g., { fontSize: 14, color: '#FFFFFF' }`,
    conditional: { json: { "===": [{ var: 'data.chartType' }, 'pie'] } }
  },
  {
    type: 'textfield',
    key: 'outerRadius',
    label: 'Outer Radius (e.g., 70%)',
    input: true,
    defaultValue: '70%',
    conditional: {
      json: {
        and: [
          { "===": [{ var: 'data.chartType' }, 'pie'] },
          { "===": [{ var: 'data.donut' }, true] }
        ]
      }
    },
    weight: 2
  },
  {
    type: 'colorpicker',
    key: 'centerBackgroundColor',
    label: 'Center Background Color',
    input: true,
    defaultValue: '#FFFFFF',
    conditional: {
      json: {
        and: [
          { "===": [{ var: 'data.chartType' }, 'pie'] },
          { "===": [{ var: 'data.donut' }, true] }
        ]
      }
    },
    weight: 2
  },
  {
    type: 'textfield',
    key: 'centerContent',
    label: 'Center Content',
    input: true,
    defaultValue: 'Center Content Here',
    conditional: {
      json: {
        and: [
          { "===": [{ var: 'data.chartType' }, 'pie'] },
          { "===": [{ var: 'data.donut' }, true] }
        ]
      }
    },
    weight: 2
  },
  {
    type: 'textfield',
    key: 'centerFontSize',
    label: 'Center Font Size',
    input: true,
    defaultValue: '16px',
    conditional: {
      json: {
        and: [
          { "===": [{ var: 'data.chartType' }, 'pie'] },
          { "===": [{ var: 'data.donut' }, true] }
        ]
      }
    },
    weight: 2
  },
  {
    type: 'colorpicker',
    key: 'centerFontColor',
    label: 'Center Font Color',
    input: true,
    defaultValue: '#333333',
    conditional: {
      json: {
        and: [
          { "===": [{ var: 'data.chartType' }, 'pie'] },
          { "===": [{ var: 'data.donut' }, true] }
        ]
      }
    },
    weight: 2
  },
  {
    type: 'textfield',
    key: 'centerFontFamily',
    label: 'Center Font Family',
    input: true,
    defaultValue: 'Arial, sans-serif',
    conditional: {
      json: {
        and: [
          { "===": [{ var: 'data.chartType' }, 'pie'] },
          { "===": [{ var: 'data.donut' }, true] }
        ]
      }
    },
    weight: 2
  },
  {
    type: 'textfield',
    key: 'centerFontWeight',
    label: 'Center Font Weight',
    input: true,
    defaultValue: 'normal',
    conditional: {
      json: {
        and: [
          { "===": [{ var: 'data.chartType' }, 'pie'] },
          { "===": [{ var: 'data.donut' }, true] }
        ]
      }
    },
    weight: 2
  }
];