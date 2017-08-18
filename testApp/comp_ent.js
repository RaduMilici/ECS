import * as ECS from 'root';

class TestComponent extends ECS.Component {
  constructor() {
    super();
    this.name = 'TestComponent';
  }

  start() {
    console.log('start component');
  }
}

class TestEntity extends ECS.Entity {
  constructor() {
    super();
    this.name = 'TestEntity';
    this.components = [TestComponent];
  }

  addCube() {
    const geometry = new ECS.THREE.BoxGeometry( 1, 1, 1 );
    const material = new ECS.THREE.MeshBasicMaterial( { color: 0x00ff00, side: 2 } );
    const cube = new ECS.THREE.Mesh( geometry, material );
    this.add( cube );
  }

  start() {
    console.log('start TestEntity');
    this.addCube();
  }
}

export default new TestEntity();