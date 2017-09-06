import Component from '../../component';
import { Vector3 } from 'three';

export default class MoveParticles extends Component {
  constructor() {
    super();
    this.name = 'MoveParticles';
    this.velocity = new Vector3();
    this._direction = new Vector3();
    this._speed = 0;
    console.log(this);
  }

  set speed(s) {
    if (typeof s === 'number') {
      this._speed = s;
      this.updateVelocity();
    }
  }

  set direction(v) {
    if (typeof v === 'object') {
      this._direction.copy(v);
      this.updateVelocity();
    }
  }

  updateVelocity() {
    this.velocity = this._direction.clone().multiplyScalar(this._speed);
  }

  update(delta) {
    for(let i = 0, i3 = 0; i < this.entity.__particles; i++, i3 += 3) {
      this.entity.__positions[i3 + 0] += this.velocity.x;
      this.entity.__positions[i3 + 1] += this.velocity.y;
      this.entity.__positions[i3 + 2] += this.velocity.z;

      this.entity.__positions[i3 + 0] %= -5;
      this.entity.__positions[i3 + 1] %= -5;
      this.entity.__positions[i3 + 2] %= -5;
    }
    this.entity.__geometry.attributes.position.needsUpdate = true;
  }
}
