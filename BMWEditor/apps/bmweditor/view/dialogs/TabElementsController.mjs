import ComponentController  from '../../../../node_modules/neo.mjs/src/controller/Component.mjs';

/**
 * @class BMWEditor.view.dialogs.TabElementsController
 * @extends Neo.controller.Component
 */
class TabElementsController extends ComponentController {
    static getConfig() {return {
        className: 'BMWEditor.view.dialogs.TabElementsController',
        ntype: 'colorpicker-controller',
    }}

    on3DPickingClick(event) {
        let me = this,
            vm = me.getModel(),
            button = event.component,
            newPressedState = !button.pressed;

        button.pressed = newPressedState;

        // set Button Text
        vm.setData('picking', newPressedState ? '...picking...' : 'Start 3D Color Picking');
        // set picking cls to mainview
        Neo.getComponent('neo-viewport-1')[newPressedState ? 'addCls' : 'removeCls']('picking-3d');
    }

    on3DRulerClick(event) {
        let me = this,
            vm = me.getModel(),
            button = event.component,
            newPressedState = !button.pressed;

        button.pressed = newPressedState;

        // set Button Text
        vm.setData('ruler', newPressedState ? '...picking...' : 'Start 3D Distance Measure');
        // set picking cls to mainview
        Neo.getComponent('neo-viewport-1')[newPressedState ? 'addCls' : 'removeCls']('picking-3d');
    }
}

Neo.applyClassConfig(TabElementsController);

export default TabElementsController;
