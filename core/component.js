import Behavior from './behavior';
import injector from './injector';
import update from './update';
import util from './util';

export default class Component extends Behavior {

  constructor() {
    super();
    this.__ecs.__injector = injector;
    this.start = util.createInterceptor(this, this.__start, this.start);
    this.update = util.createInterceptor(this, this.__update, this.update);
  }

  __start() {
    update.add(this);
  }

  __stop() {

  }

  __update() {

  }
}
