let id = 0;

export default class Behavior {
  constructor() {
    this.__ecs = {
      __id: id++,
    };
  }
}