import ComponentController from '../../../node_modules/neo.mjs/src/controller/Component.mjs';
import NeoArray from "../../../node_modules/neo.mjs/src/util/Array.mjs";
import ExternalDialog from '../src/dialog/ExternalDialog.mjs';
import ColorPicker from "./dialogs/ColorPicker.mjs";
import MeasureTool from "./dialogs/MeasureTool.mjs";
import TabElements from "./dialogs/TabElements.mjs";

/**
 * @class BMWEditor.view.MainController
 * @extends Neo.controller.Component
 */
class MainController extends ComponentController {
    static getConfig() {
        return {
            /**
             * @member {String} className='BMWEditor.view.MainController'
             * @protected
             */
            className: 'BMWEditor.view.MainController',
            /**
             * @member {String} ntype='main-controller'
             * @protected
             */
            ntype: 'main-controller',

            /**
             * @member {String[]} connectedApps=[]
             */
            connectedApps: [],
        }
    }

    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.currentWorker.on({
            connect   : me.onAppConnect,
            disconnect: me.onAppDisconnect,
            scope     : me
        });

        me.component.on('mounted', me.onMainViewMounted, me);
    }

    /**
     * @param {Object} data
     */
    onColorPickerToggle(data) {
        MainController.#hideDialog(data);

        setTimeout(() => {
            MainController.#createPopupWindow('color-picker', 'colorpicker', 'ColorPicker', {
                height: 130,
                left: -290,
                top: -1390,
                width: 280
            });
        }, 10);
    }

    /**
     * @param {Object} data
     */
    onMeasureToolToggle(data) {
        MainController.#hideDialog(data);

        MainController.#createPopupWindow('measure-tools', 'measuretool', 'MeasureTool', {
            height: 175,
            left: -215,
            top: -1145,
            width: 200
        });
    }

    /**
     * Add windows
     */
    onMainViewMounted() {
        let me = this;

        me.#createDialog('colorpicker');
        me.#createDialog('measuretool');
        me.#createDialog('tabelements');
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     */
    onAppConnect(data) {
        let me = this,
            name = data.appName,
            model = me.getModel(),
            item;

        console.log('%c[i]%c onAppConnect ' + name, 'background-color: teal; color: white', '');

        switch (name) {
            case 'ColorPicker':
                item = this.colorPicker;
                break;
            case 'MeasureTool':
                item = this.measureTool;
                break;
        }

        if(item) {
            NeoArray.add(me.connectedApps, name);

            Neo.apps[name].on('render', () => {
                setTimeout(() => {
                    item.parent.remove(item.view, false);
                    me.#getMainView(name).add(item.view);

                    console.log(item.view);

                    model.setData('selectedColor', model.getData('selectedColor'));

                }, 100);
            });

        }
    }

    /**
     * @param {Object} data
     * @param {String} data.appName
     */
    onAppDisconnect(data) {
        let me = this,
            name = data.appName,

            parentView = me.#getMainView(name),
            view = parentView.items[0],
            model = this.getModel(),
            item;

        console.log('%c[i]%c onAppDisconnect ' + name, 'background-color: teal; color: white', '');

        if(name === 'BMWEditor') {
            Neo.Main.windowClose({
                names: me.connectedApps,
            });
            return;
        }

        switch (name) {
            case 'ColorPicker':
                item = this.colorPicker;
                break;
            case 'MeasureTool':
                item = this.measureTool;
                break;
        }

        view = parentView.items[0];

        if(view) {
            parentView.remove(view, false);
            item.parent.add(view);

            // Workaround : Ensure the current color is picked
            let oldColor = model.getData('selectedColor');
            model.setData('selectedColor', null);
            model.setData('selectedColor', oldColor);

            item.dialog.mount();

            NeoArray.remove(me.connectedApps, name);
            Neo.apps[name].destroy();
        }
    }

    /**
     * @param {String} containerReference
     * @param {String} url
     * @param {String} windowName
     * @param {Object} data
     *
     * @example
     *      'controls-panel', 'sharedcovidchart', 'SharedCovidChart'
     */
    static #createPopupWindow(containerReference, url, windowName, data) {
        let {height, left, top, width} = data;
        console.log('%c[i]%c windowName ' + windowName, 'background-color: teal; color: white', '');

        Neo.Main.windowOpen({
            url: `../${url}/index.html`,
            windowFeatures: `height=${height},left=${left},top=${top},width=${width}`,
            windowName
        });
    }

    /**
     * create a dialog and save it to var in controller scope
     * @param {string} contentName
     */
    colorPicker = {}
    measureTool = {}

    #createDialog(contentName) {
        let me = this,
            contentDescription = {
                colorpicker: {title: 'Color Picker',wrapperStyle: {top: '10px', right: '10px'},buttonAction: me.onColorPickerToggle.bind(me)},
                measuretool: {title: 'Selected Color',wrapperStyle: {top: '200px',right: '10px'},buttonAction: me.onMeasureToolToggle.bind(me)},
                tabelements: {title: 'Tool Collection',wrapperStyle: {top: '10px',left: '10px'},buttonAction: Neo.emptyFn,buttonHide: true}
            },
            content = contentDescription[contentName],
            model = me.getModel(),
            name = me.component.appName,
            view, parentView;

        let dialog = Neo.create({
            module: ExternalDialog,
            appName: name,
            title: content.title,
            height: 185, width: 300,
            wrapperStyle: content.wrapperStyle,
            buttonHide: content.buttonHide,
            items: [{
                ntype: contentName,
                model: {
                    parent: model
                }
            }],
            buttonAction: content.buttonAction
        });

        view = dialog.down(contentName);
        parentView = view.up();

        switch (contentName) {
            case 'colorpicker':
                me.colorPicker = {dialog, view, parent: parentView};
                break;
            case 'measuretool':
                me.measureTool = {dialog, view, parent: parentView};
                break;
        }
    }

    /**
     * @param {String} [appName]
     * @returns {Neo.component.Base}
     */
    #getMainView(appName) {
        if (!appName || appName === 'BMWEditor') {
            return this.component;
        }

        return Neo.apps[appName].mainView;
    }

    /**
     *
     * @param {Event} data
     */
    static #hideDialog(data) {
        data.component.up('externaldialog').unmount();
    }
}

Neo.applyClassConfig(MainController);

export default MainController;
