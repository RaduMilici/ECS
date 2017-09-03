import ECS from 'root';
import Enemy from './entities/enemy.entity';
import { Vector3 } from 'three';

export default class Spawner {
  constructor() {
    this.name = 'Spawner';
  }

  start() {
    setInterval(() => {
      ECS.application.add(new Enemy(), new Vector3(ECS.util.randomFloat(-3, 3), 3, 0));
    }, 500);
  }
}