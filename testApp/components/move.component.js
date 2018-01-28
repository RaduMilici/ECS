import ECS from 'root'
import { Vector3 } from 'three'

export default class Move extends ECS.Component {
  constructor() {
    super()
    this.name = 'Move'
    this.velocity = new Vector3()
    this._direction = new Vector3()
    this._speed = 0
  }

  set speed(s) {
    if (typeof s === 'number') {
      this._speed = s
      this.updateVelocity()
    }
  }

  set direction(v) {
    if (typeof v === 'object') {
      this._direction.copy(v)
      this.updateVelocity()
    }
  }

  updateVelocity() {
    this.velocity = this._direction.clone().multiplyScalar(this._speed)
  }

  update(delta) {
    this.entity.position.add(this.velocity.clone().multiplyScalar(delta))
  }
}
