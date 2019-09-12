const vertex = `#version 300 es
precision highp float;
precision highp int;

in vec3 position;
in vec2 uv;
in vec3 normal;

in float fft;

uniform mat3 normalMatrix;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
out vec2 vUv;
out vec3 vNormal;
out vec3 vMPos;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position + (fft*vNormal*0.3);
    vec4 mPos = modelMatrix * vec4(position, 1.0);
    vMPos = mPos.xyz / mPos.w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
precision highp int;
uniform vec3 cameraPosition;
uniform mat4 viewMatrix;
uniform sampler2D tBaseColor;
uniform vec3 uBaseColor;
uniform float uAlpha;
uniform sampler2D tRMO;
uniform float uMetallic;
uniform float uRoughness;
uniform float uOcclusion;
uniform sampler2D tNormal;
uniform float uNormalScale;
uniform float uNormalUVScale;
uniform sampler2D tEmissive;
uniform float uEmissive;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
in vec2 vUv;
in vec3 vNormal;
in vec3 vMPos;
out vec4 FragColor;
const float PI = 3.14159265359;
const float RECIPROCAL_PI = 0.31830988618;
const float RECIPROCAL_PI2 = 0.15915494;
const float LN2 = 0.6931472;
const float ENV_LODS = 6.0;
vec4 SRGBtoLinear(vec4 srgb) {
    vec3 linOut = pow(srgb.xyz, vec3(2.2));
    return vec4(linOut, srgb.w);;
}
vec4 RGBMToLinear(in vec4 value) {
    float maxRange = 6.0;
    return vec4(value.xyz * value.w * maxRange, 1.0);
}
vec3 linearToSRGB(vec3 color) {
    return pow(color, vec3(1.0 / 2.2));
}
vec3 getNormal() {
    vec3 pos_dx = dFdx(vMPos.xyz);
    vec3 pos_dy = dFdy(vMPos.xyz);
    vec2 tex_dx = dFdx(vUv);
    vec2 tex_dy = dFdy(vUv);
    vec3 t = normalize(pos_dx * tex_dy.t - pos_dy * tex_dx.t);
    vec3 b = normalize(-pos_dx * tex_dy.s + pos_dy * tex_dx.s);
    mat3 tbn = mat3(t, b, normalize(vNormal));
    vec3 n = (texture(tNormal, vUv * uNormalUVScale).rgb * 2.0 - 1.0);
    n.xy *= uNormalScale;
    vec3 normal = normalize(tbn * n);
    // Get world normal from view normal (normalMatrix * normal)
    return normalize((vec4(normal, 0.0) * viewMatrix).xyz);
}
vec3 specularReflection(vec3 specularEnvR0, vec3 specularEnvR90, float VdH) {
    return specularEnvR0 + (specularEnvR90 - specularEnvR0) * pow(clamp(1.0 - VdH, 0.0, 1.0), 5.0);
}
float geometricOcclusion(float NdL, float NdV, float roughness) {
    float r = roughness;
    float attenuationL = 2.0 * NdL / (NdL + sqrt(r * r + (1.0 - r * r) * (NdL * NdL)));
    float attenuationV = 2.0 * NdV / (NdV + sqrt(r * r + (1.0 - r * r) * (NdV * NdV)));
    return attenuationL * attenuationV;
}
float microfacetDistribution(float roughness, float NdH) {
    float roughnessSq = roughness * roughness;
    float f = (NdH * roughnessSq - NdH) * NdH + 1.0;
    return roughnessSq / (PI * f * f);
}
vec2 cartesianToPolar(vec3 n) {
    vec2 uv;
    uv.x = atan(n.z, n.x) * RECIPROCAL_PI2 + 0.5;
    uv.y = asin(n.y) * RECIPROCAL_PI + 0.5;
    return uv;
}

void main() {
    vec3 baseColor = SRGBtoLinear(texture(tBaseColor, vUv)).rgb * uBaseColor;
    // RMO map packed as rgb = [roughness, metallic, occlusion]
    vec4 rmaSample = texture(tRMO, vUv);
    float roughness = clamp(rmaSample.r * uRoughness, 0.04, 1.0);
    float metallic = clamp(rmaSample.g * uMetallic, 0.04, 1.0);
    vec3 f0 = vec3(0.04);
    vec3 diffuseColor = baseColor * (vec3(1.0) - f0) * (1.0 - metallic);
    vec3 specularColor = mix(f0, baseColor, metallic);
    vec3 specularEnvR0 = specularColor;
    vec3 specularEnvR90 = vec3(clamp(max(max(specularColor.r, specularColor.g), specularColor.b) * 25.0, 0.0, 1.0));
    vec3 N = getNormal();
    vec3 V = normalize(cameraPosition - vMPos);
    vec3 L = normalize(uLightDirection);
    vec3 H = normalize(L + V);
    vec3 reflection = normalize(reflect(-V, N));
    float NdL = clamp(dot(N, L), 0.001, 1.0);
    float NdV = clamp(abs(dot(N, V)), 0.001, 1.0);
    float NdH = clamp(dot(N, H), 0.0, 1.0);
    float LdH = clamp(dot(L, H), 0.0, 1.0);
    float VdH = clamp(dot(V, H), 0.0, 1.0);
    vec3 F = specularReflection(specularEnvR0, specularEnvR90, VdH);
    float G = geometricOcclusion(NdL, NdV, roughness);
    float D = microfacetDistribution(roughness, NdH);
    vec3 diffuseContrib = (1.0 - F) * (diffuseColor / PI);
    vec3 specContrib = F * G * D / (4.0 * NdL * NdV);
    
    // Shading based off lights
    vec3 color = NdL * uLightColor * (diffuseContrib + specContrib);
    // Get base alpha
    float alpha = 1.0;
    // Add lights spec to alpha for reflections on transparent surfaces (glass)
    alpha = max(alpha, max(max(specContrib.r, specContrib.g), specContrib.b));
    // Multiply occlusion
    color = mix(color, color * rmaSample.b, uOcclusion);
    // Add emissive on top
    vec3 emissive = SRGBtoLinear(texture(tEmissive, vUv)).rgb * uEmissive;
    color += emissive;
    // Convert to sRGB to display
    FragColor.rgb = linearToSRGB(color);
    
    // Apply uAlpha uniform at the end to overwrite any specular additions on transparent surfaces
    FragColor.a = alpha * uAlpha;
}
`;

export default {vertex, fragment};
