import Entity from '../entity';
import vertexShader from './vertex_shader';
import fragmentShader from './fragment_shader';
import MoveParticles from './components/move_particles.component';
import { BufferGeometry, BufferAttribute, Color, TextureLoader, 
  ShaderMaterial, AdditiveBlending, Points, Vector3 } from 'three';

export default class Particles extends Entity {
  constructor() {
    super();
    this.components = [MoveParticles];
    // shaders
    this.__vertexShader = vertexShader;
    this.__fragmentShader = fragmentShader;
    //settings
    this.__particles = 1000;
    this.__radius = 5;
    this.__size = 1;
    this.__color = new Color();
    this.__positions = new Float32Array(this.__particles * 3);
    this.__colors = new Float32Array(this.__particles * 3);
    this.__sizes = new Float32Array(this.__particles).fill(this.__size);
    //geometry
    this.__geometry = new BufferGeometry();
    //uniforms
    this.__uniforms = {
      color: { value: new Color(0xffffff) },
      texture: { value: new TextureLoader().load('spark1.png') },
    };
    //material
    this.__shaderMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.__uniforms,
      blending: AdditiveBlending,
      depthTest: false,
      transparent: true,
    });
    //setup    
    this.__setPositionsAndColors();
    this.__addGeometryAttributes();
    this.__system = new Points(this.__geometry, this.__shaderMaterial);
    this.__geometry.attributes.size.needsUpdate = true;
    this.add(this.__system);
  }

  start() {
    this.components.MoveParticles.direction = new Vector3(0, 1, 0);
    this.components.MoveParticles.speed = 0.1;
  }

  __setPositionsAndColors() {
    for(let i = 0, i3 = 0; i < this.__particles; i++, i3 += 3) {
      this.__positions[i3 + 0] = (Math.random() * 2 - 1) * this.__radius;
      this.__positions[i3 + 1] = (Math.random() * 2 - 1) * this.__radius;
      this.__positions[i3 + 2] = (Math.random() * 2 - 1) * this.__radius;

      // this.__color = this.__color.setHSL(i / this.__particles, 1.0, 0.5);

      this.__colors[i3 + 0] = this.__color.r;
      this.__colors[i3 + 1] = this.__color.g;
      this.__colors[i3 + 2] = this.__color.b;
    }
  }

  __addGeometryAttributes() {
    this.__geometry.addAttribute('position', new BufferAttribute(this.__positions, 3));
    this.__geometry.addAttribute('customColor', new BufferAttribute(this.__colors, 3));
    this.__geometry.addAttribute('size', new BufferAttribute(this.__sizes, 1));
  }
}