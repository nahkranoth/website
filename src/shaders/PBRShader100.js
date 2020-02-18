const vertex = /* glsl */ `
    precision highp float;
    precision highp int;
    attribute vec3 position;
    attribute vec2 uv;
    attribute vec3 normal;
    attribute float fft;
    uniform mat3 normalMatrix;
    uniform mat4 modelMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vMPos;
    void main() {
       vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec3 pos = position + (fft*vNormal*0.3);
        vec4 mPos = modelMatrix * vec4(position, 1.0);
        vMPos = mPos.xyz / mPos.w;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fragment = /* glsl */ `
    #extension GL_OES_standard_derivatives : enable
    precision highp float;
    precision highp int;
    uniform vec3 cameraPosition;
    uniform mat4 viewMatrix;
    uniform vec3 uBaseColor;
    uniform sampler2D tBaseColor;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vMPos;
        
    
    const float PI = 3.14159265359;
    const float RECIPROCAL_PI = 0.31830988618;
    const float RECIPROCAL_PI2 = 0.15915494;
    const float LN2 = 0.6931472;
    const float ENV_LODS = 6.0;
   
    void main() {
        gl_FragColor = texture2D(tBaseColor,vUv);
    }
`;

export default {vertex, fragment};
