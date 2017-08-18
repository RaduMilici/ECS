import * as THREE from  'three';
import Behavior from './behavior';
import injector from './injector';
import util from './util';

export default class Entity extends Behavior {

  constructor() {
    super();
    this.__extendObject3D();
    this.__assignEntityProperties();
    this.start = util.createInterceptor(this, this.__start, this.start);
  }

  __start() {
    /*
    * Transfer component classes here for internal use.
    * this.components -> this.__ecs.__components
    *
    * 'this.components' will become an object with
    * instantiated objects from those classes.
    * */
    this.__ecs.__components = this.components;
    injector.registerEntity(this);
  }

  __extendObject3D() {
    // allows to manipulate an entity just like a THREE.Object3D
    THREE.Object3D.call(this);
    Object.assign(this, THREE.Object3D, THREE.Object3D.prototype);
  }

  __assignEntityProperties() {
    // set some references to the __ecs object for internal use
    const entityProperties = {
      __injector: injector,
      __components: [],
      __meshes: [],
    };
    Object.assign(this.__ecs, entityProperties);
  }
}
