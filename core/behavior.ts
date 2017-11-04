import { Object3D } from 'three';

export default class Behavior extends Object3D {
  static id: number = 0;
  __ecs: object;

  constructor() {
    super();
    this.__ecs = {
      __id: Behavior.id++,
    };
  }
}