import { Renderer, Scene } from '../../app/init'
import { Clock } from 'three'
import { Behavior, frustum, util } from '../../core'

class Update {
  constructor() {
    this.animationFrameId = null
    this.isRunning = false
    this.updateQ = []
    this.clock = new Clock()
    this.__scene = null
    this.__renderer = null
    this.__camera = null
  }

  set renderer(renderer) {
    if (renderer instanceof Renderer) {
      this.__renderer = renderer
    }
  }

  set scene(scene) {
    if (scene instanceof Scene) {
      this.__scene = scene.scene
      this.__camera = scene.camera
      frustum.camera = scene.camera
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true
      this.tick()
    }
  }

  stop() {
    this.isRunning = false
    cancelAnimationFrame(this.animationFrameId)
  }

  tick(timestamp) {
    this.animationFrameId = requestAnimationFrame(this.tick.bind(this))
    this.update(timestamp)
    this.render()
    frustum.update()
  }

  update(timestamp) {
    const delta = this.clock.getDelta()
    this.updateQ.forEach(element => element.update(delta, timestamp))
  }

  render() {
    this.__renderer.render(this.__scene, this.__camera)
  }

  add(toUpdate) {
    if (toUpdate instanceof Behavior) {
      this.updateQ.push(toUpdate)
    }
  }

  remove(toRemove) {
    util.removeBehaviorFromArray(toRemove, this.updateQ)
  }
}

export default new Update()
