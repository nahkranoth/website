import {Program, Mesh, Sphere} from 'ogl/src/index.mjs';
import SkydomeShader from '../../shaders/SkyDomeShader.js';
import TextureLoader from '../TextureLoader.js'

export default class SkyboxObject{
    constructor(parent, gl, renderer){
        this.parent = parent;
        this.gl = gl;
        this.renderer = renderer;
        this.mesh;
    }

    async load() {
        const program = new Program(this.gl, {
            vertex: SkydomeShader.vertex,
            fragment: SkydomeShader.fragment,
            cullFace: null,
            uniforms: {
                tMap: {value: TextureLoader.getTexture(this.gl, 'assets/skybox/skybox.png')},
            },

        });
        const sphereGeometry = new Sphere(this.gl, {radius: 1, widthSegments: 64});
        this.mesh = new Mesh(this.gl, {geometry: sphereGeometry, program});
        this.mesh.position.set(0, 0, 0);
        this.mesh.scale.set(80, 80, 80);
        this.mesh.setParent(this.parent);
    }
}