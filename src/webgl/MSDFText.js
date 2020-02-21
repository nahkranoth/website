import {Transform, Text, Camera, Geometry, Texture, Program, Mesh, Vec3, Color, Orbit, Sphere} from 'ogl/src/index.mjs';
import MSFDShader100 from '../shaders/MSDFShader100.js';
import MSFDShader300 from '../shaders/MSDFShader300.js';

export default class MSDFText {

    constructor(renderer, scene) {
        this.renderer = renderer;
        this.gl = this.renderer.gl;
        this.scene = scene;

        this.image = new Image();
        this.image.onload = () =>{ this.onTextureLoaded() };
        this.image.src = 'assets/text/Fira.png';

    }

    async loadText(program) {
        const font = await (await fetch('assets/text/Fira.json')).json();
        const text = new Text({
            font,
            text: 'don\'t panic',
            width: 4,
            align: 'center',
            letterSpacing: -0.05,
            size: 1,
            lineHeight: 1.1,
        });


        // Pass the generated buffers into a geometry
        const geometry = new Geometry(this.gl, {
            position: {size: 3, data: text.buffers.position},
            uv: {size: 2, data: text.buffers.uv},
            id: {size: 1, data: text.buffers.id},
            index: {data: text.buffers.index},
        });

        const mesh = new Mesh(this.gl, {geometry, program});

        // Use the height value to position text vertically. Here it is centered.
        mesh.position.y = text.height * 0.5;
        mesh.setParent(this.scene);
    }

    onTextureLoaded(){
        const texture = new Texture(this.gl, {
            generateMipmaps: false,
        });

        texture.image = this.image;
        let program = this.renderer.isWebgl2 ? this.getProgram300(texture) : this.getProgram100(texture);

        this.loadText(program);
    }

    getProgram100(texture){
        return new Program(this.gl, {
            vertex: MSFDShader100.vertex,
            fragment: MSFDShader100.fragment,
            uniforms: {
                tMap: {value: texture},
            },
            transparent: true,
            cullFace: null,
            depthWrite: false,
        });
    }

    getProgram300(texture){
        return new Program(this.gl, {
            vertex: MSFDShader300.vertex,
            fragment: MSFDShader300.fragment,
            uniforms: {
                tMap: {value: texture},
            },
            transparent: true,
            cullFace: null,
            depthWrite: false,
        });
    }
}
