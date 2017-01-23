'use strict'

module.exports = class Rotate extends ECS.Component{
//------------------------------------------------------------------------------
  constructor(entity){
    super(entity);
    this.name = 'rotate';
    this.spinVector = new THREE.Vector3();
  }
//------------------------------------------------------------------------------  
  SetSpinVector(vector){ 
    this.spinVector = vector;   
  }
//------------------------------------------------------------------------------  
  Update(time){ 
    this.entity.rotation.x += this.spinVector.x;
    this.entity.rotation.y += this.spinVector.y;
    this.entity.rotation.z += this.spinVector.z;
  }
//------------------------------------------------------------------------------  
}
