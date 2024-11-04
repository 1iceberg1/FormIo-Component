import { Components } from 'formiojs';
const Field = Components.components.field;

export default class ColorPickerComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'colorpicker',
      label: 'Color Picker',
      key: 'colorpicker',
      defaultValue: 'rgba(0, 0, 0, 1)', // Default with full opacity
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
        <input type="color" id="${this.key}" ref="inputColor" value="${this.component.defaultValue || '#000000'}" />
        <input type="range" min="0" max="1" step="0.01" id="${this.key}-alpha" ref="inputAlpha" value="1" />
        <label for="${this.key}-alpha">Transparency</label>
      </div>
    `);
  }

  attach(element) {
    super.attach(element);
    this.loadRefs(element, { inputColor: 'single', inputAlpha: 'single' });

    if (this.refs.inputColor && this.refs.inputAlpha) {
      this.refs.inputColor.addEventListener('input', (event) => {
        this.updateColorValue();
      });

      this.refs.inputAlpha.addEventListener('input', (event) => {
        this.updateColorValue();
      });
    }
    return element;
  }

  updateColorValue() {
    if (this.refs.inputColor && this.refs.inputAlpha) {
      const color = this.refs.inputColor.value;
      const alpha = this.refs.inputAlpha.value;
      const rgbaColor = this.hexToRgba(color, alpha);
      this.setValue(rgbaColor);
    }
  }

  hexToRgba(hex, alpha) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  getValue() {
    return this.component.defaultValue || 'rgba(0, 0, 0, 1)';
  }

  setValue(value) {
    if (!value || typeof value !== 'string') {
      // Fallback to a default color if the value is null, undefined, or not a string
      value = 'rgba(0, 0, 0, 1)';
    }

    if (this.refs.inputColor && this.refs.inputAlpha) {
      const rgbaMatch = value.match(/rgba?\((\d+), (\d+), (\d+),? ?([\d.]+)?\)/);
      if (rgbaMatch) {
        const [_, r, g, b, a = 1] = rgbaMatch;
        this.refs.inputColor.value = `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`;
        this.refs.inputAlpha.value = a;
      } else {
        // If the value is not in RGBA format, set it directly to the color input
        this.refs.inputColor.value = value;
        this.refs.inputAlpha.value = 1; // Default alpha
      }
    }
    return super.setValue(value);
  }
}
