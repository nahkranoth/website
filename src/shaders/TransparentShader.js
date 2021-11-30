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
uniform float uHit;

varying vec2 vUv;

void main() {
    vec4 tex = texture2D(tMap, vUv);
    vec4 clr = mix(vec4(.42, .42, .42, .52), vec4(1.0, 1.0, 1.0, 1.0), uHit);
    gl_FragColor.rgba = tex * clr;
}
`;

export default {vertex, fragment};
