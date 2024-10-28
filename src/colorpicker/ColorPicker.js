import { Components } from 'formiojs';
const Field = Components.components.field;

export default class ColorPickerComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'colorpicker',
      label: 'Color Picker',
      key: 'colorpicker',
      defaultValue: '#FFFFFF',
      ...extend,
    });
  }

  static get builderInfo() {
    return {
      title: 'Color Picker',
      icon: 'paint-brush',
      group: 'basic',
      documentation: '',
      weight: 0,
      schema: ColorPickerComponent.schema()
    };
  }

  render() {
    return super.render(`
      <div>
        <input type="color" id="${this.key}" ref="input" value="${this.component.defaultValue || '#FFFFFF'}" />
      </div>
    `);
  }

  attach(element) {
    super.attach(element);
    this.loadRefs(element, { input: 'single' });

    if (this.refs.input) {
      this.refs.input.addEventListener('input', (event) => {
        this.setValue(event.target.value);
      });
    }
    return element;
  }

  // Override `setErrorClasses` to ensure `elements` is an array
  setErrorClasses(elements, dirty, hasErrors, hasRequired) {
    const elementArray = Array.isArray(elements) ? elements : [elements];
    elementArray.forEach(element => {
      if (hasErrors) {
        element.classList.add('is-invalid');
      } else {
        element.classList.remove('is-invalid');
      }
    });
  }

  getValue() {
    return this.refs.input ? this.refs.input.value : this.defaultValue;
  }

  setValue(value) {
    if (this.refs.input) {
      this.refs.input.value = value;
    }
    return super.setValue(value);
  }
}
