import { Color, Vector3 } from 'three'

export default class Random {
  static color() {
    return new Color(Math.random() * 0xffffff)
  }

  static int(min, max) {
    return Math.round(Random.float(min, max))
  }

  static float(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return Math.random() * (max - min) + min
  }

  static position(x = { min: -10, max: 10 }, y = { min: -10, max: 10 }, z = { min: -10, max: 10 }) {
    return new Vector3(
      Random.float(x.min, x.max),
      Random.float(y.min, y.max),
      Random.float(z.min, z.max)
    )
  }
}
