import ECS from 'root';
import { Move, HitEnemy } from '../components';
import { util} from 'root/core';

export default class Missile extends ECS.Entity {
  constructor(direction = { x: 0, y: 1, z: 0 }) {
    super();
    this.name = 'Missile';
    this.layer = 'missiles';
    this.direction = direction;
    this.components = [Move, HitEnemy];
  }

  start() {
    this.components.Move.direction = this.direction;
    this.components.Move.speed = 20;
    this.add(util.getTestCube(0.1, 0.5, 0.1));
  }

  onLeaveFrustum() {
    ECS.application.remove(this);
  }
}
