import TabContainer             from '../../../../node_modules/neo.mjs/src/tab/Container.mjs';
import Container                from "../../../../node_modules/neo.mjs/src/container/Base.mjs";
import TabElementsController    from "./TabElementsController.mjs";

/**
 * @class BMWEditor.view.dialogs.TabElements
 * @extends Neo.tab.Container
 */
class TabElements extends TabContainer {
    static getConfig() {return {
        className: 'BMWEditor.view.dialogs.TabElements',
        ntype: 'tabelements',

        controller: TabElementsController,

        height: 200,
        width : 300,

        itemDefaults: {
            module: Container,
            cls   : ['neo-examples-tab-component'],
            style : {padding: '20px'},
        },

        items: [{
            tabButtonConfig: {
                iconCls: 'fa fa-eye-dropper',
                text   : '3D Color Picker'
            },
            items: [{
                ntype: 'button',
                bind: {text: data => data.picking},
                handler: 'on3DPickingClick'
            }]
        }, {
            tabButtonConfig: {
                iconCls: 'fa fa-ruler',
                text   : 'Distance'
            },
            items: [{
                ntype: 'button',
                bind: {text: data => data.ruler},
                handler: 'on3DRulerClick'
            },{
                ntype: 'container',
                cls: ['distance-result'],
                bind: {html: data => data.distance}
            }]
        }]
    }}
}

Neo.applyClassConfig(TabElements);

export default TabElements;