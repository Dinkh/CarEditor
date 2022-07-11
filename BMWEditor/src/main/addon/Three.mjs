import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';

/**
 * Three.js is a 3D renderer
 * @class Neo.main.addon.Three
 * @extends Neo.core.Base
 * @singleton
 */
class Three extends Base {
    static getConfig() {
        return {
            /**
             * @member {String} className='Neo.main.addon.Three'
             * @protected
             */
            className: 'Neo.main.addon.Three',
            /**
             * Remote method access for other workers
             * @member {Object} remote={app: [//...]}
             * @protected
             */
            remote: {
                app: [
                    'getColor',
                    'getDistance',
                    'initialize'
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
     * @param {Object} config
     */
    construct(config) {
        super.construct(config);
        console.log('Neo.main.addon.Three construct');
    }

    /**
     * create an intersection observer based on a css class name
     * @param {Object}   data
     * @param {String}   data.selector
     * @param {String}   data.url
     *
     * @returns {Three}
     */
    initialize(data) {
        let me = this,
            scene, camera, renderer;

        function init() {
            scene = new THREE.Scene();
            me.scene = scene;
            scene.background = new THREE.Color(0xdddddd);

            camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
            camera.rotation.y = 45/180*Math.PI;
            camera.position.x = 800;
            camera.position.y = 100;
            camera.position.z = 1000;
            me.camera = camera;

            let hlight = new THREE.AmbientLight (0x404040,100);
            scene.add(hlight);

            let directionalLight = new THREE.DirectionalLight(0xffffff,100);
            directionalLight.position.set(0,1,0);
            directionalLight.castShadow = true;
            scene.add(directionalLight);
            let light = new THREE.PointLight(0xc4c4c4,10);
            light.position.set(0,300,500);
            scene.add(light);
            let light2 = new THREE.PointLight(0xc4c4c4,10);
            light2.position.set(500,100,0);
            scene.add(light2);
            let light3 = new THREE.PointLight(0xc4c4c4,10);
            light3.position.set(0,100,-500);
            scene.add(light3);
            let light4 = new THREE.PointLight(0xc4c4c4,10);
            light4.position.set(-500,300,500);
            scene.add(light4);

            renderer = new THREE.WebGLRenderer({antialias:true});
            renderer.setSize(window.innerWidth,window.innerHeight);
            renderer.domElement.classList.add(data.selector);
            document.body.appendChild(renderer.domElement);

            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = 0;
            me.renderer = renderer;

            let controls = new THREE.OrbitControls(camera, renderer.domElement);
            //controls.addEventListener('change', renderer);

            let loader = new THREE.GLTFLoader();
            loader.load(data.url, function(gltf){
                let car = gltf.scene.children[0];
                car.scale.set(0.5,0.5,0.5);
                scene.add(gltf.scene);
                animate();
            });

            me.scene = scene;
        }
        function animate() {
            renderer.render(scene,camera);
            requestAnimationFrame(animate);
        }
        init();

        return true;
    }

    pointer = null

    getDistance(data) {
        let raycaster = new THREE.Raycaster(),
            pointer,
            intersects,
            distance;

        if(this.pointer === null) {
            pointer = new THREE.Vector3();
            pointer.x = ( data.pos.x / window.innerWidth ) * 2 - 1;
            pointer.y = - ( data.pos.y / window.innerHeight ) * 2 + 1;

            // // update the picking ray with the camera and pointer position
            // raycaster.setFromCamera( pointer, this.camera );
            //
            // // calculate objects intersecting the picking ray
            // intersects = raycaster.intersectObjects( this.scene.children );

            this.pointer = pointer;
        } else {
            pointer = new THREE.Vector3();
            pointer.x = ( data.pos.x / window.innerWidth ) * 2 - 1;
            pointer.y = - ( data.pos.y / window.innerHeight ) * 2 + 1;

            // // update the picking ray with the camera and pointer position
            // raycaster.setFromCamera( pointer, this.camera );
            //
            // // calculate objects intersecting the picking ray
            // intersects = raycaster.intersectObjects( this.scene.children );
            //
            distance = this.pointer.distanceTo(pointer);

            this.pointer = null;

            return distance;
        }
    }

    getColor(data) {
        // initialize
        let scene = this.scene,
            camera = this.camera,
            renderer = this.renderer,
            pickingTexture = this.pickingTexture,
            pixelBuffer = this.pixelBuffer,
            pickedObject = null,
            pickedObjectSavedColor = 0,
            cssPosition = data.pos;

        if(!pickingTexture) {
            pickingTexture = this.pickingTexture = new THREE.WebGLRenderTarget(1, 1);
            pixelBuffer = this.pixelBuffer = new Uint8Array(4);
        }

        // set the view offset to represent just a single pixel under the mouse
        const pixelRatio = renderer.getPixelRatio(),
            rendererContext = renderer.getContext();

        camera.setViewOffset(
            rendererContext.drawingBufferWidth,   // full width
            rendererContext.drawingBufferHeight,  // full top
            cssPosition.x * pixelRatio | 0,        // rect x
            cssPosition.y * pixelRatio | 0,        // rect y
            1,                                     // rect width
            1,                                     // rect height
        );
        // render the scene
        renderer.setRenderTarget(pickingTexture);
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);
        // clear the view offset so rendering returns to normal
        camera.clearViewOffset();
        //read the pixel
        renderer.readRenderTargetPixels(pickingTexture,0,0,1,1,pixelBuffer);

        return `rgb(${pixelBuffer[0]},${pixelBuffer[1]},${pixelBuffer[2]})`;
    }
}

Neo.applyClassConfig(Three);

let instance = Neo.create(Three);

Neo.applyToGlobalNs(instance);

export default instance;
