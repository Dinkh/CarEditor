import Container                from '../../../../node_modules/neo.mjs/src/container/Base.mjs';
import ColorPickerController    from "./ColorPickerController.mjs";

/**
 * @class BMWEditor.view.dialogs.ColorPicker
 * @extends Neo.component.Base
 */
class ColorPicker extends Container {
    static getConfig() {return {
        className: 'BMWEditor.view.dialogs.ColorPicker',
        ntype: 'colorpicker',

        controller: ColorPickerController,

        cls: ['color-picker'],

        layout: 'base',
        items: [{
            ntype: 'component',
            cls  : ['picker-in-color'],
            vdom : {tag: 'canvas'},
            listeners: {
                mounted: 'onColorPickerMounted'
            },
            domListeners: {
                mouseup: 'onColorPickerClick'
            }
        }]
    }
    }
}

Neo.applyClassConfig(ColorPicker);

export default ColorPicker;
