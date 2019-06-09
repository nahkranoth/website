import {Renderer, Transform, Camera, Geometry, Texture, Program, Mesh, Vec3, Color} from 'ogl/src/Core.js';
import {Orbit, Plane} from 'ogl/src/Extras.js';
import PBRShader300 from '../shaders/PBRShader300.js';

export default class World{
    constructor(context){
        const renderer = new Renderer({dpr: 2});
        const gl = renderer.gl;
        document.body.appendChild(gl.canvas);
        gl.clearColor(0.1, 0.1, 0.1, 1);
        const camera = new Camera(gl, {fov: 35});
        camera.position.set(2, 0.5, 3);
        const controls = new Orbit(camera);
        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({aspect: gl.canvas.width / gl.canvas.height});
        }
        window.addEventListener('resize', resize, false);
        resize();
        const scene = new Transform();
        scene.position.y = -0.4;
        const textureCache = {};
        function getTexture(src, generateMipmaps = true) {
            if (textureCache[src]) return textureCache[src];
            const texture = new Texture(gl, {generateMipmaps});
            const image = new Image();
            textureCache[src] = texture;
            image.onload = () => {
                texture.image = image;
            };
            image.src = src;
            return texture;
        }
        // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
        const Shader = PBRShader300;
        loadExterior();
        async function loadExterior() {
            const data = await (await fetch(`assets/pbr/car-ext.json`)).json();

            const geometry = new Geometry(gl, {
                position: {size: 3, data: new Float32Array(data.position)},
                uv: {size: 2, data: new Float32Array(data.uv)},
                normal: {size: 3, data: new Float32Array(data.normal)},
            });

            // This whole effect lives in the fairly epic shader.
            const program = new Program(gl, {
                vertex: Shader.vertex,
                fragment: Shader.fragment,
                uniforms: {
                    // Base color / albedo. This is used to determine both the diffuse and specular colors.
                    tBaseColor: {value: getTexture('assets/pbr/car-ext-color.jpg')},
                    // This works as a multiplier for each channel in the texture above.
                    uBaseColor: {value: new Color(1, 1, 1)},

                    // 'Roughness', 'Metalness' and 'Occlusion', each packed into their own channel (R, G, B)
                    tRMO: {value: getTexture('assets/pbr/car-ext-rmo.jpg')},
                    // The following are multipliers to the above values
                    uRoughness: {value: 1},
                    uMetallic: {value: 1},
                    uOcclusion: {value: 1},

                    // Just a regular normal map
                    tNormal: {value: getTexture('assets/pbr/car-ext-normal.jpg')},
                    uNormalScale: {value: 0.5},
                    uNormalUVScale: {value: 1},

                    // Emissive color is added at the very end to simulate light sources.
                    tEmissive: {value: getTexture('assets/pbr/car-ext-emissive.jpg')},
                    uEmissive: {value: 1},

                    // uAlpha is an overall alpha control. It is applied right at the end to hide the geometry.
                    // Specular reflections will not affect this value, unlike above.
                    uAlpha: {value: 1},

                    // One light is included, ideally to simulate the sun, and both specular and diffuse are calculated.
                    uLightDirection: {value: new Vec3(0, 1, 1)},
                    // Here I've pushed the white light beyond 1 to increase its effect.
                    uLightColor: {value: new Vec3(7)},
                },
                transparent: true,
            });
            const mesh = new Mesh(gl, {geometry, program});
            mesh.setParent(scene);
        }

        requestAnimationFrame(update);
        function update() {
            requestAnimationFrame(update);
            scene.rotation.y += 0.005;
            controls.update();
            renderer.render({scene, camera});
        }
    }
}