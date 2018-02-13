import { Object3D } from 'three'
import Behavior from './behavior'
import injector from './injector'
import util from './util'
import frustum from './frustum'

export default class Entity extends Behavior {
  constructor() {
    super()
    this.components = []
    this.__extendObject3D()
    this.__assignEntityProperties()
    this.start = util.createInterceptor(this, this.__start, this.start)
    this.__checkOnLeaveFrustum()
    this.__ecs.layer = 'global'
  }

  get layer() {
    return this.__ecs.layer
  }
  set layer(layer) {
    this.__ecs.layer = layer
  }

  __start() {
    /*
    * Transfer component classes here for internal use.
    * this.components -> this.__ecs.components
    *
    * 'this.components' will become an object with
    * instantiated objects from those classes.
    * */
    this.__ecs.components = this.components
    injector.registerEntity(this)
  }

  __extendObject3D() {
    // allows to manipulate an entity just like a THREE.Object3D
    Object3D.call(this)
    Object.assign(this, Object3D, Object3D.prototype)
  }

  __assignEntityProperties() {
    // set some references to the __ecs object for internal use
    const entityProperties = {
      injector,
      components: [],
      meshes: [],
    }
    Object.assign(this.__ecs, entityProperties)
  }

  __checkOnLeaveFrustum() {
    if (typeof this.onLeaveFrustum === 'function') {
      frustum.add(this)
    }
  }
}
