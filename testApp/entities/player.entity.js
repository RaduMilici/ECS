import ECS from 'root'
import { Rotate, MouseMove } from '../components'
import Missile from './missile.entity'
import { util } from 'root/core'

class Player extends ECS.Entity {
  constructor() {
    super()
    this.name = 'Player'
    this.__ecs.layer = 'player'
    this.components = [Rotate, MouseMove]
  }

  start() {
    this.add(util.getTestCube())
    // setInterval(this.fire.bind(this), 50);
  }

  onClick() {
    this.children[0].material.color.set(Math.random() * 0xffffff)
  }

  onMouseDown() {
    this.fire()
  }

  fire() {
    ECS.application.add(new Missile(), this.position)
    const rotationRight = { _x: 0, _y: 0, _z: util.deg2rad(20), _order: 'XYZ' }
    ECS.application.add(new Missile({ x: -0.2, y: 0.8, z: 0 }), this.position, rotationRight)
    const rotationLeft = { _x: 0, _y: 0, _z: util.deg2rad(-20), _order: 'XYZ' }
    ECS.application.add(new Missile({ x: 0.2, y: 0.8, z: 0 }), this.position, rotationLeft)
  }
}

export default Player
