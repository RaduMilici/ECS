import { Raycaster } from 'three';

class _Raycaster {

  constructor() {
    this.mouse = null;
    this.camera = null;
    this.raycaster = new Raycaster();
    this.layers = {
      global: [],
    };
  }

  add(entity) {
    this.addToLayer(entity);
  }

  addOnClick(entity) {
    this.addToLayer(entity);
  }

  addToLayer(entity) {
    const desiredLayer = entity.layer;
    const selectedLayer = this.layers[desiredLayer];
    if (selectedLayer) {
      selectedLayer.push(entity);
    }
    else {
      this.layers[desiredLayer] = [entity];
    }
  }

  cast(origin, direction, layer = 'global') {
    this.raycaster.set(origin, direction);
    return this.intersectObjects({ layer });
  }

  castFromCamera() {
    this.raycaster.setFromCamera( this.mouse, this.camera );
    const settings = { layer: 'global', onIntersectName: 'onClick' };
    return this.intersectObjects(settings);
  }

  intersectObjects({ layer, onIntersectName }) {
    const selectedLayer = this.layers[layer];
    if (!selectedLayer) return [];
    const intersects = this.raycaster.intersectObjects(selectedLayer, true);
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
}

export default new _Raycaster();