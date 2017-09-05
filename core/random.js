import { Color } from 'three';

export default class Random {
  static color(){
    return new Color(Math.random() * 0xffffff);
  }

  static int(min, max) {
    return Math.round(Random.float(min, max));
  }

  static float (min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return Math.random() * (max - min) + min;
  }
}
