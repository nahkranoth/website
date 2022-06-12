import {Transform, Camera, Raycast, Geometry, Texture, Program, Mesh, Vec3, Color, Orbit, Sphere, Box, Plane} from 'ogl/src/index.mjs';
import InnerShader from '../shaders/innerShader.js';
import InputControls from './InputControls';
import CometObject from './objects/comet';
import EarthObject from './objects/earth.js';
import PlanetObject from './objects/planet.js';
import SkyboxObject from './objects/skybox.js';

export default class World{

    constructor(loadedCallback, renderer, scene, clickCallback) {

        this.perfectFrameTime = 1000 / 60;
        this.lastTimestamp = Date.now();

        this.loadedCallback = loadedCallback;
        this.renderer = renderer;
        this.gl = this.renderer.gl;
        this.gl.clearColor(0., 0., 0., 1);
        this.gl.getExtension('OES_standard_derivatives');
        this.scene = scene;

        this.camera = new Camera(this.gl, {fov: 45, far: 600});
        this.camera.position.set(0, 0.5, 5);

        this.input = new InputControls(this.camera, this.renderer);
        document.addEventListener('inputMouseMoved', (e) => { this.onMouseMoved(e); });
        document.addEventListener('inputMouseClicked', (e) => { this.onMouseClicked(e); });
        this.clickCallback = clickCallback;

        window.addEventListener('resize', () => {this.resize()}, false);
        this.resize();

        this.fftData = [];
       
        this.raycast = new Raycast(this.gl);

        this.comet = new CometObject(this.scene, this.gl, this.renderer);
        this.comet.load();
        
        this.planet = new PlanetObject(this.scene, this.gl, this.renderer);
        this.planet.load();

        this.skydome = new SkyboxObject(this.scene, this.gl, this.renderer);
        this.skydome.load();

        this.earth = new EarthObject(this.scene, this.gl, this.renderer);
        this.earth.load();

        this.loadedCallback();
        
        this.clickMeshes = [this.planet.mesh];
        this.update = requestAnimationFrame(() => {this.updateLoop()});
    }

    onMouseMoved(e){
        this.clickMeshes.forEach((mesh) => (mesh.isHit = false));
        this.raycast.castMouse(this.camera, e.detail.mouse);
        const hits = this.raycast.intersectBounds(this.clickMeshes);
        hits.forEach((mesh) => (mesh.isHit = true));
    }

    onMouseClicked(e){
        this.raycast.castMouse(this.camera, e.detail.mouse);
        const hits = this.raycast.intersectBounds(this.clickMeshes);
        if(hits[0] == this.planet.mesh){
            this.input.setTarget(hits[0].position);
            this.planet.mesh.isHit = false;
            this.clickMeshes = [this.planet.img];
            this.clickCallback();
        }
        if(hits[0] == this.planet.img){
            window.open('http://joeyvanderkaaij.com/sharing/Imker/', "_self");
        }
    }

    toggle(active){
        if(active){
            this.resume();
            return;
        }
        this.pause();
    }

    resume(){
        this.update = requestAnimationFrame(() => {this.updateLoop()});
    }

    pause(){
        window.cancelAnimationFrame(this.update);
    }

    resize() {
        this.renderer.setSize(document.body.clientWidth, document.body.clientHeight);
        this.camera.perspective({aspect: this.gl.canvas.width / this.gl.canvas.height});
    }

    onBackToRoot(){
        this.clickMeshes = [this.planet.mesh];
        this.input.setTarget(this.comet.cometMesh.position);
    }

    updateLoop() {
        this.update = requestAnimationFrame(() => {this.updateLoop()});

        this.deltaTime = (Date.now() - this.lastTimestamp)/1000;
        this.lastTimestamp = Date.now();

        this.input.update();
        this.renderer.render({scene:this.scene, camera:this.camera});
        this.comet.update(); 
        this.planet.update();
        this.earth.update(this.deltaTime);
    }

    setFFT(fft){
        for(var i=0;i<this.fftData.length;i++){
            this.fftData[i] = fft[i%fft.length];
        }
        this.geometry.attributes.fft.data = new Float32Array(this.fftData);
        this.geometry.attributes.fft.needsUpdate = true;
    }
}
