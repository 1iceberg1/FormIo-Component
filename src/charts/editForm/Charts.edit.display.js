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
    type: 'textfield',
    key: 'title',
    label: 'Chart Title',
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
    type: 'select',
    input: true,
    key: 'refreshOnChange',
    label: 'Refresh On Change',
    dataSrc: 'boolean',
    weight: 2,
  },
  {
    type: 'datagrid',
    input: true,
    key: 'refreshOnFields',
    label: 'Refresh On Field Change',
    weight: 2,
    components: [
      {
        type: 'select',
        input: true,
        label: 'Field',
        key: 'field',
        dataSrc: 'form',
        valueProperty: 'key',
        template: '<span>{{ item.label }}</span>',
        clearOnHide: false,
      }
    ]
  }
];