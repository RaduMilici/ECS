'use strict'
let ECS = require('./');
let rotate = require('./rotate');

module.exports = class Cube extends ECS.Entity{
//------------------------------------------------------------------------------
  constructor(x = 0, y = 0, z = 0){
    super();
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
    let cube = new THREE.Mesh( geometry, material );
    this.position.set(x, y, z);
    this.add( cube );
  }
//------------------------------------------------------------------------------
}