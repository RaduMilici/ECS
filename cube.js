'use strict'
let ECS = require('./');

module.exports = class Rotate extends ECS.Entity{
//------------------------------------------------------------------------------
  constructor(){
    super();
    
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let cube = new THREE.Mesh( geometry, material );
    this.add( cube );
  }
//------------------------------------------------------------------------------
  Update(){
    this.rotation.y += 0.01;
  }
//------------------------------------------------------------------------------
}