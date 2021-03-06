import { Vector2 } from 'three'
import { Entity, raycaster } from '../../core'

class Mouse {
  constructor() {
    this.container = null
    this.position = new Vector2()
    this.onMouseDownEntityes = []
  }

  start() {
    this.container.addEventListener('mousemove', this.onMouseMove.bind(this), false)
    this.container.addEventListener('mousedown', this.onMouseDown.bind(this), false)
    raycaster.mouse = this.position
  }

  registerEntityEvents(entity) {
    if (entity.onMouseDown) {
      this.addOnMouseDown(entity)
    }

    if (entity.onClick) {
      raycaster.addOnClick(entity)
    }
  }

  onMouseMove(event) {
    this.position.x = event.clientX / this.container.clientWidth * 2 - 1
    this.position.y = -(event.clientY / this.container.clientHeight) * 2 + 1
  }

  addOnMouseDown(entity) {
    if (entity instanceof Entity) {
      this.onMouseDownEntityes.push(entity)
    }
  }

  onMouseDown(event) {
    // called when user presses mouse button anywhere in the app
    const intersects = raycaster.castFromCamera()
    this.onMouseDownEntityes.forEach(e => e.onMouseDown(event, intersects))
  }
}

export default new Mouse()
