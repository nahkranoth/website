import {Transform, Camera, Raycast, Geometry, Texture, Program, Mesh, Vec3, Color, Orbit, Sphere, Box} from 'ogl/src/index.mjs';
import PBRShader300 from '../shaders/PBRShader300.js';
import PBRShader100 from '../shaders/PBRShader100.js';
import InnerShader from '../shaders/innerShader.js';
import SkydomeShader from '../shaders/SkyDomeShader.js';
import PlanetShader from '../shaders/PlanetShader.js';

export default class World{

    constructor(loadedCallback, renderer, scene, clickCallback) {
        this.loadedCallback = loadedCallback;
        this.renderer = renderer;
        this.gl = this.renderer.gl;
        this.gl.clearColor(0., 0., 0., 1);
        this.gl.getExtension('OES_standard_derivatives');
        this.scene = scene;
        this.camera = new Camera(this.gl, {fov: 45, far: 600});
        this.camera.position.set(0, 0.5, 5);
        this.controls = new Orbit(this.camera, {minDistance: 2, maxDistance: 20, enablePan: false});
        this.clickCallback = clickCallback;

        window.addEventListener('resize', () => {this.resize()}, false);
        this.resize();

        window.addEventListener(
            'load',
            () => {
                document.addEventListener('mousedown',  (e) => {this.mouseDown(e)}, false);
                document.addEventListener('mousemove',  (e) => {this.mouseMove(e)}, false);
            },
            false
        );

        this.textureCache = {};
        this.texturesLoaded = 0;
        this.textureAmount = 0; //bad bad decision TODO: move this

        this.fftData = [];

        this.InnerShader = InnerShader;
        
        this.mouse = new Vec3();
       
        this.raycast = new Raycast(this.gl);
        this.loadComet();
        this.loadSkydome();
        this.loadPlanet();
        this.clickMeshes = [this.planet];
        this.update = requestAnimationFrame(() => {this.updateLoop()});
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
        this.skydome = new Mesh(this.gl, {geometry: sphereGeometry, program});
        this.skydome.position.set(0, 0, 0);
        this.skydome.scale.set(80, 80, 80);
        this.skydome.setParent(this.scene);
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

    async loadPlanet() {

        const program = new Program(this.gl, {
            vertex: PlanetShader.vertex,
            fragment: PlanetShader.fragment,
            cullFace: null,
            uniforms: {
                tMap: {value: this.getTexture('assets/text/2k_mercury.jpg')},
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

        this.planet = new Mesh(this.gl, {geometry: planetGeometry, program});
        this.planet.isHit = true;
        this.planet.position.set(5, 5, -40);
        this.planet.scale.set(2, 2, 2);
        this.planet.setParent(this.scene);
        this.planet.onBeforeRender(updateHitUniform);
    }

    mouseMove(e) {
        let x = 2.0 * (e.x / this.renderer.width) - 1.0;
        let y = 2.0 * (1.0 - e.y / this.renderer.height) - 1.0;
        this.mouse.set(x, y, 0);
        this.clickMeshes.forEach((mesh) => (mesh.isHit = false));
        this.raycast.castMouse(this.camera, this.mouse);
        const hits = this.raycast.intersectBounds(this.clickMeshes);
        hits.forEach((mesh) => (mesh.isHit = true));
    }

    mouseDown(e) {
        this.raycast.castMouse(this.camera, this.mouse);
        const hits = this.raycast.intersectBounds(this.clickMeshes);
        if(hits.length > 0){
            this.controls.target = hits[0].position;
            this.clickCallback();
        }
    }

    viewComet(){
        this.controls.target = this.cometMesh.position;
    }

    updateLoop() {
        this.update = requestAnimationFrame(() => {this.updateLoop()});
        this.controls.update();
        this.renderer.render({scene:this.scene, camera:this.camera});

        if(this.cometMesh && this.innerCometMesh){
            this.cometMesh.rotation.y += 0.0004;
            this.cometMesh.rotation.z += 0.0004;
            this.innerCometMesh.rotation.y += 0.0004;
            this.innerCometMesh.rotation.z += 0.0004;
        }
        if(this.planet){
            this.planet.rotation.y += 0.003;
        }
    }

    setFFT(fft){
        for(var i=0;i<this.fftData.length;i++){
            this.fftData[i] = fft[i%fft.length];
        }
        this.geometry.attributes.fft.data = new Float32Array(this.fftData);
        this.geometry.attributes.fft.needsUpdate = true;
    }

    getProgram100(){

        this.textureAmount = 1; //bad bad decision TODO: move this

        return new Program(this.gl, {
            vertex: PBRShader100.vertex,
            fragment:PBRShader100.fragment,
            uniforms: {
                // Base color / albedo. This is used to determine both the diffuse and specular colors.
                tBaseColor: {value: this.getTexture('assets/cometPBR/comet2_DefaultMaterial_BaseColor2.png')},
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
        this.textureAmount = 4; //bad bad decision TODO: move this

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
