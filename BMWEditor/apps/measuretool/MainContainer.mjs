import Viewport     from '../../node_modules/neo.mjs/src/container/Viewport.mjs';

/**
 * @class MeasureTool.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static getConfig() {return {
        className: 'MeasureTool.MainContainer',
        autoMount: true,
        layout   : {ntype: 'fit'}
    }}
}

Neo.applyClassConfig(MainContainer);

export default MainContainer;