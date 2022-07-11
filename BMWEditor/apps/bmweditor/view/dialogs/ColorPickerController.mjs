import ComponentController  from '../../../../node_modules/neo.mjs/src/controller/Component.mjs';
import NeoArray             from "../../../../node_modules/neo.mjs/src/util/Array.mjs";

/**
 * @class BMWEditor.view.dialogs.ColorPickerController
 * @extends Neo.controller.Component
 */
class ColorPickerController extends ComponentController {
    static getConfig() {return {
        className: 'BMWEditor.view.dialogs.ColorPickerController',
        ntype: 'colorpicker-controller',
    }}

    onColorPickerMounted() {
        let me = this;

        if(!me.component.rendered){
            setTimeout(() => {
                me.onColorPickerMounted()
            }, 50);
        }
        else {
            let app = me.component.appName;
            Neo.main.addon.Canvas.createColorPickerArea({appName: app, selector: 'picker-in-color'});
        }
    }

    onColorPickerClick(){
        let me = this,
            model = me.getModel();

        Neo.main.addon.Canvas.getColorFromArea({
            appName: me.component.appName
        }).then(data=> {
            model.setData('selectedColor', {background: data.color});
        });
    }
}

Neo.applyClassConfig(ColorPickerController);

export default ColorPickerController;
