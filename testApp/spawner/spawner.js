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
      this.waves.push(new Wave({number: ECS.util.randomInt(3, 6)}));
    }
  }

  start() {
    this.log('h3', 'starting 3 random waves');
    this.nextWave();
  }

  nextWave() {
    this.currentWave = this.waves[this.waveNumber++];
    if (this.waveNumber <= this.waves.length) {
      this.log('h4', `wave ${this.waveNumber} (${this.currentWave.number} entities)`);
      this.spawnWave();
    }
    else {
      ECS.application.stop();
      this.log('h3', 'done, stopping');
    }
  }

  spawnWave() {
    const scope = this;
    ECS.InvokeRepeating({
      func(timesInvoked) {
        scope.log('span', `entity ${timesInvoked} | `);
        ECS.application.add(new Enemy(), new Vector3(ECS.util.randomFloat(-3, 3), 3, 0));
      },
      interval: 500,
      times: this.currentWave.number,
    }).then(this.nextWave.bind(this));
  }

  log(type, text) {
    const node = document.createElement(type);
    node.appendChild(document.createTextNode(text));
    document.body.appendChild(node);
  }
}