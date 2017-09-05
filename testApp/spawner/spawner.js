import ECS from 'root';
import Enemy from '../entities/enemy.entity';
import Wave from './wave';
import { Vector3 } from 'three';

export default class Spawner {
  constructor() {
    this.waveNumber = 0;
    this.currentWave = null;
    this.waves = [];
    for (let i = 0; i < 3; i++) {
      this.waves.push(new Wave({number: ECS.random.int(30, 60)}));
    }
  }

  start() {
    this.nextWave();
  }

  nextWave() {
    this.currentWave = this.waves[this.waveNumber++];
    if (this.waveNumber <= this.waves.length) {
      this.spawnWave();
    }
    else {
      ECS.application.stop();
    }
  }

  spawnWave() {
    ECS.InvokeRepeating({
      func() {
        ECS.application.add(new Enemy(), new Vector3(ECS.random.float(-3, 3), 3, 0));
      },
      interval: 100,
      times: this.currentWave.number,
    }).then(this.nextWave.bind(this));
  }
}