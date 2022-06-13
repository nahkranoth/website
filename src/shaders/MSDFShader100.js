const vertex = /* glsl */ `
            precision highp float;
            precision highp int;
            attribute vec2 uv;
            attribute vec3 position;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

const fragment = /* glsl */ `
            #extension GL_OES_standard_derivatives : enable
            precision highp float;
            precision highp int;
            uniform sampler2D tMap;
            uniform float uHit;
            varying vec2 vUv;
            void main() {
                vec3 tex = texture2D(tMap, vUv).rgb;
                float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
                float d = fwidth(signedDist);
                float alpha = smoothstep(-d, d, signedDist);
                if (alpha < 0.01) discard;
                vec3 clr = mix(vec3(1., 1., 1.0), vec3(1.0, 0.2, 0.8), uHit);
                gl_FragColor.rgb = clr;
                gl_FragColor.a = alpha;
            }
        `;

export default {vertex, fragment};
