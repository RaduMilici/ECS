import Entity from '../entity';
import util from '../util';
import random from '../random';
import vertexShader from './shaders/vertex_shader';
import fragmentShader from './shaders/fragment_shader';
import MoveParticles from './components/move_particles.component';
import { Geometry, ShaderMaterial, AdditiveBlending, Points, Vector3 } from 'three';

class ParticleMaterial extends ShaderMaterial {
  constructor() {
    super();
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.uniforms = {
      time: { type: 'f', value: 0 },
      direction : { type: 'v3', value: new Vector3(0, -1, 0) },
      cage : { type: 'v3', value: new Vector3(15, 15, 2) },
    };
    this.blending = AdditiveBlending;
  }
}

export default class Particles extends Entity {
  constructor() {
    super();
    this.components = [MoveParticles];
    this.count = 100000;
    this.particleMaterial = new ParticleMaterial();
    const geometry = new Geometry();
    const rndX = { min: -15, max: 15};
    const rndY = { min: -15, max: 15};
    const rndZ = { min: -2,  max: 2 };
    util.times(() => geometry.vertices.push(random.position(rndX, rndY, rndZ)), this.count);
    this.add(new Points(geometry, this.particleMaterial));
  }

  start() {
    this.components.MoveParticles.speed = 10;
  }
}