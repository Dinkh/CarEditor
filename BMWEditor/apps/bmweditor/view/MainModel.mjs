import Component    from '../../../node_modules/neo.mjs/src/model/Component.mjs';

/**
 * @class BMWEditor.view.MainModel
 * @extends Neo.model.Component
 */
class MainModel extends Component {
    static getConfig() {return {
        /**
         * @member {String} className='BMWEditor.view.MainModel'
         * @protected
         */
        className: 'BMWEditor.view.MainModel',

        data: {
            selectedColor: {background: 'blue'},
            distance: '0.00 m',
            picking: 'Start 3D Color Picking',
            ruler: 'Start 3D Distance Measure'
        }
    }}
}

Neo.applyClassConfig(MainModel);

export default MainModel;
