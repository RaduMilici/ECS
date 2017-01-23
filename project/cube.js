'use strict'

let rotate = require('./rotate');
let scale = require('./scale');

module.exports = class Cube extends ECS.Entity{
//------------------------------------------------------------------------------
  constructor(){ 
    var meshes = [/*'monster'*/];
    super({meshes});
    this.layer = this.color = ECS.Util.RandomColor();
    this.addCube();
  }
//------------------------------------------------------------------------------
  Start(settings){
    if(settings && settings.pos)
      this.position.copy(settings.pos);
    //this.meshes.monster.scale.setScalar(0.001);
    this.AddComponent(rotate);
    this.AddComponent(scale);
    this.components.rotate.SetSpinVector(new THREE.Vector3(0.01, 0.01, 0.01));
  }
//------------------------------------------------------------------------------
  addCube(){
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshLambertMaterial( { color: this.color } );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    this.add( mesh );
  }
//------------------------------------------------------------------------------
}