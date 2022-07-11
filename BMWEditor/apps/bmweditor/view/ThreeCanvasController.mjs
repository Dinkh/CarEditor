import ComponentController from '../../../node_modules/neo.mjs/src/controller/Component.mjs';

/**
 * @class BMWEditor.view.ThreeCanvasController
 * @extends Neo.controller.Component
 */
class ThreeCanvasController extends ComponentController {
    static getConfig() {
        return {
            /**
             * @member {String} className='BMWEditor.view.ThreeCanvasController'
             * @protected
             */
            className: 'BMWEditor.view.ThreeCanvasController',
            /**
             * @member {String} ntype='renderercontroller'
             * @protected
             */
            ntype: 'threecanvascontroller',
        }
    }

    onCanvasClick(event) {
        let vm = this.getModel();

        if(vm.getData('picking') === '...picking...'){
            Neo.main.addon.Three.getColor({pos: {x: event.clientX, y: event.clientY}})
                .then(data => {
                    vm.setData('selectedColor', {background: data});
                });
        } else {
            Neo.main.addon.Three.getDistance({pos: {x: event.clientX, y: event.clientY}})
                .then(data => {
                    if(data) {
                        if(data < 0.01){
                            data = data * 10000;
                            data = data.toFixed(2);
                            data = `${data} mm`;
                        }else if(data < 1) {
                            data = data * 100;
                            data = data.toFixed(2);
                            data = `${data} cm`;
                        } else {
                            data = data.toFixed(2);
                            data = `${data} m`;
                        }

                        vm.setData('distance', data);
                    }
                });
        }

    }

    onMounted() {
        Neo.main.addon.Three.initialize({
            selector: 'three-d-canvas-container',
            url: '../../resources/files/car/scene.gltf'
        });
    }
}

Neo.applyClassConfig(ThreeCanvasController);

export default ThreeCanvasController;
