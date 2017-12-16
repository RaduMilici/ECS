import util from './util';

export default class Behavior {
  constructor() {
    this.__ecs = {
      id: util.uniqueID(),
    };
  }
}