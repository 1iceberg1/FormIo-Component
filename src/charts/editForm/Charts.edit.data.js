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