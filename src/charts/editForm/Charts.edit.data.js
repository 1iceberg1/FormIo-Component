export default [
  {
    type: 'datagrid',
    key: 'datasets',
    label: 'Datasets',
    addAnother: 'Add Dataset',
    components: [
      {
        type: 'textfield',
        key: 'label',
        label: 'Label',
        input: true
      },
      {
        type: 'number',
        key: 'value',
        label: 'Value',
        input: true
      },
      {
        type: 'colorpicker',
        key: 'color',
        label: 'Color',
        input: true,
        defaultValue: '#000000'
      }
    ],
    weight: 10
  },
]