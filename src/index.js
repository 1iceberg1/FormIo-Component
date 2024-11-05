import { Formio } from 'formiojs';
import Charts from './charts/Charts.js';
import ColorPickerComponent from './colorpicker/ColorPicker.js';

Formio.use([
  {
    components: {
      charts: Charts
    }
  },
  {
    components: {
      colorpicker: ColorPickerComponent
    }
  }
])

Formio.builder(document.getElementById("builder"), {}, {
   sanitizeConfig: {
      addTags: ["svg", "path"],
      addAttr: ["d", "viewBox"]
   }
}).then(() => {

});