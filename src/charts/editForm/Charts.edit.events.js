export default [
  {
    type: 'datagrid',
    input: true,
    key: 'events',
    label: 'Events',
    weight: 0,
    components: [
      {
        type: 'textfield',
        input: true,
        key: 'eventId',
        label: 'Event ID',
        placeholder: 'Enter ECharts event ID',
      },
      {
        type: 'textarea',
        input: true,
        key: 'eventScript',
        label: 'Event Script',
        placeholder: 'Enter JavaScript for the event',
      }
    ]
  }
];