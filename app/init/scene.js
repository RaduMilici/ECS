import { Scene, PerspectiveCamera } from  'three';
import Entity from 'root/core/entity';

const defaultSettings = {
  fov: 75,
  width: 256,
  height: 256,
  near: 0.1,
  far: 1000,
};

export default class __Scene {
  constructor(settings = defaultSettings) {
    this.scene = __Scene.createScene();
    this.camera = __Scene.createCamera(settings);
  }

  static createScene() {
    return new Scene();
  }

  static createCamera({ fov, width, height, near, far } = defaultSettings) {
    return new PerspectiveCamera(fov, width / height, near, far);
  }

  add(entity) {
    if (entity instanceof Entity) {
      this.scene.add(entity);
    }
  }
}
