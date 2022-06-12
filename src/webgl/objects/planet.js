import {Geometry, Program, Mesh, Sphere, Plane, Color} from 'ogl/src/index.mjs';
import TextureLoader from '../TextureLoader.js'
import PlanetShader from '../../shaders/PlanetShader.js';
import TransparentShader from '../../shaders/TransparentShader.js';

export default class PlanetObject{
    constructor(parent, gl, renderer){
        this.parent = parent;
        this.gl = gl;
        this.renderer = renderer;
        this.mesh;
    }

    update(){
        if(this.mesh){
            this.mesh.rotation.y += 0.0003;
        }
    }
    
    async load() {
        const program = new Program(this.gl, {
            vertex: PlanetShader.vertex,
            fragment: PlanetShader.fragment,
            cullFace: null,
            uniforms: {
                tMap: {value: TextureLoader.getTexture(this.gl, 'assets/text/2k_mercury.jpg')},
                uHit: { value: 1. },
            },

        });

        const planetGeometry = new Sphere(this.gl, {
            radius: 1, 
            widthSegments: 64
        });

        function updateHitUniform({ mesh }) {
            program.uniforms.uHit.value = mesh.isHit ? 1 : 0;
        }

        this.mesh = new Mesh(this.gl, {geometry: planetGeometry, program});
        this.mesh.isHit = false;
        this.mesh.position.set(5, 5, -40);
        this.mesh.scale.set(2, 2, 2);
        this.mesh.setParent(this.parent);
        this.mesh.onBeforeRender(updateHitUniform);

        this.loadImage();
    }

    async loadImage() {
        const program = new Program(this.gl, {
            vertex: TransparentShader.vertex,
            fragment: TransparentShader.fragment,
            cullFace: null,
            uniforms: {
                tMap: {value: TextureLoader.getTexture(this.gl, 'assets/images/logo.png')},
                uHit: { value: 1. },
            },
            transparent: true,

        });

        function updateHitUniform({ mesh }) {
            program.uniforms.uHit.value = mesh.isHit ? 1 : 0;
        }

        const quadGeometry = new Plane(this.gl, {});
        this.img = new Mesh(this.gl, {geometry: quadGeometry, program});
        this.img.position.set(0, 0, 1);
        this.img.isHit = false;
        this.img.scale.set(.4, .4, .4);
        this.img.setParent(this.mesh);
        this.img.onBeforeRender(updateHitUniform);
    }
}