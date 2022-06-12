import {Geometry, Program, Mesh, Sphere, Plane, Color} from 'ogl/src/index.mjs';
import TextureLoader from '../TextureLoader.js'
import PlanetShader from '../../shaders/PlanetShader.js';
import CloudShader from '../../shaders/CloudShader.js';

export default class EarthObject{
    constructor(parent, gl, renderer){
        this.parent = parent;
        this.gl = gl;
        this.renderer = renderer;
        this.mesh;
    }

    update(dt){
        if(this.mesh){
            this.mesh.rotation.y += 0.01 * dt;
        }
        if(this.cloudMesh){
            this.cloudMesh.rotation.y -= 0.01 * dt;
        }
    }
    
    async load() {
        const program = new Program(this.gl, {
            vertex: PlanetShader.vertex,
            fragment: PlanetShader.fragment,
            cullFace: null,
            uniforms: {
                tMap: {value: TextureLoader.getTexture(this.gl, 'assets/text/earth.jpg')},
                uHit: { value: 0. },
            },

        });

        const planetGeometry = new Sphere(this.gl, {
            radius: 1, 
            widthSegments: 64
        });

        this.mesh = new Mesh(this.gl, {geometry: planetGeometry, program});
        this.mesh.isHit = false;
        this.mesh.position.set(-50, 5, -40);
        this.mesh.scale.set(20, 20, 20);
        this.mesh.setParent(this.parent);
        this.loadClouds();
    }

    async loadClouds() {
        const program = new Program(this.gl, {
            vertex: CloudShader.vertex,
            fragment: CloudShader.fragment,
            cullFace: null,
            uniforms: {
                tMap: {value: TextureLoader.getTexture(this.gl, 'assets/text/clouds_t.png')},
                uHit: { value: 1. },
            },
            transparent: true,

        });

        const planetGeometry = new Sphere(this.gl, {
            radius: 1, 
            widthSegments: 64
        });

        this.cloudMesh = new Mesh(this.gl, {geometry: planetGeometry, program});
        this.cloudMesh.position.set(-50, 5, -40);
        this.cloudMesh.scale.set(20.1, 20.1, 20.1);
        this.cloudMesh.setParent(this.parent);
    }
}