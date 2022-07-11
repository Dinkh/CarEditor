import Container from '../../../../node_modules/neo.mjs/src/container/Base.mjs';

/**
 * @class BMWEditor.view.dialogs.MeasureTool
 * @extends Neo.component.Base
 */
class MeasureTool extends Container {
    static getConfig() {return {
        className: 'BMWEditor.view.dialogs.MeasureTool',
        ntype: 'measuretool',

        cls: ['measure-tool'],
        bind: {
            style: data => data.selectedColor
        }
    }}
}

Neo.applyClassConfig(MeasureTool);

export default MeasureTool;
