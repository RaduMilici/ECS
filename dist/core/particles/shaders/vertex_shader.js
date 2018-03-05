"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  uniform float time;\n  uniform vec3 direction;\n  uniform vec3 cage;\n  \n  void main() {\n    vec3 pos = position + direction * time;\n    pos = mod(pos, cage);\n    pos -= cage / 2.0;\n    gl_PointSize = 1.0;\n    gl_Position = projectionMatrix  * modelViewMatrix * vec4( pos, 1.0 );\n  }\n";