import { util, update }from 'root/core';
import Renderer from './renderer';
import Scene from './scene';

export default class Init {
  constructor(application) {
    this.application = application;
  }

  init(settings) {
    this.application.renderer = new Renderer(settings);
    this.application.scene = new Scene(settings);
    this.application.camera = this.application.scene.camera;
    update.scene = this.application.scene;
    update.renderer = this.application.renderer;
    update.start();
  }

  createScene() {
    const scene = this.application.scene.createScene();
    scene.__ecs = { id: util.uniqueID() };
    return scene;
  }
}