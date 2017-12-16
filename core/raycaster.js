import { Raycaster } from 'three';
import { Entity } from 'root/core';

class _Raycaster {

  constructor() {
    this.mouse = null;
    this.camera = null;
    this.raycaster = new Raycaster();
    this.onClickEntityes = [];
  }

  cast(origin, direction) {
    this.raycaster.set(origin, direction);
    return this.intersectObjects();
  }

  castFromCamera() {
    this.raycaster.setFromCamera( this.mouse, this.camera );
    return this.intersectObjects('onClick');
  }

  intersectObjects(onIntersectName) {
    const intersects = this.raycaster.intersectObjects(this.onClickEntityes, true);
    this.onIntersect(intersects, onIntersectName);
    return intersects;
  }

  onIntersect(intersects, onIntersectName) {
    if (!intersects || !onIntersectName) {
      return;
    }
    intersects.forEach(i => {
      const entity = i.object.entity;
      const callback = entity[onIntersectName];
      if(callback) {
        callback.bind(entity)(i);
      }
      else {
        throw new Error(`No method named ${onIntersectName} found on intersected object`);
      }
    });
  }

  addOnClick(entity) {
    this.onClickEntityes.push(entity);
  }
}

export default new _Raycaster();