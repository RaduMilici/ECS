import vertexShader from './vertex_shader';
import fragmentShader from './fragment_shader';
import { BufferGeometry, BufferAttribute } from 'three';

export default class Particles {
  constructor() {
    // shaders
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    //settings
    this.amount = 1000;
    this.radius = 200;
    this.positions = new Float32Array(this.amount * 3);
    this.colors = new Float32Array(this.amount * 3);
    this.sizes = new Float32Array(this.amount);
    //geometry
    this.geometry = new BufferGeometry();
    this.addGeometryAttributes();
  }

  addGeometryAttributes() {
    this.geometry.addAttribute('position', new BufferAttribute())
  }
}