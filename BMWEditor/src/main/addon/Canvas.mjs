import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';

/**
 * Change Canvas settings and pick color
 * @class Neo.main.addon.Canvas
 * @extends Neo.core.Base
 * @singleton
 */
class Canvas extends Base {
    static getConfig() {
        return {
            /**
             * @member {String} className='Neo.main.addon.Canvas'
             * @protected
             */
            className: 'Neo.main.addon.Canvas',
            /**
             * Remote method access for other workers
             * @member {Object} remote={app: [//...]}
             * @protected
             */
            remote: {
                app: [
                    'addCls',
                    'createColorPickerArea',
                    'getColorFromArea',
                    'getColor'
                ]
            },
            /**
             * @member {Boolean} singleton=true
             * @protected
             */
            singleton: true
        }
    }

    /**
     * create an intersection observer based on a css class name
     * @param {Object}   data
     * @param {String}   data.selector
     * @param {String}   data.url
     *
     * @returns {Three}
     */
    createColorPickerArea(data) {
        let app = {};

        app.$colors  = document.querySelectorAll('.' + data.selector)[0];
        app.colorctx = app.$colors.getContext('2d');

        // Build Color palette
        app.buildColorPalette = function() {
            var gradient = app.colorctx.createLinearGradient(0, 0, app.$colors.width, 0);
            // Create color gradient
            gradient.addColorStop(0,    "rgb(255,   0,   0)");
            gradient.addColorStop(0.15, "rgb(255,   0, 255)");
            gradient.addColorStop(0.33, "rgb(0,     0, 255)");
            gradient.addColorStop(0.49, "rgb(0,   255, 255)");
            gradient.addColorStop(0.67, "rgb(0,   255,   0)");
            gradient.addColorStop(0.84, "rgb(255, 255,   0)");
            gradient.addColorStop(1,    "rgb(255,   0,   0)");
            // Apply gradient to canvas
            app.colorctx.fillStyle = gradient;
            app.colorctx.fillRect(0, 0, app.colorctx.canvas.width, app.colorctx.canvas.height);
            // Create semi transparent gradient (white -> trans. -> black)
            gradient = app.colorctx.createLinearGradient(0, 0, 0, app.$colors.height);
            gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
            gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
            gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
            gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");
            // Apply gradient to canvas
            app.colorctx.fillStyle = gradient;
            app.colorctx.fillRect(0, 0, app.colorctx.canvas.width, app.colorctx.canvas.height);

            let gatherPosition = function(e) {
                app.colorEventX = e.layerX;
                app.colorEventY = e.layerY;

                app.getColor();
            };

            app.$colors.addEventListener('mousedown', function(e) {
                gatherPosition(e);
                // Track mouse movement on the canvas if the mouse button is down
                document.addEventListener('mousemove', gatherPosition);

                // Get the color at the current mouse coordinates
                app.colorTimer = setInterval(app.getColor, 50);
            });
                // On mouseup, clear the interval and unbind the mousemove event,
                // it should only happen if the button is down
            app.$colors.addEventListener('mouseup',function(e) {
                clearInterval(app.colorTimer);
                document.removeEventListener('mousemove', gatherPosition);
            });

            app.getColor = function() {
                var newColor,
                    imageData = app.colorctx.getImageData(app.colorEventX, app.colorEventY, 1, 1);

                app.selectedColor = 'rgb(' + imageData.data[0] + ', ' + imageData.data[1] + ', ' + imageData.data[2] + ')';
                console.log('selectedColor', app.selectedColor)
            };
        }();

        this.colorPickerArea = app;

        return true;
    }

    getColorFromArea(){
        return {color: this.colorPickerArea.selectedColor};
    }
}

Neo.applyClassConfig(Canvas);

let instance = Neo.create(Canvas);

Neo.applyToGlobalNs(instance);

export default instance;
