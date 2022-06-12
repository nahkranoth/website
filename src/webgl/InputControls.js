import {Transform, Camera, Vec3, Orbit} from 'ogl/src/index.mjs';

export default class InputControls{

    constructor(camera, renderer){
        this.mouse = new Vec3();
        this.camera = camera;
        this.renderer = renderer;
        this.cameraTarget = new Vec3();
        this.controls = new Orbit(this.camera, {minDistance: 2, maxDistance: 20, enablePan: false});

        window.addEventListener(
            'load',
            () => {
                document.addEventListener('mousedown',  (e) => {this.mouseDown(e)}, false);
                document.addEventListener('touchstart',  (e) => {this.touchDown(e)}, false);
                document.addEventListener('mousemove',  (e) => {this.mouseMove(e)}, false);
            },
            false
        );
    }

    setTarget(target){
        this.cameraTarget = target;
    }

    update(){
        this.controls.target = this.lerp(this.controls.target, this.cameraTarget, 0.06);
        this.controls.update();
    }

    lerp(start, end, t) {
        const splitX = start.x * (1 - t) + end.x * t;
        const splitY = start.y * (1 - t) + end.y * t;
        const splitZ = start.z * (1 - t) + end.z * t;
        return new Vec3(splitX, splitY, splitZ);
    }

    mouseToView(_x, _y){
        let x = 2.0 * (_x / this.renderer.width) - 1.0;
        let y = 2.0 * (1.0 - _y / this.renderer.height) - 1.0;
        return new Vec3(x,y, 0);
    }

    mouseMove(e) {
        let mPos = this.mouseToView(e.x, e.y);
        this.mouse.set(mPos.x, mPos.y, 0);
        
        document.dispatchEvent(new CustomEvent("inputMouseMoved", {
            detail: {
              mouse: this.mouse
            }
          }));
    }

    touchDown(e){
        let mPos = this.mouseToView(e.touches[0].clientX, e.touches[0].clientY);
        this.mouse.set(mPos.x, mPos.y, 0);

        document.dispatchEvent(new CustomEvent("inputMouseClicked", {
            detail: {
              mouse: this.mouse
            }
          }));
    }

    mouseDown(e) {
        let mPos = this.mouseToView(e.x, e.y);
        this.mouse.set(mPos.x, mPos.y, 0);
        document.dispatchEvent(new CustomEvent("inputMouseClicked", {
            detail: {
              mouse: this.mouse
            }
          }));
    }
}