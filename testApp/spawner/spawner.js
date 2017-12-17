import ECS from 'root';
import Enemy from '../entities/enemy.entity';
import Wave from './wave';
import { Vector3 } from 'three';

export default class Spawner {
  constructor() {
    this.waveNumber = 0;
    this.currentWave = null;
    this.waves = [new Wave({number: Infinity, interval: 50})];
  }

  start() {
    this.nextWave();
  }

  nextWave() {
    this.currentWave = this.waves[this.waveNumber++];
    if (this.waveNumber <= this.waves.length) {
      this.spawnWave(this.currentWave);
    }
    else {
      ECS.application.stop();
    }
  }

  spawnWave(wave) {
    ECS.InvokeRepeating({
      func() {
        ECS.application.add(new Enemy(), new Vector3(ECS.random.float(-5, 5), 8, 0));
      },
      interval: wave.interval,
      times: wave.number,
    }).then(this.nextWave.bind(this));
  }
}