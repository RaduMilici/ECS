import ECS from 'root';
import { Move, Rotate } from '../components';
import { Vector3 } from 'three';
import { util } from 'root/core';

export default class Enemy extends ECS.Entity {
  constructor() {
    super();
    this.name = 'Enemy';
    this.components = [Move, Rotate];
  }

  start() {
    this.components.Move.direction = new Vector3(0, -1, 0);
    this.components.Move.speed = Math.random() * 5;
    this.add(util.getTestCube(0.5, 0.5, 0.5));
  }

  onLeaveFrustum() {
    ECS.application.remove(this);
  }
}
