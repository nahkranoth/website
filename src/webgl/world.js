import {Renderer, Geometry, Program, Color, Mesh} from 'ogl/src/Core.js'
import TriangleScreenShader from '../shaders/TriangleScreenShader.js'

export default class World{
    constructor(context){
        const renderer = new Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        const gl = renderer.gl;
        document.body.appendChild(gl.canvas);
        gl.clearColor(1, 1, 1, 1);
        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', resize, false);
        resize();
        // Triangle that covers viewport, with UVs that still span 0 > 1 across viewport
        const geometry = new Geometry(gl, {
            position: {size: 3, data: new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0])},
            uv: {size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2])},
        });
        const program = new Program(gl, {
            vertex: TriangleScreenShader.vertex,
            fragment: TriangleScreenShader.fragment,
            uniforms: {
                uTime: {value: 0},
                uColor: {value: new Color(0.3, 0.2, 0.5)}
            },
        });
        const mesh = new Mesh(gl, {geometry, program});
        requestAnimationFrame(update);
        function update(t) {
            requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            // Don't need a camera if camera uniforms aren't required
            renderer.render({scene: mesh});
        }
    }
}