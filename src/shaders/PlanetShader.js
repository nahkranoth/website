const vertex = `
precision highp float;
precision highp int;
attribute vec2 uv;
attribute vec3 position;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = `
precision highp float;
precision highp int;
uniform sampler2D tMap;
varying vec2 vUv;
uniform float uHit;

void main() {
    vec3 tex = texture2D(tMap, vUv).rgb;
    vec3 clr = mix(vec3(0.2, 0.8, 1.0), vec3(1.0, 0.2, 0.8), uHit);
    gl_FragColor.rgb = tex * clr;
    gl_FragColor.a = 1.0;
}
`;

export default {vertex, fragment};
