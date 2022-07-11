import Dialog from '../../../../node_modules/neo.mjs/src/dialog/Base.mjs';

/**
 * @class BMWEditor.src.dialog.ExternalDialog
 * @extends Neo.dialog.Base
 */
class ExternalDialog extends Dialog {
    static getConfig() {return {
        className: 'BMWEditor.src.dialog.ExternalDialog',
        ntype: 'externaldialog',

        appName: 'BMWEditor',

        cls: ['bmw-dialog'],
        closeAction: 'hide',
        resizable: false,

        buttonAction: null,
        buttonHide: false
    }}

    /**
     * override
     */
    createHeader() {
        let me      = this,
            cls     = ['neo-header-toolbar', 'neo-toolbar'],
            headers = me.headers || [];

        me.draggable && cls.push('neo-draggable');

        headers.unshift({
            cls  : cls,
            dock : 'top',
            id   : me.getHeaderToolbarId(),
            items: [{
                ntype: 'label',
                text : me.title
            }, '->', {
                iconCls: 'fa-solid fa-window-restore',
                handler: me.buttonAction,
                hidden: me.buttonHide
            }]
        });

        me.headers = headers;
    }
}

Neo.applyClassConfig(ExternalDialog);

export default ExternalDialog;
