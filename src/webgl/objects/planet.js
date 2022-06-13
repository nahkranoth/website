import {Program, Mesh, Sphere} from 'ogl/src/index.mjs';
import TextureLoader from '../TextureLoader.js'
import PlanetShader from '../../shaders/PlanetShader.js';

export default class PlanetObject{
    constructor(parent, renderer){
        this.parent = parent;
        this.gl = renderer.gl;
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

    }

}