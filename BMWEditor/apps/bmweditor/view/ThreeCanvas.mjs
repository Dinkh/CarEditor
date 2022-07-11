import Container                from '../../../node_modules/neo.mjs/src/container/Base.mjs';
import ThreeCanvasController    from "./ThreeCanvasController.mjs";

/**
 * @class BMWEditor.view.Renderer
 * @extends Neo.component.Base
 */
class ThreeCanvas extends Container {
    static getConfig() {return {
        /**
         * @member {String} className='BMWEditor.view.ThreeCanvas'
         * @protected
         */
        className: 'BMWEditor.view.ThreeCanvas',
        /**
         * @member {String} ntype='thee-d-canvas'
         * @protected
         */
        ntype: 'thee-d-canvas',

        controller: ThreeCanvasController,

        items:[{
            ntype: 'component',
            cls: ['threejs-click-area'],
            domListeners: {
                click: 'onCanvasClick'
            },
            listeners: {
                mounted: 'onMounted'
            }
        }]
    }}
}

Neo.applyClassConfig(ThreeCanvas);

export default ThreeCanvas;