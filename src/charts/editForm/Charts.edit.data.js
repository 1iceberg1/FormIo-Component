export default [
  // {
  //   type: 'select',
  //   key: 'dataSource',
  //   label: 'Data Source',
  //   input: true,
  //   dataSrc: 'custom',
  //   data: {
  //     custom: function (context) {
  //       // List all DataGrid components in the form for selection
  //       return context.instance.options.editForm.components
  //         .filter(component => component.type === 'datagrid')
  //         .map(component => component.key);
  //     }
  //   },
  //   weight: 0
  // },
  {
    type: 'textarea',
    input: true,
    key: 'jsonRawData',
    label: 'Raw JSON Data',
    placeholder: `Enter JSON data here (e.g., [{"date": "202201", "principal": 1000, "interest": 500, "balance": 1500}])`,
    rows: 10,
    // editor: 'json', // Use JSON editor for better formatting
    weight: 1,
    tooltip: 'Provide JSON data to populate the chart. This will override any data source.',
    conditional: {
      json: {
        or: [
          { "===": [{ var: 'data.chartType' }, 'line'] },
          {
            and: [
              { "===": [{ var: 'data.chartType' }, 'bar'] },
              { "===": [{ var: 'data.stacked' }, true] }
            ]
          },
        ]
      }
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'xAxisKey',
    label: 'X-Axis Key',
    conditional: {
      json: {
        or: [
          { "===": [{ var: 'data.chartType' }, 'line'] },
          {
            and: [
              { "===": [{ var: 'data.chartType' }, 'bar'] },
              { "===": [{ var: 'data.stacked' }, true] }
            ]
          },
        ]
      }
    },
    weight: 1,
  },
  {
    type: 'datagrid',
    input: true,
    key: 'datasets',
    label: 'Datasets',
    weight: 1,
    components: [
      {
        type: 'textfield',
        input: true,
        key: 'label',
        label: 'Label',
        placeholder: 'Enter dataset label',
      },
      {
        type: 'textfield',
        input: true,
        key: 'value',
        label: 'Value',
        placeholder: 'Enter dataset value',
      },
      {
        type: 'colorpicker',
        input: true,
        key: 'color',
        label: 'Color',
        widget: 'color',
        placeholder: 'Enter dataset color',
      }
    ]
  }
]