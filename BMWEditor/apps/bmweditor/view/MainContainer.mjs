import Viewport         from '../../../node_modules/neo.mjs/src/container/Viewport.mjs';
import MainController   from "./MainController.mjs";
import ThreeDCanvas     from "./ThreeCanvas.mjs";
import MainModel        from "./MainModel.mjs";

/**
 * @class BMWEditor.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static getConfig() {return {
        className: 'BMWEditor.view.MainContainer',
        autoMount: true,

        model: MainModel,
        controller: MainController,

        layout: {ntype: 'fit'},
        items: [{
            reference: 'three-d-canvas',
            module: ThreeDCanvas
        }]
    }}
}

Neo.applyClassConfig(MainContainer);

export default MainContainer;