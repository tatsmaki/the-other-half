uniform float time;
varying vec2 vUv;
    
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
    
void main() {
    vec2 st = vUv;
    float noise = random(st + time * 0.1) * 0.08;
    gl_FragColor = vec4(vec3(0.3 + noise), 1.0);
}
