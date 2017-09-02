import Behavior from './behavior';
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class Util {
  constructor(){
    this.id = 0;
    this.blank = function() {};
  }

  uniqueID(){
    return this.id++;
  }

  createInterceptor(scope, pre = this.blank, original = this.blank, post = this.blank) {
    if(scope === undefined || typeof original !== 'function') {
      return;
    }

    return function(settings){
      pre.bind(scope)();
      original.bind(scope)(settings);
      post.bind(scope)();
    };
  }

  randomColor(){
    let colors = ['red', 'green', 'blue'];
    return colors[Math.round(Math.random() * (colors.length - 1))];
  }

  randomFloat (min, max) {
    return Math.random() * (max - min) + min;
  }

  getTestCube(width = 1, height = 1, depth = 1) {
    const geometry = new BoxGeometry( width, height, depth );
    const material = new MeshBasicMaterial( { color: Math.random() * 0xffffff } );
    return new Mesh( geometry, material );
  }

  loopObjectKeys(object, callback) {
    Object.keys(object).forEach(keyName => callback(object[keyName]));
  }

  removeBehaviorFromArray(behavior, array) {
    if (behavior instanceof Behavior === false || Array.isArray(array) === false) {
      return;
    }

    const index = array.findIndex(e => e.__ecs.__id === behavior.__ecs.__id);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}

export default new Util();