import {Camera, Raycast, Vec3} from 'ogl/src/index.mjs';
import InputControls from './InputControls';
import CometObject from './objects/comet';
import EarthObject from './objects/earth.js';
import PlanetObject from './objects/planet.js';
import SkyboxObject from './objects/skybox.js';
import MSDFText from '../webgl/MSDFText.js'

export default class World{

    constructor(loadedCallback, renderer, scene) {

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
        document.addEventListener('registerButton', (e) => { this.onRegisterButton(e); });

        window.addEventListener('resize', () => {this.resize()}, false);
        this.resize();

        this.fftData = [];
       
        this.raycast = new Raycast(this.gl);

        this.comet = new CometObject(this.scene, this.renderer);
        this.comet.load();
        
        this.planet = new PlanetObject(this.scene, this.renderer);
        this.planet.load();

        this.skydome = new SkyboxObject(this.scene, this.renderer);
        this.skydome.load();

        this.earth = new EarthObject(this.scene, this.renderer);
        this.earth.load();

        this.imkerBtn = new MSDFText(
            this.renderer, 
            this.scene,
            "Imker",
            new Vec3(-8,-2,-14),
            true,
            "OnImkerClicked"
        );

        this.gamesBtn = new MSDFText(
            this.renderer, 
            this.scene,
            "Games",
            new Vec3(-3,-4,-15),
            true,
            "OnGamesClicked"
        );

        this.vfxBtn = new MSDFText(
            this.renderer, 
            this.scene,
            "VFX",
            new Vec3(6,-4,-25),
            true,
            "OnVFXClicked"
        );

        this.musicBtn = new MSDFText(
            this.renderer, 
            this.scene,
            "Music",
            new Vec3(12,-2,-21),
            true,
            "OnMusicClicked"
        );

        this.roboticsBtn = new MSDFText(
            this.renderer,
            this.scene,
            "ROS2",
            new Vec3(4,-8,-21),
            true,
            "OnRoboticsROS2Clicked"
        );


        this.loadedCallback();
        
        this.clickMeshes = [];
        this.update = requestAnimationFrame(() => {this.updateLoop()});
    }

    onRegisterButton(e){
        this.clickMeshes.push(e.detail.target.mesh);
    }

    onMouseMoved(e){
        this.clickMeshes.forEach((mesh) => {
            mesh.container.setHit(false)
        });

        this.raycast.castMouse(this.camera, e.detail.mouse);
        const hits = this.raycast.intersectBounds(this.clickMeshes);
        hits.forEach((mesh) => (mesh.container.setHit(true)));
    }

    onMouseClicked(e){
        this.raycast.castMouse(this.camera, e.detail.mouse);
        const hits = this.raycast.intersectBounds(this.clickMeshes);

        if(hits.length == 0 ) return;
        hits[0].container.onClick();
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
        this.comet.setFFT(fft);
    }
}
