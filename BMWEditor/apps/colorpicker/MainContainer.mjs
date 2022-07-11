import Viewport from '../../node_modules/neo.mjs/src/container/Viewport.mjs';

/**
 * @class ColorPicker.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static getConfig() {return {
        className: 'ColorPicker.MainContainer',
        autoMount: true,
        layout   : {ntype: 'fit'}
    }}
}

Neo.applyClassConfig(MainContainer);

export default MainContainer;
