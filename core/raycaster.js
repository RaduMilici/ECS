import { Raycaster } from 'three';
import { Entity } from 'root/core';

class _Raycaster {

  constructor() {
    this.mouse = null;
    this.camera = null;
    this.raycaster = new Raycaster();
    this.onClickEntityes = [];
  }

  castFromCamera() {
    this.raycaster.setFromCamera( this.mouse, this.camera );
    const intersects = this.raycaster.intersectObjects(this.onClickEntityes, true);
    intersects.forEach(i => i.object.entity.onClick(i));
  }

  addOnClick(entity) {
    if (entity instanceof Entity) {
      this.onClickEntityes.push(entity);
    }
  }
}

export default new _Raycaster();