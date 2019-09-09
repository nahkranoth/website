import {Renderer, Transform, Camera, Geometry, Texture, Program, Mesh, Vec3, Color} from 'ogl/src/Core.js';
import {Orbit, Sphere} from 'ogl/src/Extras.js';
import PBRShader300 from '../shaders/PBRShader300.js';
import SkydomeShader from '../shaders/SkyDomeShader.js';

export default class World{



    constructor(context, loadedCallback){
        const renderer = new Renderer({dpr: 2, canvas:context});
        const gl = renderer.gl;
        document.body.appendChild(gl.canvas);
        gl.clearColor(0., 0., 0., 1);
        const camera = new Camera(gl, {fov: 35});
        camera.position.set(2, 0.5, 3);
        const controls = new Orbit(camera, {minDistance:2, maxDistance:30, enablePan:false});
        function resize() {
            renderer.setSize(document.body.clientWidth, document.body.clientHeight);
            camera.perspective({aspect: gl.canvas.width / gl.canvas.height});
        }
        window.addEventListener('resize', resize, false);
        resize();
        const scene = new Transform();
        scene.position.y = -0;
        const textureCache = {};
        var texturesLoaded = 0;
        var textureAmount = 5;

        function getTexture(src, generateMipmaps = true) {
            if (textureCache[src]) return textureCache[src];
            const texture = new Texture(gl, {generateMipmaps});
            const image = new Image();
            textureCache[src] = texture;
            image.onload = () => {
                texture.image = image;
                texturesLoaded++;
                if(texturesLoaded >= textureAmount){
                    loadedCallback();
                }
            };
            image.src = src;
            return texture;
        }

        // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
        const Shader = PBRShader300;

        loadComet();
        loadSkydome();

        async function loadSkydome() {
            const program = new Program(gl, {
                vertex: SkydomeShader.vertex,
                fragment: SkydomeShader.fragment,
                cullFace: null,
                uniforms: {
                    tMap: {value: getTexture('assets/skybox/skybox.png')},
                },

            });
            const sphereGeometry = new Sphere(gl, {radius: 1, widthSegments: 64});
            const cube = new Mesh(gl, {geometry: sphereGeometry, program});
            cube.position.set(0, 0, 0);
            cube.scale.set(30, 30, 30);
            cube.setParent(scene);
        }

        async function loadComet() {
            const data = await (await fetch(`assets/cometPBR/mesh.json`)).json();

            const geometry = new Geometry(gl, {
                position: {size: 3, data: new Float32Array(data.verts)},
                uv: {size: 2, data: new Float32Array(data.texcoords)},
                normal: {size: 3, data: new Float32Array(data.normals)},
            });


            //NOTES:
            /*
                I needed to flip all the maps in photoshop to make them allign with the model in the end.
             */

            // This whole effect lives in the fairly epic shader.
            const program = new Program(gl, {
                vertex: Shader.vertex,
                fragment: Shader.fragment,
                uniforms: {
                    // Base color / albedo. This is used to determine both the diffuse and specular colors.
                    tBaseColor: {value: getTexture('assets/cometPBR/comet2_DefaultMaterial_BaseColor2.png')},
                    // This works as a multiplier for each channel in the texture above.
                    uBaseColor: {value: new Color(1, 1, 1)},

                    // 'Roughness', 'Metalness' and 'Occlusion', each packed into their own channel (R, G, B)
                    tRMO: {value: getTexture('assets/cometPBR/comet2_DefaultMaterial_OcclusionRoughnessMetallic2.png')},
                    // The following are multipliers to the above values
                    uRoughness: {value: 0.3},
                    uMetallic: {value: 0.1},
                    uOcclusion: {value: 1},

                    // Just a regular normal map
                    tNormal: {value: getTexture('assets/cometPBR/comet2_DefaultMaterial_Normal2.png')},
                    uNormalScale: {value: 1},
                    uNormalUVScale: {value: 1},

                    // Emissive color is added at the very end to simulate light sources.
                    tEmissive: {value: getTexture('assets/cometPBR/comet2_DefaultMaterial_Emissive2.png')},
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
            const mesh = new Mesh(gl, {geometry, program});
            mesh.setParent(scene);
        }

        requestAnimationFrame(update);
        function update() {
            requestAnimationFrame(update);
            scene.rotation.z += 0.0005;
            scene.rotation.y += 0.0003;
            controls.update();
            renderer.render({scene, camera});
        }
    }
}