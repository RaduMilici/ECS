export default `
  uniform float time;
  uniform vec3 direction;
  uniform vec3 cage;
  
  void main() {
    vec3 pos = position + direction * time;
    pos = mod(pos, cage);
    pos -= cage / 2.0;
    gl_PointSize = 1.0;
    gl_Position = projectionMatrix  * modelViewMatrix * vec4( pos, 1.0 );
  }
`
