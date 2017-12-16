import ECS from 'root';
import { Vector3 } from 'three';
import { Rotate, MouseMove } from '../components';
import Missile from './missile.entity';
import { util, raycaster } from 'root/core';

class CubeEntity extends ECS.Entity {
  constructor() {
    super();
    this.name = 'CubeEntity';
    this.components = [Rotate, MouseMove];
  }

  start() {
    this.add(util.getTestCube());
  }


  onClick() {
    this.children[0].material.color.set(Math.random() * 0xffffff);
  }

  onMouseDown() {
    const intersects = raycaster.cast(this.position, new Vector3(0, 1, 0));
    this.fire();
  }

  fire() {
    ECS.application.add(new Missile(), this.position);
  }
}

export default CubeEntity;