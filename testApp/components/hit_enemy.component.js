import ECS from 'root';
import { Vector3 } from 'three';
import { raycaster } from 'root/core';

export default class HitEnemy extends ECS.Component {
  constructor() {
    super();
    this.name = 'HitEnemy';
  }

  update() {
    this.checkIfHitEnemy();
  }

  checkIfHitEnemy() {
    const intersects = raycaster.cast(this.entity.position, new Vector3(0, 1, 0), 'enemies');
    intersects.forEach(({ distance, object }) => {
      if (distance <= 1) {
        ECS.application.remove(object.entity);
      }
    });
  }
}