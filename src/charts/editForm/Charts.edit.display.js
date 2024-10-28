export default [
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
    type: 'checkbox',
    key: 'donut',
    label: 'Donut Style',
    input: true,
    conditional: {
      json: { "===": [{ var: 'data.chartType' }, 'pie'] }
    },
    weight: 1
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