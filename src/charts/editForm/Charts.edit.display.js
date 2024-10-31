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
    type: 'checkbox',
    key: 'stacked',
    label: 'Stacked Bar Chart',
    input: true,
    conditional: {
      json: { "===": [{ var: 'data.chartType' }, 'bar'] }
    },
    weight: 1
  },
  {
    type: 'checkbox',
    input: true,
    key: 'refreshOnChange',
    label: 'Refresh On Change',
    dataSrc: 'boolean',
    weight: 20,
  },
  {
    type: 'datagrid',
    input: true,
    key: 'refreshOnFields',
    label: 'Refresh On Field Change',
    weight: 25,
    conditional: {
      json: { "===": [{ var: 'data.refreshOnChange' }, true] }
    },
    components: [
      {
        type: 'select',
        input: true,
        label: 'Field',
        key: 'field',
        dataSrc: 'custom',
        valueProperty: 'key',
        template: '<span>{{ item.label || item.key }}</span>',
        clearOnHide: false,
        data: {
          custom: function (context) {
            console.log("CONTEXTTTTTTTT", context);
            const fields = context.instance.options.editForm.components.map(component => component.key);
            return fields;
          }
        }
      }
    ]
  }
];