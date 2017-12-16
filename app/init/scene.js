import { Scene, PerspectiveCamera } from  'three';
import Entity from 'root/core/entity';

const defaultCameraSettings = {
  fov: 75,
  width: 256,
  height: 256,
  near: 0.1,
  far: 1000,
};

export default class _Scene {
  constructor() {
    this.scene = _Scene.createScene();
    this.camera = _Scene.createCamera();
  }

  static createScene() {
    return new Scene();
  }

  static createCamera({ fov, width, height, near, far } = defaultCameraSettings) {
    return new PerspectiveCamera(fov, width / height, near, far);
  }

  add(entity) {
    if (entity instanceof Entity) {
      this.scene.add(entity);
    }
  }

  remove(entity) {
    if (entity instanceof Entity) {
      this.scene.remove(entity);
    }
  }
}
