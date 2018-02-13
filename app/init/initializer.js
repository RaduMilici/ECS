import { util, update, raycaster } from 'root/core'
import Renderer from './renderer'
import Scene from './scene'
import mouse from './mouse'

export default class Init {
  constructor(application) {
    this.application = application
  }

  init(settings) {
    const container = this.getContainer(settings)
    this.application.renderer = new Renderer(settings, container)
    this.application.scene = new Scene(settings)
    this.application.camera = this.application.scene.camera
    this.application.raycaster = raycaster
    this.application.raycaster.camera = this.application.camera
    this.application.mouse = mouse
    this.application.mouse.container = container

    update.scene = this.application.scene
    update.renderer = this.application.renderer

    this.application.mouse.start()
    update.start()
  }

  getContainer(settings) {
    return settings.containerId ? document.getElementById(settings.containerId) : document.body
  }
}
