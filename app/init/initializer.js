import { util, update, raycaster }from 'root/core';
import Renderer from './renderer';
import Scene from './scene';
import mouse from './mouse';

const defaultSettings = {
  fov: 75,
  width: 600,
  height: 600,
  near: 0.1,
  far: 1000,
  containerId: 'game-view',
};

export default class Init {
  constructor(application) {
    this.application = application;
  }

  init(settings = defaultSettings) {
    const container = Init.getContainer(settings);
    this.application.renderer = new Renderer(settings, container);
    this.application.scene = new Scene(settings);
    this.application.camera = this.application.scene.camera;
    this.application.raycaster = raycaster;
    this.application.raycaster.camera = this.application.camera;
    this.application.mouse = mouse;
    this.application.mouse.container = container;

    update.scene = this.application.scene;
    update.renderer = this.application.renderer;

    this.application.mouse.start();
    update.start();
  }

  createScene() {
    const scene = this.application.scene.createScene();
    scene.__ecs = { id: util.uniqueID() };
    return scene;
  }

  static getContainer(settings) {
    return settings.containerId ? document.getElementById(settings.containerId) : document.body;
  }
}