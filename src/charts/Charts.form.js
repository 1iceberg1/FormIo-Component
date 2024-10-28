import { Formio } from 'formiojs';
import ChartsEditDisplay from "./editForm/Charts.edit.display.js";
import ChartsEditData from "./editForm/Charts.edit.data.js"
import ChartsEditLayout from './editForm/Charts.edit.layout.js';
import ChartsEditEvents from './editForm/Charts.edit.events.js';

export default function (...extend) {
  return Formio.Components.baseEditForm([
    {
      key: 'display',
      components: ChartsEditDisplay,
    },
    {
      key: 'data',
      components: ChartsEditData,
    },
    {
      key: 'layout',
      components: ChartsEditLayout,
    },
    {
      key: 'events',
      components: ChartsEditEvents,
    }
  ], ...extend);
}
