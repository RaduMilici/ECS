import { Initializer } from './init';
import { Vector3 } from 'three';
import { Entity, injector, dispose, update  } from 'root/core';

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

  stop() {
    update.stop();
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

  add(entity, position = new Vector3()) {
    if (this.scene && entity instanceof Entity) {
      this.scene.add(entity);
      entity.position.copy(position);
      return injector.startEntity(entity);
    }
  }

  remove(entity) {
    if (entity instanceof Entity) {
      dispose.entity(entity);
      injector.stopComponents(entity);
      this.scene.remove(entity);
    }
  }
}

export default new Application();