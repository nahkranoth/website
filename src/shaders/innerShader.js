const vertex = `#version 300 es
precision highp float;
precision highp int;

in vec3 position;
in vec2 uv;
in vec3 normal;

uniform mat3 normalMatrix;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
out vec2 vUv;

void main() {
    vUv = uv;
    vec3 norm = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
precision highp int;

in vec2 vUv;
out vec4 FragColor;

void main() {
    FragColor = vec4(0.83,0.37,0.07, 1.);
}
`;

export default {vertex, fragment};
