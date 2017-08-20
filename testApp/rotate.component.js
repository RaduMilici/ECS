import * as ECS from 'root';
import { util } from 'root/core';

export default class Rotate extends ECS.Component {
  constructor() {
    super();
    this.name = 'TestComponent';
  }

  start() {
    const a = util.randomFloat(-0.1, 0.1);
    this.rots = [util.randomFloat(-a, a),
      util.randomFloat(-a, a),
      util.randomFloat(-a, a)];
  }

  update() {
    this.entity.rotation.x += this.rots[0];
    this.entity.rotation.y += this.rots[1];
    this.entity.rotation.z += this.rots[2];
  }
}
