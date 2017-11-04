import { Scene, PerspectiveCamera } from  'three';
import Entity from 'root/core/entity';
import CameraSettings from 'root/core/interfaces/camera_settings';

export default class __Scene {
  scene: Scene;
  camera: PerspectiveCamera;

  constructor(settings: CameraSettings) {
    this.scene = __Scene.createScene();
    this.camera = __Scene.createCamera(settings);
  }

  static createScene() {
    return new Scene();
  }

  static createCamera({ fov, width, height, near, far }: CameraSettings) {
    return new PerspectiveCamera(fov, width / height, near, far);
  }

  add(entity: Entity) {
    this.scene.add(entity);
  }

  remove(entity: Entity) {
    this.scene.remove(entity);
  }
}
