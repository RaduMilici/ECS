import Behavior from './behavior';
import injector from './injector';
import util from './util';
import frustum from './frustum';

export default class Entity extends Behavior {

  constructor() {
    super();
    this.components = [];
    this.__assignEntityProperties();
    this.start = util.createInterceptor(this, this.__start, this.start);
    this.__checkOnLeaveFrustum();
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

  __assignEntityProperties() {
    // set some references to the __ecs object for internal use
    const entityProperties = {
      __injector: injector,
      __components: [],
      __meshes: [],
    };
    Object.assign(this.__ecs, entityProperties);
  }

  __checkOnLeaveFrustum() {
    if(typeof this.onLeaveFrustum === 'function') {
      frustum.add(this);
    }
  }
}
