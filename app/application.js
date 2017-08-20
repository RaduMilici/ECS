import { Initializer } from './init';
import { injector } from 'root/core';

class Application {
  constructor() {
    this.initializer = new Initializer(this);
    this.scenes = {};
    this.renderer = null;
    this.scene = null;
    this.camera = null;
  }

  init(settings) {
    this.initializer.init(settings);
  }

  createScene() {
    const scene = this.initializer.createScene();
    this.scene.add(scene);
    this.scenes[scene.__ecs.id] = scene;
    return scene;
  }

  loadScene(id) {
    const requiredScene = this.scenes[id];
    if (requiredScene) {
      this.scene.add(requiredScene);
    }
  }

  add(entity) {
    if (this.scene) {
      this.scene.add(entity);
      injector.startEntity(entity);
    }
  }
}

export default new Application();