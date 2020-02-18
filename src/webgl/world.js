import {Renderer, Transform, Camera, Geometry, Texture, Program, Mesh, Vec3, Color, Orbit, Sphere} from 'ogl/src/index.mjs';
import PBRShader300 from '../shaders/PBRShader300.js';
import PBRShader100 from '../shaders/PBRShader100.js';
import MSDFTextShader from '../shaders/msdf.js';
import InnerShader from '../shaders/innerShader.js';
import SkydomeShader from '../shaders/SkyDomeShader.js';
import createLayout from 'layout-bmfont-text';

import vertices from 'three-bmfont-text/lib/vertices';
import createIndices from 'quad-indices';
import buffer from 'three-buffer-vertex-data';

export default class World{

    constructor(context, loadedCallback) {
        this.loadedCallback = loadedCallback;

        this.renderer = new Renderer({dpr: 2, canvas: context, webgl:1});
        this.gl = this.renderer.gl;
        this.gl.clearColor(0., 0., 0., 1);
        this.gl.getExtension('OES_standard_derivatives');

        this.camera = new Camera(this.gl, {fov: 35});
        this.camera.position.set(2, 0.5, 3);

        this.controls = new Orbit(this.camera, {minDistance: 2, maxDistance: 30, enablePan: false});

        window.addEventListener('resize', () => {this.resize()}, false);
        this.resize();

        this.scene = new Transform();
        this.scene.position.y = -0;
        this.textureCache = {};
        this.texturesLoaded = 0;
        this.textureAmount = 4; //bad bad decision TODO: move this

        this.fftData = [];

        this.InnerShader = InnerShader;
        
        this.loadComet();
        // this.loadSkydome();
        this.loadText();
        this.update = requestAnimationFrame(() => {this.updateLoop()});
    }

    async loadText(){

        var fontLoaded = await (await fetch(`assets/text/Krona.json`)).json();
        var img = await (await fetch('assets/text/Krona.png'));

        var opt = {
            text: "testing 123",
            font: fontLoaded,
            align: 'left',
            flipY: false
        };

        if (!opt.font) {
            throw new TypeError('must specify a { font } in options')
        }

        // get vec2 texcoords
        var flipY = opt.flipY !== false;

        var layout = createLayout(opt);

        // the desired BMFont data
        var font = opt.font;

        // determine texture size from font file
        var texWidth = font.common.scaleW;
        var texHeight = font.common.scaleH;

        // get visible glyphs
        var glyphs = layout.glyphs.filter(function (glyph) {
            var bitmap = glyph.data;
            return bitmap.width * bitmap.height > 0
        });

        console.log(glyphs);

        var positions = vertices.positions(glyphs);
        var uvs = vertices.uvs(glyphs, texWidth, texHeight, flipY);
        var indices = createIndices({
            clockwise: true,
            type: 'uint16',
            count: glyphs.length
        });

        var textGeometry = new Geometry(this.gl, {
            position: {size: 3, data: new Float32Array(positions)},
            uv: {size: 2, data: new Float32Array(uvs)}
        });

        console.log(uvs);
        console.log(this.textGeometry);

        var program = new Program(this.gl, {
                vertex: MSDFTextShader.vertex,
                fragment:MSDFTextShader.fragment,
                uniforms: {

                }
            });

        var textMesh = new Mesh(this.gl, {geometry:textGeometry, program:program});
        textMesh.setParent(this.scene);
        console.log("text Mesh made");
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
    
    getTexture(src, generateMipmaps = true) {
        if (this.textureCache[src]) return this.textureCache[src];
        const texture = new Texture(this.gl, {generateMipmaps});
        const image = new Image();
        this.textureCache[src] = texture;
        image.onload = () => {
            texture.image = image;
            this.texturesLoaded++;
            if(this.texturesLoaded >= this.textureAmount){
                this.loadedCallback();
            }
        };
        image.src = src;
        return texture;
    }

    async loadSkydome() {
        const program = new Program(this.gl, {
            vertex: SkydomeShader.vertex,
            fragment: SkydomeShader.fragment,
            cullFace: null,
            uniforms: {
                tMap: {value: this.getTexture('assets/skybox/skybox.png')},
            },

        });
        const sphereGeometry = new Sphere(this.gl, {radius: 1, widthSegments: 64});
        const cube = new Mesh(this.gl, {geometry: sphereGeometry, program});
        cube.position.set(0, 0, 0);
        cube.scale.set(30, 30, 30);
        cube.setParent(this.scene);
    }

    async loadComet() {
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

        this.cometMesh.setParent(this.scene);

        this.innerProgram = new Program(this.gl, {
            vertex: this.InnerShader.vertex,
            fragment: this.InnerShader.fragment,
            transparent: true,
        });

        this.innerCometMesh = new Mesh(this.gl, {geometry:this.innerGeometry, program:this.innerProgram});
        this.innerCometMesh.scale = new Vec3(0.5, 0.5, 0.5);
        this.innerCometMesh.setParent(this.scene);
    }

    updateLoop() {
        this.update = requestAnimationFrame(() => {this.updateLoop()});
        this.scene.rotation.z += 0.0005;
        this.scene.rotation.y += 0.0003;
        this.controls.update();
        this.renderer.render({scene:this.scene, camera:this.camera});
    }

    setFFT(fft){
        for(var i=0;i<this.fftData.length;i++){
            this.fftData[i] = fft[i%fft.length];
        }
        this.geometry.attributes.fft.data = new Float32Array(this.fftData);
        this.geometry.attributes.fft.needsUpdate = true;
    }

    getProgram100(){
        return new Program(this.gl, {
            vertex: PBRShader100.vertex,
            fragment:PBRShader100.fragment,
            uniforms: {
                // Base color / albedo. This is used to determine both the diffuse and specular colors.
                tBaseColor: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_BaseColor2.png')},
                // This works as a multiplier for each channel in the texture above.
                uBaseColor: {value: new Color(1, 1, 1)},

                // 'Roughness', 'Metalness' and 'Occlusion', each packed into their own channel (R, G, B)
                tRMO: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_OcclusionRoughnessMetallic2.png')},
                // The following are multipliers to the above values
                uRoughness: {value: 0.3},
                uMetallic: {value: 0.1},
                uOcclusion: {value: 1},

                // Just a regular normal map
                tNormal: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_Normal2.png')},
                uNormalScale: {value: 1},
                uNormalUVScale: {value: 1},

                // Emissive color is added at the very end to simulate light sources.
                tEmissive: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_Emissive2.png')},
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
                tBaseColor: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_BaseColor2.png')},
                // This works as a multiplier for each channel in the texture above.
                uBaseColor: {value: new Color(1, 1, 1)},

                // 'Roughness', 'Metalness' and 'Occlusion', each packed into their own channel (R, G, B)
                tRMO: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_OcclusionRoughnessMetallic2.png')},
                // The following are multipliers to the above values
                uRoughness: {value: 0.3},
                uMetallic: {value: 0.1},
                uOcclusion: {value: 1},

                // Just a regular normal map
                tNormal: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_Normal2.png')},
                uNormalScale: {value: 1},
                uNormalUVScale: {value: 1},

                // Emissive color is added at the very end to simulate light sources.
                tEmissive: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_Emissive2.png')},
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
