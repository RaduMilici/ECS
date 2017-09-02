import ECS from 'root';
import Rotate from '../components/rotate.component';
import MouseMove from '../components/mouse_move.component';
import Missile from './missile.entity';
import { util } from 'root/core';

class CubeEntity extends ECS.Entity {
  constructor() {
    super();
    this.name = 'CubeEntity';
    this.components = [Rotate, MouseMove];
  }

  start() {
    this.add(util.getTestCube());
    const a = 4;
    this.position.set(util.randomFloat(-a, a), util.randomFloat(-a, a), 0);
  }


  onClick() {
    this.children[0].material.color.set(Math.random() * 0xffffff);
  }

  onMouseDown() {
    this.fire();
  }

  fire() {
    const missile = ECS.application.add(new Missile());
    missile.position.copy(this.position);
  }
}

export default CubeEntity;