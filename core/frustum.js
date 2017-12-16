import util from './util';
import { Frustum, Matrix4 } from 'three';

class _Frustum {
  constructor() {
    this.frustum = new Frustum();
    this.cameraViewMatrix = new Matrix4();
    this.camera = null;
    this.entities = [];
  }

  add(entity) {
    this.entities.push(entity);
  }

  remove(entity) {
    util.removeBehaviorFromArray(entity, this.entities);
  }

  update() {
    this.updateFrustum();
    this.checkEntities();
  }

  updateFrustum() {
    this.camera.updateMatrixWorld();
    this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
    this.cameraViewMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this.frustum.setFromMatrix(this.cameraViewMatrix);
  }

  checkEntities() {
    for (let i = this.entities.length - 1; i >= 0; i--) {
      let entity = this.entities[i];
      if (this.checkEntityChildren(entity) === false) {
        this.remove(entity);
      }
    }
  }

  checkEntityChildren(entity) {
    for (let i = 0; i < entity.children.length; i++) {
      let child = entity.children[i];
      if(this.frustum.intersectsObject(child) === false) {
        entity.onLeaveFrustum(child);
        return false;
      }
    }
    return true;
  }
}

export default new _Frustum();
