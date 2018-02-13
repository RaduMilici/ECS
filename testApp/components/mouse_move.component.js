import ECS from 'root'
import { Vector3 } from 'three'

export default class MouseMove extends ECS.Component {
  constructor() {
    super()
    this.name = 'MouseMove'
    this.cam = ECS.application.camera
    this.mousePos2D = ECS.application.mouse.position
    this.mousePos3D = new Vector3()
  }

  update() {
    this.entity.position.copy(this.getWorldPosition())
  }

  getWorldPosition() {
    this.mousePos3D.set(this.mousePos2D.x, this.mousePos2D.y, 0.5)
    this.mousePos3D.unproject(this.cam)
    const dir = this.mousePos3D.sub(this.cam.position).normalize()
    const distance = -this.cam.position.z / dir.z
    return this.cam.position.clone().add(dir.multiplyScalar(distance))
  }
}
