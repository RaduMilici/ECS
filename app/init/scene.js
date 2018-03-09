import { Scene, PerspectiveCamera } from 'three'

const defaultCameraSettings = {
  fov: 75,
  width: 256,
  height: 256,
  near: 0.1,
  far: 1000,
}

export default class _Scene {
  constructor(settings) {
    this.scene = _Scene.createScene()
    this.camera = _Scene.createCamera(settings)
  }

  static createScene() {
    return new Scene()
  }

  static createCamera({ fov, width, height, near, far } = defaultCameraSettings) {
    return new PerspectiveCamera(fov, width / height, near, far)
  }

  add(entity) {
    this.scene.add(entity)
  }

  remove(entity) {
    this.scene.remove(entity)
  }
}
