import ECS from 'root';
import Move from '../components/move.component';
import { Vector3 } from 'three';
import { util } from 'root/core';

export default class Missile extends ECS.Entity {
  constructor() {
    super();
    this.name = 'Missile';
    this.components = [Move];
  }

  start() {
    this.components.Move.direction = new Vector3(0, 1, 0);
    this.components.Move.speed = 10;
    this.add(util.getTestCube(0.1, 0.5, 0.1));
  }

  onLeaveFrustum() {
    ECS.application.remove(this);
  }
}