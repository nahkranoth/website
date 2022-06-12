import {Geometry, Program, Mesh, Texture, Vec3, Color} from 'ogl/src/index.mjs';
import PBRShader300 from '../../shaders/PBRShader300.js';
import PBRShader100 from '../../shaders/PBRShader100.js';
import InnerShader from '../../shaders/innerShader.js';
import TextureLoader from '../TextureLoader.js'

export default class Comet{

    constructor(parent, gl, renderer){
        this.parent = parent;
        this.gl = gl;
        this.renderer = renderer;
        this.fftData = [];
    }

    async load() {
        const data = await (await fetch(`assets/cometPBR/mesh.json`)).json();

        for(var i=0;i<5982;i++){
            this.fftData[i] = 0;
        }

       this.geometry = new Geometry(this.gl, {
           position: {size: 3, data: new Float32Array(data.verts)},
           uv: {size: 2, data: new Float32Array(data.texcoords)},
           normal: {size: 3, data: new Float32Array(data.normals)},
           fft: {size:1, data:new Float32Array(this.fftData)}
       });

        this.innerGeometry = new Geometry(this.gl, {
            position: {size: 3, data: new Float32Array(data.verts)},
            uv: {size: 2, data: new Float32Array(data.texcoords)},
            normal: {size: 3, data: new Float32Array(data.normals)}
        });

        this.program = this.renderer.isWebgl2 ? this.getProgram300() : this.getProgram100();

        this.cometMesh = new Mesh(this.gl, {geometry:this.geometry, program:this.program});

        this.cometMesh.setParent(this.parent);

        this.innerProgram = new Program(this.gl, {
            vertex: InnerShader.vertex,
            fragment: InnerShader.fragment,
            transparent: true,
        });

        this.innerCometMesh = new Mesh(this.gl, {geometry:this.innerGeometry, program:this.innerProgram});
        this.innerCometMesh.scale = new Vec3(0.5, 0.5, 0.5);
        this.innerCometMesh.setParent(this.scene);
    }

    update(){
        if(this.cometMesh && this.innerCometMesh){
            this.cometMesh.rotation.y += 0.0004;
            this.cometMesh.rotation.z += 0.0004;
            this.innerCometMesh.rotation.y += 0.0004;
            this.innerCometMesh.rotation.z += 0.0004;
        }
    }

    getProgram100(){
        return new Program(this.gl, {
            vertex: PBRShader100.vertex,
            fragment:PBRShader100.fragment,
            uniforms: {
                // Base color / albedo. This is used to determine both the diffuse and specular colors.
                tBaseColor: {value: TextureLoader.getTexture('assets/cometPBR/comet2_DefaultMaterial_BaseColor2.png')},
                // This works as a multiplier for each channel in the texture above.
                uBaseColor: {value: new Color(1, 1, 1)}
            },
            transparent: true,
        });
    }

    getProgram300(){
        //NOTES:
        /*
            I needed to flip all the maps in photoshop to make them allign with the model in the end.
            WebGL2 -> make sure both shaders work to test WebGL1 look at Renderer instantiation webgl version parameter
         */

        return new Program(this.gl, {
            vertex: PBRShader300.vertex,
            fragment:PBRShader300.fragment,
            uniforms: {
                // Base color / albedo. This is used to determine both the diffuse and specular colors.
                tBaseColor: {value: TextureLoader.getTexture(this.gl, 'assets/cometPBR/comet2_DefaultMaterial_BaseColor2.png')},
                // This works as a multiplier for each channel in the texture above.
                uBaseColor: {value: new Color(1, 1, 1)},

                // 'Roughness', 'Metalness' and 'Occlusion', each packed into their own channel (R, G, B)
                tRMO: {value: TextureLoader.getTexture(this.gl, 'assets/cometPBR/comet2_DefaultMaterial_OcclusionRoughnessMetallic2.png')},
                // The following are multipliers to the above values
                uRoughness: {value: 0.3},
                uMetallic: {value: 0.1},
                uOcclusion: {value: 1},

                // Just a regular normal map
                tNormal: {value: TextureLoader.getTexture(this.gl, 'assets/cometPBR/comet2_DefaultMaterial_Normal2.png')},
                uNormalScale: {value: 1},
                uNormalUVScale: {value: 1},

                // Emissive color is added at the very end to simulate light sources.
                tEmissive: {value: TextureLoader.getTexture(this.gl, 'assets/cometPBR/comet2_DefaultMaterial_Emissive2.png')},
                uEmissive: {value: 6},

                // uAlpha is an overall alpha control. It is applied right at the end to hide the geometry.
                // Specular reflections will not affect this value, unlike above.
                uAlpha: {value: 1},

                // One light is included, ideally to simulate the sun, and both specular and diffuse are calculated.
                uLightDirection: {value: new Vec3(0, 1, 1)},
                // Here I've pushed the white light beyond 1 to increase its effect.
                uLightColor: {value: new Vec3(0.6)},
            },
            transparent: true,
        });
    }
}