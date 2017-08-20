import * as ECS from 'root';
import Rotate from './rotate.component';
import { util } from 'root/core';

class CubeEntity extends ECS.Entity {
  constructor() {
    super();
    this.name = 'CubeEntity';
    this.components = [Rotate];
  }

  start() {
    this.addCube();
    const a = 4;
    this.position.set(util.randomFloat(-a, a), util.randomFloat(-a, a), 0);
  }

  addCube() {
    const geometry = new ECS.THREE.BoxGeometry( 1, 1, 1 );
    const material = new ECS.THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
    const cube = new ECS.THREE.Mesh( geometry, material );
    this.add( cube );
  }

  onClick(event) {
    event.object.material.color.set(Math.random() * 0xffffff);
  }

  onMouseDown(event) {
    // console.log('onMouseDown', event);
  }
}

export default CubeEntity;