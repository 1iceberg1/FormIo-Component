import { Formio } from 'formiojs';
import ChartsEditDisplay from "./editForm/Charts.edit.display.js";
import ChartsEditData from "./editForm/Charts.edit.data.js"

export default function (...extend) {
  return Formio.Components.baseEditForm([
    {
      key: 'display',
      components: ChartsEditDisplay,
    },
    {
      key: 'data',
      components: ChartsEditData,
    }
  ], ...extend);
}
