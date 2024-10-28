import { Formio } from 'formiojs'
import Charts from './charts/Charts.js';
import ColorPickerComponent from './colorpicker/ColorPicker.js';

Formio.Components.addComponent('colorpicker', ColorPickerComponent);


Formio.use([
   {
      components: {
         rating: Charts
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

// Formio.createForm(document.getElementById('formio'), {
//    components: [
//       Charts.schema()
//    ]
// }, {
//    sanitizeConfig: {
//       addTags: ["svg", "path"],
//       addAttr: ["d", "viewBox"]
//    }
// })