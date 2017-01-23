'use strict'

module.exports = class Scale extends ECS.Component{
//------------------------------------------------------------------------------
  constructor(entity){
    super(entity);
    this.name = 'scale';
    this.speed = 0.05;
  }
//------------------------------------------------------------------------------  
  Update(time){ 
    let num = time * 0.01 + this.entity.position.x + this.entity.position.z;
    let scale = Math.abs(Math.sin(num * this.speed));
    this.entity.scale.setScalar(scale);
    this.entity.position.y = scale * 10;
  }
//------------------------------------------------------------------------------  
}

